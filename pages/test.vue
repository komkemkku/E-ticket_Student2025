<template>
    <div class="w-[393px] h-[852px] mx-auto bg-white">
      <!-- Header -->
      <div class="bg-red-700 text-white py-4 text-center rounded-b-lg">
        <h1 class="text-2xl font-bold">KhonKaen</h1>
        <p class="text-sm">University</p>
      </div>
  
      <!-- Event Section -->
      <div class="p-4">
        <h1 class="text-lg font-bold text-center mt-3">Event</h1>
  
        <!-- Event Image -->
        <div class="flex justify-center mt-4">
          <div class="w-[340px] h-[150px] bg-gray-300 rounded-lg"></div>
        </div>
  
        <!-- Event Name -->
        <h2 class="text-lg font-semibold text-center mt-4">
          {{ eventName }}
        </h2>
  
        <!-- Event Details -->
        <div class="mt-4 px-4">
          <p class="text-sm font-semibold">รายละเอียดงาน:</p>
          <p class="text-sm">สถานที่:</p>
          <p class="text-sm">เวลา:</p>
          <p class="text-sm">การแต่งกาย:</p>
        </div>
  
        <!-- Register Button -->
        <div class="flex justify-center mt-6">
          <button
            class="bg-gray-300 text-black font-medium py-2 px-6 rounded-lg"
          >
            ลงทะเบียน
          </button>
        </div>
      </div>
  
      <!-- Bottom Navigation -->
      <div
        class="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex justify-between items-center w-[180px] bg-white border rounded-full py-2 px-4 shadow-lg"
      >
        <NuxtLink
          to="/menu"
          class="group w-[35px] h-[35px] flex justify-center items-center rounded-md transition-colors duration-200 hover:bg-black/80 cursor-pointer"
          :class="{ 'bg-black text-white': $route.path.includes('/menu') }"
        >
          <svg
            class="w-6 h-6 transition-colors duration-200"
            :class="{ 'text-white': $route.path.includes('/menu'), 'text-black group-hover:text-white': !$route.path.includes('/menu') }"
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
              d="M18 6H6m12 4H6m12 4H6m12 4H6"
            />
          </svg>
        </NuxtLink>
  
        <NuxtLink
          to="/"
          class="group w-[35px] h-[35px] flex justify-center items-center rounded-md transition-colors duration-200 hover:bg-black/80 cursor-pointer"
          :class="{ 'bg-black text-white': $route.path === '/' }"
        >
          <svg
            class="w-6 h-6 transition-colors duration-200"
            :class="{ 'text-white': $route.path === '/', 'text-black group-hover:text-white': $route.path !== '/' }"
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
              d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"
            />
          </svg>
        </NuxtLink>
  
        <NuxtLink
          to="/ticket"
          class="group w-[35px] h-[35px] flex justify-center items-center rounded-md transition-colors duration-200 hover:bg-black/80 cursor-pointer"
          :class="{ 'bg-black text-white': $route.path.includes('/ticket') }"
        >
          <svg
            class="w-6 h-6 transition-colors duration-200"
            :class="{ 'text-white': $route.path.includes('/ticket'), 'text-black group-hover:text-white': !$route.path.includes('/ticket') }"
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
              d="M18.5 12A2.5 2.5 0 0 1 21 9.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v2.5a2.5 2.5 0 0 1 0 5V17a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2.5a2.5 2.5 0 0 1-2.5-2.5Z"
            />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const route = useRoute();
  
  // ดึงข้อมูลอีเวนต์ตาม ID
  const eventId = route.params.id;
  const eventData: Record<string, { name: string }> = {
    "1": { name: "ประดับซ่อกาลพฤกษ์ซ่อที่ 62" },
    "2": { name: "พิธีบายศรีสู่ขวัญ" },
    "3": { name: "พิธีปฐมนิเทศ" },
  };
  
  // กำหนดค่าเริ่มต้น
  const eventName = eventData[eventId]?.name || "Unknown Event";
  </script>
  
  <style scoped>
  /* ทำให้ปุ่ม active มีพื้นหลังสีดำ */
  .active-btn {
    background-color: black;
    color: white;
    border-radius: 5px;
    padding: 8px;
  }
  </style>
  