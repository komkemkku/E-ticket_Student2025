<template>
  <div class="flex flex-col items-center px-4 py-6">
    <!-- ปุ่มย้อนกลับ -->
    <button
      @click="goBack"
      class="absolute top-5 left-5 md:left-10 text-2xl z-10"
    >
      <svg
        class="w-6 h-6 text-gray-800 dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 12h14M5 12l4-4m-4 4 4 4"
        />
      </svg>
    </button>

    <!-- หัวข้อ -->
    <h1
      class="font-serif font-bold text-lg md:text-2xl lg:text-3xl text-center mt-5 md:mt-10"
    >
      My Ticket {{ ticketId }}
    </h1>

    <!-- ภาพตั๋ว -->
    <div class="flex justify-center mt-6">
      <img
        ref="ticketImageRef"
        :src="ticketImage"
        alt="Ticket Image"
        class="w-full max-w-xs md:max-w-lg lg:max-w-2xl h-auto rounded-lg shadow-lg"
      />
    </div>

    <!-- ชื่อของตั๋ว -->
    <div class="w-full max-w-xs md:max-w-lg lg:max-w-2xl text-center mt-6">
      <h1 class="font-serif font-medium text-lg md:text-2xl lg:text-3xl">
        {{ ticketName }}
      </h1>
    </div>

    <!-- ปุ่มดาวน์โหลดรูปภาพ -->
    <div class="mt-6">
      <button
        @click="downloadImage"
        class="bg-[#A73B24] hover:bg-[#A73B24] text-white font-semibold py-2 px-4 rounded-lg shadow-md transition"
      >
        Save Ticket
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";

const route = useRoute();
const router = useRouter();
const ticketId = route.params.id;
const ticketImageRef = ref<HTMLImageElement | null>(null);

// ข้อมูล Ticket (รูป + ชื่อ)
const ticketData: Record<string, { image: string; name: string }> = {
  "1": { image: "/images/ticket/ticket01.jpeg", name: "จูงแขนเจ้าเข้ามข." },
  "2": { image: "/images/ticket/ticket02.jpeg", name: "จูงแขนเจ้าเข้ามข." },
  "3": { image: "/images/ticket/ticket03.jpeg", name: "จูงแขนเจ้าเข้ามข." },
};


const ticketImage = ticketData[ticketId]?.image || "/images/default.jpg";
const ticketName = ticketData[ticketId]?.name || "Unknown Ticket";

const downloadImage = async () => {
  if (!ticketImageRef.value) return;

  // สร้าง canvas เพื่อแปลงภาพให้ดาวน์โหลดได้ทุกอุปกรณ์
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = ticketImage;

  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx?.drawImage(img, 0, 0, img.width, img.height);

    // แปลงเป็นไฟล์ PNG หรือ JPEG
    const dataURL = canvas.toDataURL("image/jpeg");

    // สร้างลิงก์ดาวน์โหลด
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = `ticket-${ticketId}.jpeg`;

    // รองรับ iPhone และ iPad (เปิดหน้าใหม่)
    if (navigator.userAgent.includes("iPhone") || navigator.userAgent.includes("iPad")) {
      const newTab = window.open();
      newTab?.document.write(`<img src="${dataURL}" />`);
    } else {
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  img.onerror = () => {
    alert("เกิดข้อผิดพลาดในการโหลดภาพ กรุณาลองใหม่!");
  };
};

const goBack = () => {
  router.back();
};
</script>

<style scoped>
</style>
