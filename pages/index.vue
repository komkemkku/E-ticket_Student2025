<template>
  <div class="flex justify-center items-center mt-5 px-4">
    <div class="w-full max-w-xs md:max-w-md lg:max-w-screen-lg">
      <!-- รูปภาพต้อนรับ -->
      <div class="rounded-lg overflow-hidden">
        <img
          src="/images/wel.jpg"
          alt="Welcome Image"
          class="w-full max-h-[250px] md:max-h-[300px] lg:max-h-[400px] object-cover rounded-lg"
        />
      </div>

      <!-- ข้อความต้อนรับ -->
      <div class="mt-5 p-5 text-center bg-white shadow-md rounded-lg">
        <p class="text-lg md:text-xl lg:text-2xl font-semibold leading-relaxed">
          <b>Welcome KKU62</b>
        </p>
      </div>
      <!-- ปุ่ม Login และ Register -->
      <div
        class="absolute bottom-36 md:bottom-36 left-0 right-0 flex flex-col md:flex-row md:justify-center gap-3 md:gap-5 py-4"
      >
        <NuxtLink
          to="/login"
          class="w-full max-w-[200px] md:w-40 lg:w-48 text-center bg-[#A73B24] hover:bg-[#A73B24] text-white font-semibold py-2 px-4 border border-[#A73B24] rounded-3xl transition mx-auto md:mx-0"
        >
          Login
        </NuxtLink>

        <NuxtLink
          to="/register"
          class="w-full max-w-[200px] md:w-40 lg:w-48 text-center bg-white hover:bg-[#A73B24] text-[#A73B24] font-semibold py-2 px-4 border border-[#A73B24] rounded-3xl transition shadow-xl mx-auto md:mx-0"
        >
          Register
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped></style>
