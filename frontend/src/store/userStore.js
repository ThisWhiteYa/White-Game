import { defineStore } from "pinia";
import axios from "axios";
export const useUserStore = defineStore("user", {
  state: () => ({
    onLogin: null,
    onCookie: null,
    pass: null,
  }),
  actions: {
    async getUserAll() {
      try {
        const res = await axios.get("/api/users");
        const data = res.data;
      } catch (error) {
        console.log("error :", error);
      }
    },
    async getUser(name) {
      try {
        console.log("come in getUser !");
        console.log("name :", name);

        const res = await axios.get(`/api/users/${name}`);
        const data = res.data;
        console.log(data);
      } catch (error) {
        console.log("Error to fetch data :", error);
      }
    },

    async createUser(user) {
      if (user) {
        console.log("start Create uesr");
        try {
          const res = await axios.post("/api/create", {
            name: user,
          });
          console.log("res :",res.data);
          if (res.data == "Created") {
            Swal.fire({
              position: "center",
              icon: "success",
              html: `Hi <span style="color:green">${user}</span> Create User Success !!`,
              showConfirmButton: false,
              timer: 1500,
            });
            this.onLogin = user;
            document.cookie = `username=${user}; expires=Thu, 18 Dec 2030 12:00:00 UTC; path=/;`;
            setTimeout(() => {
              location.reload();
            }, 1500);
          } else {
            Swal.fire({
              position: "center",
              icon: "success",
              html: `Welcome back <span style="color:green">${res.data}</span>`,
              showConfirmButton: false,
              timer: 1500,
            });
            this.onLogin = user;
            document.cookie = `username=${user}; expires=Thu, 18 Dec 2030 12:00:00 UTC; path=/;`;
            setTimeout(() => {
              location.reload();
            }, 1500);
          }
        } catch (error) {
          console.log("error :", error);
        }
      } else {
        Swal.fire({
          position: "center",
          icon: "question",
          html: `ใส่ username ยัง ??`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
  },
});
