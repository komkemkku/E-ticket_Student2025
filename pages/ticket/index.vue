<template>
  <div>
    <!-- หัวข้อ My Tickets -->
    <h1
      class="font-serif font-bold text-xl md:text-2xl lg:text-3xl mt-5 md:mt-10 flex justify-center"
    >
      My Tickets
    </h1>

    <div
      class="overflow-y-auto h-auto max-h-[550px] md:max-h-[900px] lg:max-h-[900px] mt-2"
    >
      <div class="flex justify-center">
        <div>
          <!-- Section สำหรับแสดง Event Card -->
          <div class="grid grid-cols-1 gap-6 p-4">
            <!-- ใช้ v-for สร้างการ์ดแต่ละอีเวนต์ -->
            <div
              v-for="ticket in tickets"
              :key="ticket.id"
              class="h-auto w-full max-w-[330px] md:max-w-[500px] lg:max-w-[700px] rounded-lg mt-2"
            >
              <!-- คลิกเพื่อไปยังหน้ารายละเอียด -->
              <NuxtLink :to="'/ticket/' + ticket.id">
                <img
                  :src="ticket.image"
                  alt="Event Image"
                  class="w-full h-auto object-cover rounded-lg shadow-md"
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
  { id: 4, image: "/images/ticket/ticket03.jpeg" },
  { id: 5, image: "/images/ticket/ticket03.jpeg" },
];
</script>
