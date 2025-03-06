<template>
    <div class="flex flex-col items-center bg-white p-6 max-lg:mt-20 max-sm:mt-24 font-serif">
      <!-- ปุ่มย้อนกลับ -->
      <button @click="goBack" class="absolute left-14 max-sm:left-8 max-sm:mt-2 mt-1 text-2xl">
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
  
      <!-- หัวข้อ -->
      <h1 class="text-3xl font-bold text-black">KhonKaen</h1>
      <p class="text-lg font-semibold text-black">University</p>
  
      <h2 class="text-center text-gray-800 font-medium">เข้าสู่ระบบ</h2>
  
      <!-- ฟอร์มล็อกอิน -->
      <form @submit.prevent="submitForm" class="w-full max-sm:w-xs max-lg:w-lg max-lg:mt-10 max-sm:mt-4">
        <div v-for="(field, index) in formFields" :key="index" class="max-lg:mb-6 max-sm:mb-3">
          <label class="block text-black font-medium mb-1">
            {{ field.label }} :
          </label>
          <input
            v-model="form[field.model]"
            :type="field.type"
            class="w-full px-4 py-2 rounded-2xl bg-gray-200 focus:outline-none"
            :pattern="field.pattern"
            required
          />
        </div>
  
        <div class="flex justify-center">
          <!-- ปุ่มล็อกอิน -->
          <button
            type="submit"
            class="max-lg:text-lg max-sm:text-base max-lg:px-10 max-sm:px-4 max-lg:py-2 max-sm:py-2 bg-gray-400 text-white rounded-2xl max-lg:mt-10 max-sm:mt-4 hover:bg-[#A73B24] transition cursor-pointer"
          >
            เข้าสู่ระบบ
          </button>
        </div>
        <hr class="mt-5" />
  
        <div>
          <p class="text-gray-800 text-lg flex justify-center mt-5"> ยังไม่มีบัญชี ? 
            <NuxtLink to="/register" class="hover:text-[#A73B24] cursor-pointer mx-3"> ลงทะเบียน </NuxtLink>
          </p>
        </div>
      </form>
    </div>
  </template>

<script setup lang="ts">
definePageMeta({
  layout: "auth",
});

const router = useRouter();

// สร้างตัวแปรเก็บค่าฟอร์ม
const form: { [key: string]: string } = {
  studentID: "",
  email: "",
};

// กำหนดฟิลด์ข้อมูลของฟอร์ม
const formFields = [
  {
    label: "KKU Mail",
    model: "email",
    type: "email",
    pattern: "[a-zA-Z0-9._%+-]+@kku\\.ac\\.th",
  },
  {
    label: "Student ID",
    model: "studentID",
    type: "text",
    pattern: "\\d{2}-\\d{6}-\\d{3}",
  },
];

const goBack = () => {
  router.back();
};

// ฟังก์ชันล็อกอิน
const submitForm = () => {
  if (!form.email.endsWith("@kku.com")) {
    alert("กรุณาใช้ KKU Mail ที่ถูกต้อง (@kku.com)");
    return;
  }
  if (!/^\d{2}-\d{6}-\d{3}$/.test(form.studentID)) {
    alert("รหัสนักศึกษาต้องเป็นรูปแบบ XX-XXXXXX-XXX");
    return;
  }

  alert("ล็อกอินสำเร็จ! 🎉");
  console.log("ข้อมูลที่ส่ง:", form);
};
</script>

<style scoped>
/* ปรับสไตล์เพิ่มเติมหากจำเป็น */
</style>
