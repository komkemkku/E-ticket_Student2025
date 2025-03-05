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
        My Ticket {{ ticketId }}
      </h1>
      <div class="flex justify-center mt-2">
        <img
          :src="ticketImage"
          alt="Ticket Image"
          class="mt-6 max-sm:w-[330px] max-lg:w-[700px] h-auto rounded-lg"
        />
      </div>

      <div class=" flex justify-center">
        <div class=" max-sm:w-[340px] max-lg:w-[730px]">
            <h1
        class="font-serif font-medium max-sm:text-2xl max-lg:text-3xl text-center max-lg:mt-10 max-sm:mt-5 leading-relaxed overflow-y-auto"
      >
        {{ ticketName }}
      </h1>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const ticketId = route.params.id;

// ข้อมูล Ticket (รูป + ชื่อ)
const ticketData: Record<string, { image: string; name: string }> = {
  "1": { image: "/images/ticket/ticket01.jpeg", name: "จูงแขนเจ้าเข้ามข." },
  "2": { image: "/images/ticket/ticket02.jpeg", name: "จูงแขนเจ้าเข้ามข." },
  "3": { image: "/images/ticket/ticket03.jpeg", name: "จูงแขนเจ้าเข้ามข." },
};

// ดึงข้อมูล
const ticketImage = ticketData[ticketId]?.image || "/images/default.jpg";
const ticketName = ticketData[ticketId]?.name || "Unknown Ticket";

const goBack = () => {
  router.back();
};
</script>
