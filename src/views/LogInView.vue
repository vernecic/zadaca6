<template>
  <div class="bg-linear-to-r from-cyan-600 to-blue-800">
    <div class="flex justify-center items-center h-screen">
      <div class="border p-6 rounded-lg border-zinc-400 bg-gray-200 shadow-xl">
        <h1 class="text-xl font-bold uppercase font-custom">Prijava</h1>
        <div class="mt-5">
          <form class="grid grid-cols-2 gap-5" @submit.prevent="handleLogin">
            <input
              type="email"
              placeholder="Unesi email adresu"
              class="border border-zinc-400 p-2 px-4 rounded-md placeholder:text-center text-left focus:outline-none placeholder:text-sm"
              v-model="email"
            />

            <input
              type="password"
              placeholder="Unesi lozinku"
              class="border border-zinc-400 p-2 px-4 rounded-md placeholder:text-center text-left focus:outline-none placeholder:text-sm"
              v-model="password"
            />

            <button
              class="bg-blue-500 text-white px-4 p-2 rounded-xl font-semibold cursor-pointer"
            >
              Prijavi se!
            </button>
            <router-link to="/">
              <button
                class="bg-white border border-blue-500 text-blue-500 px-4 p-2 rounded-xl font-semibold cursor-pointer"
              >
                Registracija
              </button>
            </router-link>
            <div v-if="error">
              <h1 class="text-red-600">{{ errorPoruka }}</h1>
            </div>
          </form>
        </div>
        <div class="mt-5"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "@/store/userStore";
import { useRouter } from "vue-router";
import { ref } from "vue";

const userStore = useUserStore();
const router = useRouter();

const error = ref(false);
const errorPoruka = ref("");
const email = ref("");
const password = ref("");

const handleLogin = () => {
  console.log("Registrirani korisnici:", userStore.registriraniKorisnici);
  console.log("Tražim email:", email.value);
  try {
    userStore.prijava(email.value, password.value);
    router.push("/home");
  } catch (err) {
    error.value = true;
    errorPoruka.value = err.message;
  }
};
</script>
