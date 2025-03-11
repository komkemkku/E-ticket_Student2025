<template>
  <div
    class="flex flex-col items-center bg-white p-6 max-lg:mt-18 max-sm:mt-0 font-serif"
  >
    <!-- ปุ่มย้อนกลับ -->
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

    <!-- หัวข้อ -->
    <h1 class="text-3xl font-bold text-black">KhonKaen</h1>
    <p class="text-lg font-semibold text-black">University</p>

    <h2 class="text-center text-gray-800 font-medium">
      ลงทะเบียนเข้าร่วมกิจกรรม
    </h2>

    <!-- ฟอร์มลงทะเบียน -->
    <div class="max-lg:mb-4 max-sm:mb-1">

      <div class="w-full max-sm:w-xs max-lg:w-lg max-lg:mt-10 max-sm:mt-4">
          <label for="firstname" class="block text-black font-normal mb-1"> ชื่อจริง : </label>
          <input
            type="text"
            id="firstname"
            v-model="registers.firstname"
            class="w-full px-4 py-2 rounded-2xl bg-gray-200 focus:outline-none"
            required
            placeholder="กรุณาใส่ชื่อ"
          />
        </div>
        <div class="mt-4">
          <label for="lastname" class="block text-black font-normal mb-1"> นามสกุล : </label>
          <input
            type="text"
            id="lastname"
            v-model="registers.lastname"
            class="w-full px-4 py-2 rounded-2xl bg-gray-200 focus:outline-none "
            required
            placeholder="กรุณาใส่นามสกุล"
          />
        </div>
        <div class="mt-4">
          <label for="nickname" class="block text-black font-normal mb-1"> ชื่อเล่น : </label>
          <input
            type="text"
            id="nickname"
            v-model="registers.nickname"
            class="w-full px-4 py-2 rounded-2xl bg-gray-200 focus:outline-none"
            required
            placeholder="กรุณาใส่ชื่อเล่น"
          />
        </div>
        <div class="mt-4">
          <label for="email" class="block text-black font-normal mb-1"> อีเมล : </label>
          <input
            type="text"
            id="email"
            v-model="registers.email"
            class="w-full px-4 py-2 rounded-2xl bg-gray-200 focus:outline-none"
            required
            placeholder="กรุณาใส่อีเมล"
          />
        </div>
        <div class="mt-4">
          <label for="student_id" class="block text-black font-normal mb-1"> รหัสนักศึกษา : </label>
          <input
            type="text"
            id="student_id"
            v-model="registers.student_id"
            class="w-full px-4 py-2 rounded-2xl bg-gray-200 focus:outline-none"
            required
            placeholder="กรุณาใส่รหัสนักศึกษา"
          />
        </div>
        <div class="mt-4">
          <label for="faculty" class="block text-black font-normal mb-1"> คณะ : </label>
          <input
            type="text"
            id="faculty"
            v-model="registers.faculty"
            class="w-full px-4 py-2 rounded-2xl bg-gray-200 focus:outline-none"
            required
            placeholder="กรุณาใส่คณะ"
          />
        </div>
        <div class="mt-4">
          <label for="medical_condition" class="block text-black font-normal mb-1"> โรคประจำตัว : </label>
          <input
            type="text"
            id="medical_condition"
            v-model="registers.medical_condition"
            class="w-full px-4 py-2 rounded-2xl bg-gray-200 focus:outline-none"
            placeholder="กรุณาใส่ข้อมูล"
          />
        </div>
        <div class="mt-4">
          <label for="food_allergies" class="block text-black font-normal mb-1"> อาหารที่แพ้ : </label>
          <input
            type="text"
            id="food_allergies"
            v-model="registers.food_allergies"
            class="w-full px-4 py-2 rounded-2xl bg-gray-200 focus:outline-none"
            placeholder="กรุณาใส่ข้อมูล"
          />
        </div>
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
    
    <div class="border-t mt-4">
      <p class="text-gray-800 text-lg flex justify-center mt-5">
        มีบัญชีแล้ว ?
        <NuxtLink to="/login" class="hover:text-[#A73B24] cursor-pointer mx-3">
          เข้าสู่ระบบ
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import Swal from "sweetalert2";
import type { Register } from "~/models/page.model";
import services from "~/services";

definePageMeta({
  layout: "auth",
});

const router = useRouter();
const registers = ref<Register>({
  firstname: "",
  lastname: "",
  nickname: "",
  email: "",
  student_id: "",
  faculty: "",
  medical_condition: "",
  food_allergies: "",
});

// ฟังก์ชันย้อนกลับ
const goBack = () => {
  router.back();
};

const register = async () => {
  // ตรวจสอบรูปแบบของรหัสนักศึกษา (ต้องเป็น 9 ตัวเลข + "-" + 1 ตัวเลข)
  const studentIdPattern = /^\d{9}-\d$/;
  if (!studentIdPattern.test(registers.value.student_id)) {
    alert("❌ กรุณากรอกรหัสนักศึกษาให้ถูกต้อง เช่น 643120391-7");
    return;
  }

  // Popup ยืนยันก่อนลงทะเบียน
  const confirmRegister = confirm(
    `⚠️ กรุณาตรวจสอบรหัสนักศึกษาให้แน่ใจ\n\nรหัสของคุณ: ${registers.value.student_id}\n\n❗️ เมื่อกดลงทะเบียนแล้ว **ไม่สามารถแก้ไขได้** ❗️\n\nคุณแน่ใจหรือไม่?`
  );

  if (!confirmRegister) {
    return;
  }

  await services.auth
    .register(registers.value)
    .then((resp: any) => {
      console.log(resp);

      if (resp.status == 200) {
        Swal.fire({
          title: "ลงทะเบียนสำเร็จ!",
          text: "คุณสามารถเข้าสู่ระบบได้แล้ว.",
          icon: "success",
          confirmButtonText: "ตกลง",
        });
        router.push("/login");
      }
    })
    .catch((error: any) => {
      console.error(error);
      Swal.fire({
        title: "เกิดข้อผิดพลาด!",
        text: "ไม่สามารถลงทะเบียนได้ กรุณาลองใหม่อีกครั้ง.",
        icon: "error",
        confirmButtonText: "ตกลง",
      });
      return;
    });
};
</script>
