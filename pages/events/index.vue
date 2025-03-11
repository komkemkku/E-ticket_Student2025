<template>
  <div class="px-4 py-4">
    <!-- หัวข้อ Events -->
    <h1
      class="font-serif font-bold text-lg md:text-2xl lg:text-3xl text-center mt-5 md:mt-5"
    >
      Events
    </h1>

    <div
      class="overflow-y-auto h-auto max-h-[550px] md:max-h-[900px] lg:max-h-[900px] mt-2"
    >
      <!-- คอนเทนเนอร์แสดงอีเวนต์ -->
      <div class="flex justify-center">
        <div
          class="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl"
        >
          <div class="grid grid-cols-1 gap-6 p-4">
            <!-- ใช้ v-for สร้างการ์ดแต่ละอีเวนต์ -->
            <div
              v-for="event in events"
              :key="event.id"
              class="w-full rounded-lg overflow-hidden shadow-lg transition transform hover:scale-105"
            >
              <!-- คลิกเพื่อไปยังหน้ารายละเอียด -->
              <NuxtLink :to="'/events/' + event.id">
                <img
                  :src="event.image"
                  alt="Event Image"
                  class="w-full h-auto object-cover rounded-lg"
                />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// ข้อมูลจำลองของอีเวนต์
const events = [
  { id: 1, image: "/images/event/event01.png" },
  { id: 2, image: "/images/event/event02.png" },
  { id: 3, image: "/images/event/event03.png" },
  { id: 4, image: "/images/event/event01.png" },
  { id: 5, image: "/images/event/event02.png" },
  { id: 6, image: "/images/event/event03.png" },
];
</script>

<style scoped>
/* เพิ่มเอฟเฟกต์เมื่อ hover บนการ์ด */
.hover\:scale-105:hover {
  transform: scale(1.05);
}
</style>
