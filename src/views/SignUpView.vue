<template>
  <div class="bg-linear-to-r from-cyan-600 to-blue-800">
    <div class="flex justify-center items-center h-screen">
      <div class="border p-6 rounded-lg border-zinc-400 bg-gray-200 shadow-xl">
        <h1 class="text-xl font-bold uppercase font-custom">Registracija</h1>
        <div class="mt-5">
          <form @submit.prevent="handleRegister" class="grid grid-cols-2 gap-5">
            <input
              type="text"
              placeholder="Unesi korisničko ime"
              class="border border-zinc-400 p-2 px-4 rounded-md placeholder:text-center text-left focus:outline-none placeholder:text-sm"
              v-model="username"
            />
            <input
              type="password"
              placeholder="Unesi lozinku"
              class="border border-zinc-400 p-2 px-4 rounded-md placeholder:text-center text-left focus:outline-none placeholder:text-sm"
              v-model="password"
            />
            <input
              type="email"
              placeholder="Unesi email adresu"
              class="border border-zinc-400 p-2 px-4 rounded-md placeholder:text-center text-left focus:outline-none placeholder:text-sm"
              v-model="email"
            />
            <input
              type="password"
              placeholder="Potvrdi lozinku"
              class="border border-zinc-400 p-2 px-4 rounded-md placeholder:text-center text-left focus:outline-none placeholder:text-sm"
              v-model="confirmPassword"
            />
            <button
              class="bg-blue-500 text-white px-4 p-2 rounded-xl font-semibold cursor-pointer"
            >
              Registraj se!
            </button>
            <router-link to="/login">
              <button
                class="bg-white border border-blue-500 text-blue-500 px-4 p-2 rounded-xl font-semibold cursor-pointer"
              >
                Prijava
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/userStore";

const router = useRouter();
const userStore = useUserStore();

const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const error = ref(false);
const errorPoruka = ref("");

const handleRegister = () => {
  if (password.value !== confirmPassword.value) {
    error.value = true;
    errorPoruka.value = "Lozinke se ne podudaraju";
    return;
  }
  const korisnik = {
    username: username.value,
    email: email.value,
    password: password.value,
  };
  try {
    userStore.registracija(korisnik);
    router.push("/home");
  } catch (err) {
    error.value = true;
    errorPoruka.value = err.message;
  }
};
</script>
