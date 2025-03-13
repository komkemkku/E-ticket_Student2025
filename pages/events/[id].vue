<template>
  <div>
    <!-- ปุ่ม Back -->
    <div class="flex justify-start mt-5 ml-5">
      <button
        @click="goBack"
        class="text-white bg-[#A73B24] opacity-80 px-4 py-2 rounded-lg shadow-xl transition hover:opacity-100"
      >
        Back
      </button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center mt-10 text-lg text-gray-600">
      <p>⏳ Loading event data...</p>
    </div>

    <!-- Error -->
    <div
      v-else-if="error"
      class="flex justify-center mt-10 text-red-500 text-lg"
    >
      <p>{{ error }}</p>
    </div>

    <!-- ข้อมูลกิจกรรม -->
    <div v-else-if="eventData" class="flex justify-center mt-8">
      <div
        class="h-auto w-full max-w-2xl md:max-w-3xl lg:max-w-4xl bg-white rounded-xl p-8"
      >
        <img
          :src="
            eventData.image ||
            'https://shortrecap.co/wp-content/uploads/2020/05/Catcover_web.jpg'
          "
          class="w-full h-64 md:h-80 lg:h-[400px] object-cover rounded-xl shadow-md"
          alt="Event Image"
        />

        <h2 class="text-center font-semibold text-3xl mt-6">
          {{ eventData.name }}
        </h2>

        <div class="mt-6 text-lg">
          <p class="mt-4"><b>รายละเอียดงาน:</b> {{ eventData.description }}</p>
          <p class="mt-4"><b>สถานที่:</b> {{ eventData.location }}</p>
          <p class="mt-4"><b>การแต่งกาย:</b> {{ eventData.dress }}</p>
          <p class="mt-4">
            <b>เวลา:</b> {{ eventData.start_time }} - {{ eventData.end_time }}
          </p>
          <p class="mt-4">
            <b>วันที่:</b> {{ eventData.start_date }} - {{ eventData.end_date }}
          </p>
        </div>

        <!-- ปุ่มลงทะเบียน -->
        <div class="flex justify-center mt-10">
          <button
            @click="register"
            :disabled="registering"
            class="font-semibold text-white bg-black w-44 h-12 rounded-3xl shadow-md transition-transform transform hover:scale-105"
          >
            {{ registering ? "กำลังลงทะเบียน..." : "ลงทะเบียน" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import * as api from "@/services/API.service";
import type { EventGetId } from "@/models/event.model";
import { useIndexStore } from "@/stores/main";
import { storeToRefs } from "pinia";
import Swal from "sweetalert2";

const route = useRoute();
const router = useRouter();
const store = useIndexStore();
const { userId } = storeToRefs(store);

const eventData = ref<EventGetId | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);
const registering = ref(false);

const fetchEventData = async () => {
  try {
    loading.value = true;
    error.value = null;

    const eventId = Number(route.params.id);
    if (!eventId) {
      error.value = "❌ Invalid event ID.";
      return;
    }

    console.log("📌 Fetching data for event ID:", eventId);
    const response = await api.getEventsById(eventId);

    if (!response.data || !response.data.data) {
      throw new Error("❌ No event data found.");
    }

    eventData.value = response.data.data;
    console.log("✅ Event Data Loaded:", eventData.value);
  } catch (err) {
    error.value = "❌ Failed to load event data.";
    console.error("❌ Error fetching event:", err);
  } finally {
    loading.value = false;
  }
};

const fetchUserInfo = async () => {
  try {
    console.log("📌 Fetching User Info...");
    const response = await api.getUserInfo();
    if (!response.data || !response.data.data) {
      throw new Error("❌ ไม่พบข้อมูลผู้ใช้");
    }

    store.userId = response.data.data.id;
    console.log("✅ User Info Loaded:", response.data.data);
  } catch (err) {
    console.error("❌ Error fetching user info:", err);
    throw new Error("ไม่สามารถดึงข้อมูลผู้ใช้ได้ กรุณาลองใหม่!");
  }
};

const register = async () => {
  try {
    registering.value = true;
    console.log("📌 เริ่มทำการลงทะเบียน...");

    await fetchUserInfo();

    if (!userId.value) {
      throw new Error("❌ ไม่พบข้อมูลผู้ใช้ กรุณาเข้าสู่ระบบก่อนลงทะเบียน!");
    }

    const eventId = Number(route.params.id);
    if (!eventId) {
      throw new Error("❌ ไม่พบข้อมูลอีเวนต์ กรุณาลองใหม่อีกครั้ง!");
    }

    const ticketData = {
      user_id: userId.value,
      event_id: eventId,
    };

    console.log("📌 ส่งข้อมูลไปยัง API:", ticketData);

    const response = await api.createTicket(ticketData);
    console.log("📌 API Response:", response.data);

    // ✅ ตรวจสอบค่าจาก API Response
    const ticketId = response.data?.tick_id;
    const qrCode = response.data?.qr_code;

    if (!ticketId && !qrCode) {
      console.error("❌ API ไม่คืนค่า ticket_id หรือ qr_code!", response.data);
      throw new Error("❌ ไม่สามารถสร้างตั๋วได้ กรุณาลองใหม่!");
    }

    console.log("✅ ลงทะเบียนสำเร็จ!", { ticketId, qrCode });

    await Swal.fire({
      title: "✅ ลงทะเบียนสำเร็จ!",
      text: "คุณสามารถตรวจสอบตั๋วของคุณได้ที่หน้า My Tickets",
      icon: "success",
      confirmButtonText: "ดูตั๋วของฉัน",
    });

    router.push(`/ticket/${ticketId}`);
  } catch (err) {
    console.error("❌ Error Registering:", err);

    await Swal.fire({
      title: "ลงทะเบียนไม่สำเร็จ",
      text: "นักศึกษาทำการลงทะเบียนแล้ว",
      icon: "error",
    });
  } finally {
    registering.value = false;
  }
};

onMounted(fetchEventData);

const goBack = () => {
  router.push("/events");
};
</script>

<style></style>
