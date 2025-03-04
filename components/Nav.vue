<template>
  <div>
    <!-- Button -->
    <div class="flex justify-center">
      <div
        class="w-[190px] h-[50px] rounded-xl shadow-md border px-2 flex justify-between items-center"
      >
        <NuxtLink
          to="/events/"
          class="group w-[35px] h-[35px] flex justify-center items-center rounded-md transition-colors duration-200 hover:bg-black/80 cursor-pointer"
          :class="{ 'active-btn': $route.path === '/events/' }"
        >
          <svg
            class="w-6 h-6 transition-colors duration-200"
            :class="{
              'text-white': $route.path === '/events/',
              'text-black group-hover:text-white': $route.path !== '/events/',
            }"
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
              d="M18 6H6m12 4H6m12 4H6m12 4H6"
            />
          </svg>
        </NuxtLink>

        <NuxtLink
          to="/"
          class="group w-[35px] h-[35px] flex justify-center items-center rounded-md transition-colors duration-200 hover:bg-black/80 cursor-pointer"
          :class="{ 'active-btn': $route.path === '/' }"
        >
          <svg
            class="w-6 h-6 transition-colors duration-200"
            :class="{
              'text-white': $route.path === '/',
              'text-black group-hover:text-white': $route.path !== '/',
            }"
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
              d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"
            />
          </svg>
        </NuxtLink>

        <NuxtLink
          to="/ticket"
          class="group w-[35px] h-[35px] flex justify-center items-center rounded-md transition-colors duration-200 hover:bg-black/80 cursor-pointer"
          :class="{ 'active-btn': $route.path === '/ticket' }"
        >
          <svg
            class="w-6 h-6 transition-colors duration-200"
            :class="{
              'text-white': $route.path === '/ticket',
              'text-black group-hover:text-white': $route.path !== '/ticket',
            }"
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
              d="M18.5 12A2.5 2.5 0 0 1 21 9.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v2.5a2.5 2.5 0 0 1 0 5V17a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2.5a2.5 2.5 0 0 1-2.5-2.5Z"
            />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();

// active รองรับหลาย path
const isActive = (paths: string[]) => {
  return paths.includes(route.path);
};
</script>

<style>
.active-btn {
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  border-radius: 5px;
  padding: 8px;
}
</style>
