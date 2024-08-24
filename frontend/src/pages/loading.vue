<script setup>
import { useUserStore } from "@/store/userStore";
import { onMounted, watchEffect } from "vue";
import { useRouter } from "vue-router";
const useUser = useUserStore();
const router = useRouter();
router.push({ name: "login" });
// onMounted(() => {
//   useUser.getAllUser();
// });
// watchEffect(() => {
//   if (useUser.userAll) {
//     router.push({ name: "login" });
//   }
// });
</script>
<template>
  <div>loading .....</div>
</template>
