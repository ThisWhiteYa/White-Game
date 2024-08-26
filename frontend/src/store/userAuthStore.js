import { defineStore } from "pinia";
import axios from "axios";
export const useUserAuthStore = defineStore("userAuth", {
  state: () => ({
    token: null,
    userCookie: null,
    user: null,
  }),
  actions: {
    async auth(pin) {
      this.pass = pin;
      this.getUser();
      console.log("name :", this.user);
      console.log("pin :", pin);
      const res = await axios.post("/api/users/auth", {
        name: this.user,
        pin: `${pin}`,
        hash: this.token || null,
      });
      console.log("res.data :", res.data);

      if (res.data.message == "success") {
        Swal.fire({
          position: "center",
          icon: "success",
          html: `Login <span style="color:green">Success</span> hope you enjoy <span style="color:green"> ${this.user} </span>`,
          showConfirmButton: false,
          timer: 1500,
        });
      } else if (res.data.message == "NewAccount success") {
        Swal.fire({
          position: "center",
          icon: "success",
          html: `Create Account <span style="color:green">Success</span> hope you enjoy <span style="color:green"> ${this.user} </span>`,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          html: `Your Pin is not correct ;(`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      document.cookie = `token=${res.data.token}; expires=Thu, 18 Dec 2030 12:00:00 UTC; path=/ ;secure;`;
    },
    async getToken() {
      this.getUser();
      this.token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
      if (this.token) {
        const res = await axios.post("/api/users/auth", {
          name: this.user || null,
          hash: this.token || null,
        });
      } else {
        return "None Login";
      }
    },
    async getUser() {
      this.userCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("username="))
        ?.split("=")[1];
      console.log("this.userCookie :", this.userCookie);
      if (this.userCookie) {
        this.user = (
          await axios.get(`/api/users/${this.userCookie}`)
        ).data.name;
        console.log("this.user :", this.user);
      }
    },
  },
});
