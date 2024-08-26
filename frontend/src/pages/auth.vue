<script setup>
import { useUserAuthStore } from "@/store/userAuthStore";
import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { PinInput } from "v-pin-input";
const router = useRouter();
const useAuth = useUserAuthStore();

const model = ref("");

useAuth.getUser();

const handleCompleted = async (val) => {
  await useAuth.auth(val);
  // console.log("Done");
};

const test = async () => {
  const res = await useAuth.getToken();
  // console.log("res :", res);
};

const logout = () => {
  document.cookie = `username=${useAuth.user}; expires=Sun, 20 Aug 2000 12:00:00 UTC`;
  location.reload();
};

watchEffect(() => {
  if (!useAuth.user) {
    router.push({ name: "login" });
  }
});
</script>
<template>
  <div class="card">
    <div class="title">
      <h1>Hi {{ useAuth.user }}</h1>
      <p>PIN</p>
    </div>
    <pin-input
      width="5"
      height="50"
      class="wrapper"
      v-model="model"
      :length="5"
      autofocus
      input-class="pinInput"
      secure="true"
      charPreviewDuration="0"
      @completed="handleCompleted"
    />
    <v-btn @click="logout">Logout</v-btn>
    <v-btn @click="test">Test</v-btn>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  column-gap: 1rem;
  /* height: 70px; */
}

.wrapper > * {
  text-align: center;
  border: 1px solid hsl(234, 100%, 70%);
  border-radius: 0.5rem;
  width: 50%;
  min-height: 70px;
  color: black;
  font-size: larger;
}
.wrapper > *:focus {
  outline: none;
}
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
  h1 {
    font-weight: lighter;
  }
}

@media only screen and (max-width: 425px) {
  .wrapper > * {
    min-height: 50px;
  }
}
@media only screen and (max-width: 375px) {
  .wrapper > * {
    min-height: 40px;
  }
}
</style>
