<template>
  <div
    class="flex flex-col items-center bg-white p-6 max-lg:mt-8 max-sm:mt-6 font-serif"
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
    <!-- <h1 class="text-3xl font-bold text-black">KhonKaen</h1>
    <p class="text-lg font-semibold text-black">University</p> -->

    <h2 class="text-center text-xl text-black font-semibold mt-5">Register</h2>

    <!-- ฟอร์มลงทะเบียน -->
    <div class="max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto px-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div>
          <label for="firstname" class="block text-black font-normal mb-1">
            ชื่อจริง :
          </label>
          <input
            type="text"
            id="firstname"
            v-model="registers.firstname"
            class="w-full px-4 py-2 rounded-2xl bg-gray-200 focus:outline-none"
            required
            placeholder="กรุณาใส่ชื่อ"
          />
        </div>

        <div>
          <label for="lastname" class="block text-black font-normal mb-1">
            นามสกุล :
          </label>
          <input
            type="text"
            id="lastname"
            v-model="registers.lastname"
            class="w-full px-4 py-2 rounded-2xl bg-gray-200 focus:outline-none"
            required
            placeholder="กรุณาใส่นามสกุล"
          />
        </div>

        <div>
          <label for="nickname" class="block text-black font-normal mb-1">
            ชื่อเล่น :
          </label>
          <input
            type="text"
            id="nickname"
            v-model="registers.nickname"
            class="w-full px-4 py-2 rounded-2xl bg-gray-200 focus:outline-none"
            required
            placeholder="กรุณาใส่ชื่อเล่น"
          />
        </div>

        <div>
          <label for="email" class="block text-black font-normal mb-1">
            อีเมล :
          </label>
          <input
            type="text"
            id="email"
            v-model="registers.email"
            class="w-full px-4 py-2 rounded-2xl bg-gray-200 focus:outline-none"
            required
            placeholder="กรุณาใส่อีเมล"
          />
        </div>

        <div>
          <label for="student_id" class="block text-black font-normal mb-1">
            รหัสนักศึกษา :
          </label>
          <input
            type="text"
            id="student_id"
            v-model="registers.student_id"
            class="w-full px-4 py-2 rounded-2xl bg-gray-200 focus:outline-none"
            required
            placeholder="กรุณาใส่รหัสนักศึกษา"
          />
        </div>

        <div>
          <label for="faculty" class="block text-black font-normal mb-1">
            คณะ :
          </label>
          <input
            type="text"
            id="faculty"
            v-model="registers.faculty"
            class="w-full px-4 py-2 rounded-2xl bg-gray-200 focus:outline-none"
            required
            placeholder="กรุณาใส่คณะ"
          />
        </div>

        <div>
          <label
            for="medical_condition"
            class="block text-black font-normal mb-1"
          >
            โรคประจำตัว :
          </label>
          <input
            type="text"
            id="medical_condition"
            v-model="registers.medical_condition"
            class="w-full px-4 py-2 rounded-2xl bg-gray-200 focus:outline-none"
            placeholder="กรุณาใส่ข้อมูล"
          />
        </div>

        <div>
          <label for="food_allergies" class="block text-black font-normal mb-1">
            อาหารที่แพ้ :
          </label>
          <input
            type="text"
            id="food_allergies"
            v-model="registers.food_allergies"
            class="w-full px-4 py-2 rounded-2xl bg-gray-200 focus:outline-none"
            placeholder="กรุณาใส่ข้อมูล"
          />
        </div>
      </div>

      <div class="flex justify-center mt-6">
        <!-- ปุ่มลงทะเบียน -->
        <button
          type="submit"
          class="text-lg px-10 py-3 bg-[#A73B24] text-white rounded-2xl hover:bg-[#A73B24] transition cursor-pointer"
          @click="register"
        >
          ลงทะเบียน
        </button>
      </div>

      <div class="border-t mt-6">
        <p class="text-gray-800 text-m flex justify-center mt-5">
          มีบัญชีแล้ว ?
          <NuxtLink
            to="/login"
            class="hover:text-[#A73B24] text-red-600 cursor-pointer mx-3"
          >
            เข้าสู่ระบบ
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as Swal from "sweetalert2";
import type { Register } from "@/models/page.model";
import * as services from "@/services/auth.service";

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
  await services
    .register(registers.value)
    .then((resp: any) => {
      console.log(resp);

      if (resp.status == 200) {
        // Swal.fire({
        //   title: "ลงทะเบียนสำเร็จ!",
        //   text: "คุณสามารถเข้าสู่ระบบได้แล้ว.",
        //   icon: "success",
        //   confirmButtonText: "ตกลง",
        // });
        router.push("/login");
      }
    })
    .catch((error: any) => {
      console.error(error);
      // Swal.fire({
      //   title: "เกิดข้อผิดพลาด!",
      //   text: "ไม่สามารถลงทะเบียนได้ กรุณาลองใหม่อีกครั้ง.",
      //   icon: "error",
      //   confirmButtonText: "ตกลง",
      // });
      return;
    });
};
</script>
