<template>
  <div>
    <div>
      <button
        @click="goBack"
        class="absolute left-14 max-sm:left-8 max-sm:mt-2 mt-1 text-2xl"
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
      <h1
        class="font-serif font-bold max-sm:text-xl max-lg:text-2xl flex justify-center max-lg:mt-10 max-sm:mt-5"
      >
        Event {{ eventId }}
      </h1>
      <div class="flex justify-center mt-2">
        <img
          :src="eventImage"
          alt="Ticket Image"
          class="mt-6 max-sm:w-[330px] max-lg:w-[700px] h-auto rounded-lg"
        />
      </div>

      <div class="flex justify-center">
        <div class="max-sm:w-[340px] max-lg:w-[730px]">
          <h1
            class="font-serif font-medium max-sm:text-xl max-lg:text-3xl text-center max-lg:mt-10 max-sm:mt-5 leading-relaxed overflow-y-auto"
          >
            {{ eventName }}
          </h1>

                <!-- Event Details -->
      <div class="mt-5 px-4">
        <p class="max-sm:text-base max-lg:text-xl mt-2 leading-relaxed">รายละเอียดงาน: {{ eventDetail }}</p>
        <p class="max-sm:text-base max-lg:text-xl mt-2 leading-relaxed">สถานที่: {{ eventAddress }}</p>
        <p class="max-sm:text-base max-lg:text-xl mt-2 leading-relaxed">เวลา: {{ eventTime }}</p>
        <p class="max-sm:text-base max-lg:text-xl mt-2 leading-relaxed">การแต่งกาย: {{ eventDress }}</p>
      </div>
        </div>
      </div>

      <!-- Register Button -->
      <div class="flex justify-center max-sm:mt-16 max-lg:mt-32">
        <button class="bg-gray-300 text-black font-medium max-sm:text-lg max-lg:text-xl py-2 px-6 rounded-lg">
          ลงทะเบียน
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const eventId = route.params.id;

// ข้อมูล Ticket (รูป + ชื่อ)
const eventData: Record<string, { image: string; name: string; detail:string; address:string; time:string; dress:string; }> = {
  "1": { image: "/images/event/event01.png", name: "พิธีบายศรีสู่ขวัญ", detail: "งานบายศรีมข เชิญชวนมาเข้าจ้า มาเลย คัมมอน มาจ่ะๆๆ", address:"โรงชาย", time: "06:00 - 18:00", dress:"ชุดสุภาพ"},
  "2": { image: "/images/event/event01.png", name: "พิธีบายศรีสู่ขวัญ", detail: "งานบายศรีมข เชิญชวนมาเข้าจ้า", address:"โรงชาย", time: "06:00 - 18:00", dress:"ชุดสุภาพ" },
  "3": { image: "/images/event/event01.png", name: "พิธีบายศรีสู่ขวัญ", detail: "งานบายศรีมข เชิญชวนมาเข้าจ้า", address:"โรงชาย", time: "06:00 - 18:00", dress:"ชุดสุภาพ" },
};

// ดึงข้อมูล
const eventImage = eventData[eventId]?.image || "/images/default.jpg";
const eventName = eventData[eventId]?.name || "Unknown Ticket";
const eventDetail = eventData[eventId]?.detail || "Unknown";
const eventAddress = eventData[eventId]?.address || "Unknown";
const eventTime = eventData[eventId]?.time || "Unknown";
const eventDress = eventData[eventId]?.dress || "Unknown";

const goBack = () => {
  router.back();
};
</script>
