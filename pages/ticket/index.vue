<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center">
    <!-- หัวข้อ My Tickets -->
    <h1
      class="font-serif font-bold text-xl md:text-3xl lg:text-4xl mt-5 md:mt-10"
    >
      My Tickets
    </h1>

    <!-- ส่วนแสดงตั๋ว -->
    <div class="container mx-auto px-4 mt-4 w-full max-w-screen-lg">
      <div
        class="overflow-y-auto h-auto max-h-[550px] md:max-h-[900px] flex flex-col items-center gap-6"
      >
        <div v-if="loading" class="text-center mt-5">⏳ กำลังโหลดข้อมูล...</div>
        <div v-else-if="error" class="text-center text-red-500">
          ❌ ไม่สามารถโหลดข้อมูลตั๋วได้
        </div>
        <div v-else class="w-full flex flex-col items-center gap-6">
          <!-- แสดงรายการ Tickets -->
          <div
            v-for="ticket in tickets"
            :key="ticket.id"
            class="w-full max-w-4xl rounded-lg overflow-hidden shadow-md"
          >
            <NuxtLink :to="'/ticket/' + ticket.id">
              <img
                :src="getImageUrl(ticket.event?.image)"
                alt="Event Image"
                class="w-full h-56 md:h-72 lg:h-96 object-cover rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                @error="handleImageError"
              />
            </NuxtLink>
          </div>
        </div>

        <!-- ถ้าไม่มี Tickets -->
        <div
          v-if="tickets.length === 0 && !loading && !error"
          class="text-center text-gray-500"
        >
          คุณยังไม่มีการลงทะเบียนเข้าร่วมกิจกรรม
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useIndexStore } from "@/stores/main";
import * as api from "@/services/API.service";

const store = useIndexStore();
const { userId } = storeToRefs(store);

const tickets = ref<any[]>([]);
const loading = ref(true);
const error = ref(false);

// ✅ ฟังก์ชันดึงข้อมูลผู้ใช้ก่อนโหลด Tickets
const getUserInfo = async () => {
  try {
    console.log("📌 Fetching user info...");
    const resp = await api.getUserInfo();
    const data = resp.data.data;

    // ✅ กำหนด userId ใน Pinia Store
    store.userId = data.id;
    console.log("✅ User ID:", store.userId);

    return data.id;
  } catch (err) {
    console.error("❌ Error fetching user info:", err);
    error.value = true;
    return null;
  }
};

// ✅ โหลดข้อมูล Tickets ของผู้ใช้
const fetchTickets = async (userId: number) => {
  try {
    console.log("📌 fetchTickets() called!");

    if (!userId) {
      console.error("❌ No valid user_id found.");
      error.value = true;
      return;
    }

    loading.value = true;
    const response = await api.getUserTicket(userId);
    console.log("📌 API Response:", response);

    if (!response?.data?.data || response.data.data.length === 0) {
      console.warn("ℹ️ No tickets found for this user.");
      tickets.value = [];
      return;
    }

    tickets.value = response.data.data;
  } catch (err) {
    console.error("❌ Error fetching tickets:", err);
    error.value = true;
  } finally {
    loading.value = false;
  }
};

// ✅ โหลดข้อมูลเมื่อ Component ถูก mount
onMounted(async () => {
  const id = await getUserInfo();
  if (id) {
    await fetchTickets(id);
  }
});

// ✅ ฟังก์ชันตรวจสอบ URL ของรูปภาพ
const getImageUrl = (img: string) => {
  return img && img.startsWith("http") ? img : "";
};

// ✅ ฟังก์ชันเปลี่ยนเป็นรูป Default ถ้าโหลดรูปไม่ได้
const handleImageError = (event: Event) => {
  (event.target as HTMLImageElement).src =
    "https://shortrecap.co/wp-content/uploads/2020/05/Catcover_web.jpg";
};
</script>

<style scoped>
/* ปรับแต่งเพิ่มเติมถ้าจำเป็น */
</style>
