<template>
  <div class="bg-linear-to-r from-cyan-600 to-blue-800">
    <div class="flex justify-center items-center h-screen">
      <div class="border p-6 rounded-lg border-zinc-400 bg-gray-200 shadow-xl">
        <div class="flex justify-between">
          <h1 class="text-xl">
            Korisnik: <span class="font-semibold">{{ trenutniKorisnik }}</span>
          </h1>
          <button
            class="cursor-pointer bg-red-500 font-semibold px-3 py-1 text-white rounded-xl"
            @click="signOut"
          >
            Odjavi se
          </button>
        </div>
        <div class="mt-5">
          <form class="grid grid-cols-2 gap-5">
            <input
              type="email"
              placeholder="Unesi email adresu"
              class="border border-zinc-400 p-2 px-4 rounded-md placeholder:text-center text-left focus:outline-none placeholder:text-sm"
              v-model="email"
            />
            <input
              type="password"
              placeholder="Unesi novu lozinku"
              class="border border-zinc-400 p-2 px-4 rounded-md placeholder:text-center text-left focus:outline-none placeholder:text-sm"
              v-model="novaLozinka"
            />

            <input
              type="password"
              placeholder="Unesi lozinku"
              class="border border-zinc-400 p-2 px-4 rounded-md placeholder:text-center text-left focus:outline-none placeholder:text-sm"
              v-model="password"
            />
            <input
              type="password"
              placeholder="Potvrdi novu lozinku"
              class="border border-zinc-400 p-2 px-4 rounded-md placeholder:text-center text-left focus:outline-none placeholder:text-sm"
              v-model="confirmNovaLozinka"
            />

            <button
              type="button"
              class="bg-red-500 rounded-md text-white py-1 cursor-pointer"
              @click="izbrisiKorisnika"
            >
              Izbriši korisnički račun
            </button>
            <button
              type="button"
              class="bg-blue-500 rounded-md text-white py-1 cursor-pointer"
              @click="promijeniLozinku"
            >
              Promijeni lozinku
            </button>
            <div v-if="error">
              {{ errorPoruka }}
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const trenutniKorisnik = computed(() => {
  return userStore.trenutniKorisnik.username;
});

const email = ref("");
const password = ref("");
const error = ref(false);
const errorPoruka = ref("");
const confirmNovaLozinka = ref("");
const novaLozinka = ref("");

const signOut = () => {
  userStore.signOut();
  router.push("/login");
};

const izbrisiKorisnika = () => {
  error.value = false;
  errorPoruka.value = "";

  if (!password.value) {
    error.value = true;
    errorPoruka.value = "Potrebna je lozinka!";
    return;
  }

  try {
    userStore.brisanjeKorisnika(password.value);

    router.push("/login");
  } catch (err) {
    console.log("Error:", err.message);
    error.value = true;
    errorPoruka.value = err.message;
  }
};

const promijeniLozinku = () => {
  error.value = false;
  errorPoruka.value = "";
  console.log("clicked");

  try {
    if (
      !password.value ||
      !novaLozinka.value ||
      !email.value ||
      !confirmNovaLozinka.value
    ) {
      error.value = true;
      errorPoruka.value = "Ispunite sva polja";
      return;
    }

    userStore.promjenaLozinke(
      email.value,
      password.value,
      novaLozinka.value,
      confirmNovaLozinka.value
    );

    router.push("/login");
  } catch (err) {
    console.log("Error:", err.message);
    error.value = true;
    errorPoruka.value = err.message;
  }
};
</script>
