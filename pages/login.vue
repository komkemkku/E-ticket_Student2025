<template>
  <!-- ปุ่มย้อนกลับ -->
  <div class="flex justify-start ml-5 mt-5">
    <button
      @click="goBack"
      class="text-white bg-[#A73B24] opacity-80 px-3 py-1 rounded-lg shadow-xl"
    >
      Back
    </button>
  </div>
  <div
    class="flex flex-col items-center bg-white p-6 max-lg:mt-8 max-sm:mt-8 font-serif"
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

    <h2 class="text-center text-xl text-black font-semibold mt-3">Login</h2>

    <form
      @submit.prevent="submitForm"
      class="w-full max-w-md px-6 md:w-1/2 lg:w-1/3 mt-8 md:mt-12"
    >
      <div v-for="(field, index) in formFields" :key="index" class="mb-4">
        <label class="block text-black font-medium mb-1">
          {{ field.label }} :
        </label>
        <input
          v-model="form[field.model]"
          :type="field.type"
          class="w-full px-4 py-3 rounded-2xl bg-gray-200 focus:outline-none"
          :pattern="field.pattern"
          required
        />
      </div>

      <div class="flex justify-center">
        <!-- ปุ่มล็อกอิน -->
        <button
          type="submit"
          class="text-lg px-6 py-2 bg-[#A73B24] text-white rounded-2xl mt-6 md:mt-8 lg:mt-12 hover:bg-[#A73B24] transition cursor-pointer"
          :disabled="loading"
        >
          {{ loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ" }}
        </button>
      </div>

      <hr class="mt-18" />

      <div>
        <p class="text-gray-800 text-m flex justify-center mt-8">
          ยังไม่มีบัญชี ?
          <NuxtLink
            to="/register"
            class="hover:text-[#A73B24] text-red-600 cursor-pointer mx-3"
          >
            ลงทะเบียน
          </NuxtLink>
        </p>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import Swal from "sweetalert2";
import { useRouter } from "vue-router";
import { useIndexStore } from "@/stores/main";
import type { Login } from "@/models/page.model";
import * as auth from "@/services/auth.service";
import * as api from "@/services/API.service";
import { ref } from "vue";
// import { useCookie } from "#app";

definePageMeta({
  layout: "auth",
});

const router = useRouter();
const authStore = useIndexStore();
const store = useIndexStore();
const loading = ref(false);

const form = ref<Login>({
  email: "",
  student_id: "",
});

// ✅ ฟิลด์ข้อมูลของฟอร์ม
const formFields = [
  {
    label: "KKU Mail",
    model: "email",
    type: "email",
    pattern: "[a-zA-Z0-9._%+-]+@kkumail\\.com",
  },
  {
    label: "Student ID",
    model: "student_id",
    type: "text",
  },
];

const goBack = () => {
  router.push("/");
};

// ✅ ฟังก์ชันล็อกอิน
const submitForm = async () => {
  try {
    if (!form.value.email.endsWith("@kkumail.com")) {
      Swal.fire(
        "⚠️ ข้อผิดพลาด",
        "กรุณาใช้ KKU Mail ที่ถูกต้อง (@kkumail.com)",
        "warning"
      );
      return;
    }

    loading.value = true;
    console.log("📌 Sending Login Request:", form.value);

    const response = await auth.login({
      email: form.value.email,
      student_id: form.value.student_id,
    });

    if (response.data.status === 200) {
      const { token } = response.data;

      const authToken = useCookie("token");
      authToken.value = token;

      localStorage.setItem("token", token);

      Swal.fire({
        title: "✅ ล็อกอินสำเร็จ!",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      setTimeout(() => {
        router.push("/events");
      }, 2000);
    } else {
      throw new Error(response.data.message || "เกิดข้อผิดพลาด");
    }
  } catch (err) {
    console.error("❌ Login Failed:", err);

    Swal.fire({
      title: "❌ ล็อกอินไม่สำเร็จ",
      text: "อีเมลหรือรหัสนักศึกษาไม่ถูกต้อง หรือบัญชีไม่มีอยู่",
      icon: "error",
    });
  } finally {
    loading.value = false;
  }
};

const getUserInfo = async () => {
  try {
    console.log("📌 Fetching user info...");

    // 🔹 3. **เรียก API ดึงข้อมูลผู้ใช้**
    const resp = await api.getUserInfo();
    const data = resp.data.data;

    if (data && data.id) {
      store.userId = data.id;
      console.log("✅ User ID Loaded:", data.id);
    } else {
      throw new Error("ไม่พบข้อมูลผู้ใช้");
    }
  } catch (error) {
    console.error("❌ Error fetching user info:", error);
  }
};
</script>

<style scoped>
/* ปรับสไตล์เพิ่มเติมหากจำเป็น */
</style>
