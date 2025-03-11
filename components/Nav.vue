<template>
  <div>
    <!-- ✅ Navbar -->
    <div
      class="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white shadow-md rounded-xl border px-4 flex justify-between items-center w-[250px] sm:w-[280px] md:w-[300px] lg:w-[320px] h-[45px] sm:h-[50px] md:h-[55px] lg:h-[55px] z-[999]"
    >
      <!-- 🔹 Events -->
      <NuxtLink
        to="/events/"
        class="group w-[35px] h-[35px] md:w-[40px] md:h-[40px] flex justify-center items-center rounded-md transition duration-200 hover:bg-black/80 cursor-pointer"
        :class="{ 'active-btn': $route.path.includes('/events') }"
      >
        <svg
          class="w-5 h-5 md:w-6 md:h-6 transition duration-200"
          :class="{
            'text-white': $route.path.includes('/events'),
            'text-black group-hover:text-white':
              !$route.path.includes('/events'),
          }"
          xmlns="http://www.w3.org/2000/svg"
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

      <!-- 🔹 Home -->
      <NuxtLink
        to="/"
        class="group w-[35px] h-[35px] md:w-[40px] md:h-[40px] flex justify-center items-center rounded-md transition duration-200 hover:bg-black/80 cursor-pointer"
        :class="{ 'active-btn': $route.path === '/' }"
      >
        <svg
          class="w-5 h-5 md:w-6 md:h-6 transition duration-200"
          :class="{
            'text-white': $route.path === '/',
            'text-black group-hover:text-white': $route.path !== '/',
          }"
          xmlns="http://www.w3.org/2000/svg"
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

      <!-- 🔹 Tickets -->
      <NuxtLink
        to="/ticket/"
        class="group w-[35px] h-[35px] md:w-[40px] md:h-[40px] flex justify-center items-center rounded-md transition duration-200 hover:bg-black/80 cursor-pointer"
        :class="{ 'active-btn': $route.path.includes('/ticket') }"
      >
        <svg
          class="w-5 h-5 md:w-6 md:h-6 transition duration-200"
          :class="{
            'text-white': $route.path.includes('/ticket'),
            'text-black group-hover:text-white':
              !$route.path.includes('/ticket'),
          }"
          xmlns="http://www.w3.org/2000/svg"
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

<script setup>
const route = useRoute();
</script>

<style>
.active-btn {
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  border-radius: 5px;
  padding: 8px;
}
</style>
