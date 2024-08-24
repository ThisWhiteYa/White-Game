<script setup>
import { useUserStore } from "@/store/userStore";
import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const useUser = useUserStore();
const username = ref("");
// Get cookie data
const cookie_check = document.cookie
  .split("; ")
  .find((row) => row.startsWith("username="))
  ?.split("=")[1];

useUser.onCookie = cookie_check;
const enterData = (e) => {
  if (e.key === "Enter") {
    create();
  }
};
const create = () => {
  console.log("Created");
  useUser.createUser(username.value);
  router.push({ name: "auth" });
  // 
  username.value = "";
};
console.log("cookie_check :", cookie_check);

watchEffect(() => {
  username.value = username.value.toLowerCase();
  if (useUser.onCookie) {
    router.push({ name: "auth" });
  }
});
</script>
<template>
  <div class="card">
    <div class="header">
      <div class="title">Username</div>
      <p class="sub-title">*** lower case only ***</p>
    </div>

    <div class="input-form">
      <input
        type="text"
        class="input"
        v-model="username"
        @keypress="enterData"
      />
    </div>
    <div class="btn">
      <v-btn color="blue" id="submit" @click="create">Login</v-btn>
    </div>
  </div>
</template>

<style scoped>
.card {
  border-radius: 1rem;
  background-color: white;
  width: min(500px, 90%);
  text-align: center;
  padding: 2rem;
  display: flex;
  row-gap: 1rem;
  flex-direction: column;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}
.title {
  color: black;
  font-weight: 500;
  font-size: 2em;
}
.sub-title {
  color: black;
}
.input {
  border: 1px solid black;
  color: black;
  width: 100%;
  border-radius: 0.5rem;
  height: 2em;
  padding: 0 1rem;
}
.input:focus {
  outline: none;
}
</style>
