<template>
  <div>
    <h1 class="font-serif font-bold max-sm:text-xl max-lg:text-2xl max-lg:mt-10 max-sm:mt-5 flex justify-center">
      My Tickets
    </h1>

    <div class="overflow-y-auto max-sm:h-[550px] max-lg:h-[810px] mt-2">
      <div class="flex justify-center">
        <div>
          <!-- Section สำหรับแสดง Event Card -->
          <div class="grid grid-cols-1 lg:grid-cols-1 gap-4 p-4">
            <!-- ใช้ v-for สร้างการ์ดแต่ละอีเวนต์ -->
            <div
              v-for="ticket in tickets"
              :key="ticket.id"
              class=" h-auto max-sm:w-[330px] max-lg:w-[700px] rounded-lg mt-2"
            >
              <!-- คลิกเพื่อไปยังหน้ารายละเอียด -->
              <NuxtLink :to="'/ticket/' + ticket.id">
                <img
                  :src="ticket.image"
                  alt="Event Image"
                  class="w-full h-full object-contain rounded-lg"
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
const tickets = [
  { id: 1, image: "/images/ticket/ticket01.jpeg" },
  { id: 2, image: "/images/ticket/ticket02.jpeg" },
  { id: 3, image: "/images/ticket/ticket03.jpeg" },
];
</script>
