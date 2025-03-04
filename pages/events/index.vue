<template>
  <div>
    <h1 class="font-serif font-bold text-xl mt-5 flex justify-center">
      Events
    </h1>

    <div class="overflow-y-auto h-[550px] mt-2">
      <div class="flex justify-center">
        <div>
          <!-- Section สำหรับแสดง Event Card -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            <!-- ใช้ v-for สร้างการ์ดแต่ละอีเวนต์ -->
            <div
              v-for="event in events"
              :key="event.id"
              class="w-[340px] h-[150px] bg-gray-300 rounded-lg"
            >
              <!-- รูปภาพ -->
              <img
                :src="event.image"
                alt="Event Image"
                class="w-full h-full object-cover rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">


definePageMeta({
  layout: "events",
});
// ข้อมูลจำลองของอีเวนต์
const events = [
  {
    id: 1,
    image: "/images/event01.png",
  },
  {
    id: 2,
    image: "/images/event01.png",
  },
  {
    id: 3,
    image: "/images/event01.png",
  },
  {
    id: 4,
    image: "/images/event01.png",
  },
  {
    id: 5,
    image: "/images/event01.png",
  },
];
</script>

<style scoped></style>
