<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center">
    <!-- หัวข้อ Events -->
    <h1
      class="font-serif font-bold text-xl md:text-3xl lg:text-4xl mt-5 text-center"
    >
      Events
    </h1>

    <!-- แสดง Loading -->
    <div v-if="loading" class="flex justify-center mt-10 text-gray-600 text-lg">
      <p>⏳ Loading events...</p>
    </div>

    <!-- แสดง Error ถ้ามี -->
    <div v-if="error" class="flex justify-center mt-10 text-red-500 text-lg">
      <p>{{ error }}</p>
    </div>

    <!-- แสดงรายการ Events -->
    <div
      v-if="events.length > 0"
      class="overflow-auto max-h-[700px] mt-5 w-full flex flex-col items-center gap-6"
    >
      <div
        v-for="event in events"
        :key="event.id"
        class="w-full max-w-xs md:max-w-2xl lg:max-w-4xl rounded-lg overflow-hidden shadow-md cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-xl"
        @click="goToEvent(event.id)"
      >
        <img
          :src="
            event.image ||
            event.imageUrl ||
            'https://shortrecap.co/wp-content/uploads/2020/05/Catcover_web.jpg'
          "
          class="w-full h-48 md:h-64 lg:h-80 object-cover rounded-lg"
          alt="Event Image"
        />
      </div>
    </div>

    <!-- กรณีไม่มีข้อมูล -->
    <div
      v-else-if="!loading && !error"
      class="flex justify-center mt-10 text-gray-600 text-lg"
    >
      <p>No events found.</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import * as api from "@/services/API.service";
import { useIndexStore } from "@/stores/main";

const store = useIndexStore();
const router = useRouter();

const events = ref<Array<{ id: number; image?: string; imageUrl?: string }>>(
  []
);
const loading = ref(true);
const error = ref<string | null>(null);

const goToEvent = (id: number) => {
  router.push(`/events/${id}`);
};

const fetchEvents = async () => {
  try {
    const response = await api.getEvents();
    if (response.data && Array.isArray(response.data.data)) {
      events.value = response.data.data;
    } else {
      error.value = "Invalid data format from API.";
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || "Failed to load events.";
    console.error("Error fetching events:", err);
  } finally {
    loading.value = false;
  }
};

// โหลดข้อมูลเมื่อ Component ถูก Mounted
onMounted(() => {
  fetchEvents();
});
</script>

<style></style>
