<script setup>
import { useUserStore } from "@/store/userStore";
import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useWindowSize } from "vue-window-size";

const { width, height } = useWindowSize();
const router = useRouter();
const useUser = useUserStore();

const cookie_check = document.cookie
  .split("; ")
  .find((row) => row.startsWith("onLogin="))
  ?.split("=")[1];
useUser.onCookie = cookie_check;
console.log(!!cookie_check);

// watchEffect(() => {
//   if (!cookie_check) {
//     router.push({ name: "login" });
//   }

// });
</script>
<template>
  <div class="container-collection">
    <div class="header">
      <v-btn class="current-score" color="green" :size="width < 750 ? 'small' : 'large'">Score : 5</v-btn>
      <v-btn class="top-score" color="yellow" :size="width < 750 ? 'small' : 'large'"
        >Top Score : 10</v-btn
      >
      <v-btn class="leader" color="primary" :size="width < 750 ? 'small' : 'large'">leader</v-btn>
    </div>
    <div class="collection">
      <v-btn class="card">Game 1</v-btn>
      <v-btn class="card" disabled>Coming Soon....</v-btn>
      <v-btn class="card" disabled>Coming Soon....</v-btn>
      <v-btn class="card" disabled>Coming Soon....</v-btn>
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  justify-content: center;
}
.container-collection {
  width: min(500px, 90%);
  height: min(500px, 90%);
}
.card {
  width: 100%;
  height: 100%;
  border-radius: 0.75rem;
  align-content: center;
  text-align: center;
}
.collection {
  border-radius: 1rem;
  background-color: white;
  width: 100%;
  height: min(500px, 100%);
  overflow: auto;
  text-align: center;
  padding: 2rem;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
@media only screen and (max-width: 425px) {
  .collection {
    grid-template-columns: 1fr;
  }
}
</style>
