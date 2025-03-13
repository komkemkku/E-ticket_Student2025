<template>
  <div class="min-h-screen bg-white flex flex-col items-center">
    <!-- ปุ่มย้อนกลับ -->
    <div class="flex justify-start w-full max-w-4xl mt-5 ml-5">
      <button
        @click="goBack"
        class="text-white bg-[#A73B24] px-4 py-2 rounded-lg shadow-md transition hover:opacity-100"
      >
        Back
      </button>
    </div>

    <!-- แสดง Loading -->
    <div v-if="loading" class="flex justify-center mt-10 text-lg text-gray-600">
      <p>⏳ กำลังโหลดข้อมูลตั๋ว...</p>
    </div>

    <!-- แสดง Error -->
    <div
      v-else-if="error"
      class="flex justify-center mt-10 text-red-500 text-lg"
    >
      <p>❌ {{ error }}</p>
    </div>

    <!-- แสดงข้อมูลตั๋ว -->
    <div
      v-else-if="ticket && ticket.event"
      class="flex flex-col items-center px-4 py-6 w-full max-w-screen-lg"
    >
      <h1
        class="font-serif font-bold text-xl md:text-3xl lg:text-4xl text-center"
      >
        My Ticket
      </h1>

      <!-- การ์ดตั๋วที่รวมข้อมูล -->
      <div
        ref="ticketCard"
        :style="{
          backgroundImage: `url(${ticket.event.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }"
        class="relative w-full max-w-4xl h-64 md:h-80 lg:h-[400px] rounded-lg p-4 shadow-md flex flex-col justify-between mt-10"
      >
        <!-- เพิ่มพื้นหลังแบบ semi-transparent สำหรับเนื้อหาชัดเจนขึ้น -->
        <div>
          <div class="flex flex-col gap-2">
            <h2 class="text-lg font-bold">{{ ticket.event.name }}</h2>
            <p class="text-sm">
              Student ID: <br /><b>{{ ticket.user.student_id }}</b>
            </p>
            <p class="text-sm">
              Name:<br />
              <b>{{ ticket.user.firstname }} {{ ticket.user.lastname }}</b>
            </p>
            <p class="text-sm">
              Faculty: <br /><b>{{ ticket.user.faculty }}</b>
            </p>
          </div>
        </div>
        <!-- QR Code อยู่ชิดมุมขวาล่าง -->
        <div class="flex justify-end items-end w-full">
          <img
            :src="formatBase64(ticket.qr_code)"
            alt="QR Code"
            class="w-24 h-24 md:w-32 md:h-32 bg-white p-2 rounded-md shadow-md"
          />
        </div>
      </div>

      <!-- ข้อมูลอีเวนต์ -->
      <div class="w-full max-w-4xl mx-auto mt-6">
        <h2 class="text-center font-semibold text-3xl mt-6">
          {{ ticket.event.name || "ไม่ทราบชื่อ" }}
        </h2>
        <div class="mt-6 text-lg">
          <p class="mt-4">
            <b>รายละเอียดงาน:</b>
            {{ ticket.event.description || "ไม่มีข้อมูล" }}
          </p>
          <p class="mt-4">
            <b>สถานที่:</b> {{ ticket.event.location || "ไม่มีข้อมูล" }}
          </p>
          <p class="mt-4">
            <b>การแต่งกาย:</b> {{ ticket.event.derss || "ไม่มีข้อมูล" }}
          </p>
          <p class="mt-4">
            <b>เวลา:</b> {{ ticket.event.start_time }} -
            {{ ticket.event.end_time }}
          </p>
          <p class="mt-4">
            <b>วันที่:</b> {{ ticket.event.start_date }} -
            {{ ticket.event.end_date }}
          </p>
        </div>
      </div>

      <!-- ปุ่มดาวน์โหลด -->
      <div class="mt-6">
        <button
          @click="downloadTicketImage"
          class="bg-[#A73B24] text-white font-semibold py-3 px-8 rounded-lg shadow-md transition transform hover:scale-105"
        >
          Download Ticket
        </button>
      </div>
    </div>

    <!-- กรณี ticket ไม่มี event -->
    <div v-else class="flex justify-center mt-10 text-red-500 text-lg">
      <p>❌ ไม่พบข้อมูลอีเวนต์ของตั๋วนี้</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import html2canvas from "html2canvas";
import * as api from "@/services/API.service";

const route = useRoute();
const router = useRouter();
const ticketId = route.params.id as string;

const ticket = ref<any>(null);
const loading = ref(true);
const error = ref<string | null>(null);
const ticketCard = ref<HTMLDivElement | null>(null);

const fetchTicketData = async () => {
  try {
    loading.value = true;
    const response = await api.getTicketById(ticketId);

    if (response?.data) {
      ticket.value = response.data;
      console.log("✅ ข้อมูลตั๋วที่โหลดสำเร็จ:", ticket.value);
    } else {
      throw new Error("❌ ไม่พบข้อมูลตั๋ว");
    }
  } catch (error: any) {
    error.value = error.message || "❌ ไม่สามารถโหลดข้อมูลตั๋วได้";
  } finally {
    loading.value = false;
  }
};

// ✅ แปลง Base64 QR Code ให้ใช้งานได้
const formatBase64 = (base64String: string) => {
  if (!base64String) return "";
  return `data:image/png;base64,${base64String}`;
};

// ✅ ฟังก์ชันสร้างภาพจาก HTML ด้วย html2canvas
const downloadTicketImage = async () => {
  if (!ticketCard.value) {
    alert("❌ ไม่พบการ์ดตั๋วสำหรับบันทึก");
    return;
  }

  try {
    console.log("📸 กำลังแปลงการ์ดตั๋วเป็นรูปภาพ...");

    // ✅ 1. โหลดรูปพื้นหลังจาก URL และแปลงเป็น Base64
    const convertImageToBase64 = async (url: string): Promise<string> => {
      const response = await fetch(url, { mode: "cors" });
      const blob = await response.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });
    };

    const backgroundBase64 = await convertImageToBase64(
      ticket.value.event.image
    );

    // ✅ 2. ใช้ขนาดที่แน่นอนสำหรับการแคปเจอร์
    const width = 800; // ขนาดมาตรฐานที่โหลดออกมา
    const height = 400;

    // ✅ 3. สร้าง Canvas สำหรับการเรนเดอร์
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("❌ ไม่สามารถสร้าง Context ของ Canvas ได้!");
    }

    // ✅ 4. วาดพื้นหลัง
    const backgroundImage = new Image();
    backgroundImage.src = backgroundBase64;
    await new Promise((resolve, reject) => {
      backgroundImage.onload = resolve;
      backgroundImage.onerror = reject;
    });

    ctx.drawImage(backgroundImage, 0, 0, width, height);

    // ✅ 5. ดึงข้อมูลจากการ์ดที่อยู่บน HTML และวาดลงไป
    const tempCanvas = await html2canvas(ticketCard.value, {
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: null,
    });

    ctx.drawImage(tempCanvas, 0, 0, width, height);

    // ✅ 6. แปลงเป็น Data URL
    const dataURL = canvas.toDataURL("image/png");

    // ✅ 7. สร้างลิงก์ดาวน์โหลด
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = `ticket-${ticketId}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log("✅ ดาวน์โหลดตั๋วสำเร็จ!");
  } catch (error) {
    console.error("❌ เกิดข้อผิดพลาดในการสร้างรูปภาพ:", error);
    alert("❌ ไม่สามารถสร้างภาพ กรุณาลองใหม่!");
  }
};

const goBack = () => {
  if (window.history.length > 1) {
    router.back();
  } else {
    router.push("/ticket");
  }
};

// ดึงข้อมูลเมื่อโหลดหน้า
onMounted(fetchTicketData);
</script>

<style scoped></style>
