<template>
    <div>
      <h1 class="font-serif font-bold text-xl mt-5 flex justify-center">
        My Tickets
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
                class="w-[340px] h-[150px]  rounded-lg"
              >
                <!-- รูปภาพ -->
                <img
                  :src="event.image"
                  alt="Event Image"
                  class="w-full h-full object-contain rounded-lg"
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
      image: "/images/ticket/ticket01.jpeg",
    },
    {
      id: 2,
      image: "/images/ticket/ticket02.jpeg",
    },
    {
      id: 3,
      image: "/images/ticket/ticket03.jpeg",
    },

  ];
  </script>
  
  <style scoped></style>
  