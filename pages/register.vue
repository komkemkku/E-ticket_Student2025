<template>
  <div class="flex flex-col items-center bg-white p-6 max-lg:mt-18 max-sm:mt-0 font-serif">
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

    <h2 class="text-center text-gray-800 font-medium">ลงทะเบียนเข้าร่วมกิจกรรม</h2>

    <!-- ฟอร์มลงทะเบียน -->
    <form @submit.prevent="submitForm" class="w-full max-sm:w-xs max-lg:w-lg max-lg:mt-10 max-sm:mt-4">
      <div v-for="(field, index) in formFields" :key="index" class="max-lg:mb-6 max-sm:mb-3">
        <label class="block text-black font-medium mb-1">
          {{ field.label }} :
        </label>
        <input
          v-model="form[field.model]"
          :type="field.type"
          :pattern="field.pattern"
          class="w-full px-4 py-2 rounded-2xl bg-gray-200 focus:outline-none"
          required
        />
      </div>

      <div class="flex justify-center">
        <!-- ปุ่มลงทะเบียน -->
        <button
          type="submit"
          class="max-lg:text-lg max-sm:text-base max-lg:px-10 max-sm:px-4 max-lg:py-2 max-sm:py-2 bg-gray-400 text-white rounded-2xl max-lg:mt-10 max-sm:mt-4 hover:bg-[#A73B24] transition cursor-pointer"
        >
          ลงทะเบียน
        </button>
      </div>

      <hr class="mt-5" />

      <div>
        <p class="text-gray-800 text-lg flex justify-center mt-5">
          มีบัญชีแล้ว ?
          <NuxtLink to="/login" class="hover:text-[#A73B24] cursor-pointer mx-3"> เข้าสู่ระบบ </NuxtLink>
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

const form = ref<Record<string, string>>({
  studentID: "",
  email: "",
  firstName: "",
  lastName: "",
  nickname: "",
  faculty: "",
  medical: "",
  foodAllergies: "",
});


// กำหนดฟิลด์ข้อมูลของฟอร์ม
const formFields = [
  { label: "Student ID", model: "studentID", type: "text", pattern: "\\d{9}-\\d" },
  { label: "KKU Mail", model: "email", type: "email" },
  { label: "Firstname", model: "firstName", type: "text" },
  { label: "Lastname", model: "lastName", type: "text" },
  { label: "Nickname", model: "nickname", type: "text" },
  { label: "Faculty", model: "faculty", type: "text" },
  { label: "Medical Conditions", model: "medical", type: "text" },
  { label: "Food Allergies", model: "foodAllergies", type: "text" },
];

// ฟังก์ชันย้อนกลับ
const goBack = () => {
  router.back();
};

// ฟังก์ชันตรวจสอบและลงทะเบียน
const submitForm = () => {
  // ตรวจสอบรูปแบบของรหัสนักศึกษา (ต้องเป็น 9 ตัวเลข + "-" + 1 ตัวเลข)
  const studentIdPattern = /^\d{9}-\d$/;
  if (!studentIdPattern.test(form.value.studentID)) {
    alert("❌ กรุณากรอกรหัสนักศึกษาให้ถูกต้อง เช่น 643120391-7");
    return;
  }

  // Popup ยืนยันก่อนลงทะเบียน
  const confirmRegister = confirm(
    `⚠️ กรุณาตรวจสอบรหัสนักศึกษาให้แน่ใจ\n\nรหัสของคุณ: ${form.value.studentID}\n\n❗️ เมื่อกดลงทะเบียนแล้ว **ไม่สามารถแก้ไขได้** ❗️\n\nคุณแน่ใจหรือไม่?`
  );

  if (!confirmRegister) {
    return;
  }

  alert("✅ ลงทะเบียนสำเร็จ! 🎉");
  console.log("ข้อมูลที่ส่ง:", form.value);
};
</script>
