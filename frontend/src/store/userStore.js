import { defineStore } from "pinia";
import axios from "axios";
export const useUserStore = defineStore("user", {
  state: () => ({
    onLogin: null,
    onCookie: null,
    pass: null,
  }),
  actions: {
    async getData() {
      try {
        const res = await axios.get("/api/users");
        const data = res.data;
        this.userAll = data;
      } catch (error) {
        console.log("error :", error);
      }
      if (this.userAll.length > 0) {
        this.userAll.forEach((user) => {
          console.log("Id :", user._id);
          console.log("Name :", user.name);
          console.log("Age :", user.age);
        });
      } else {
        console.log("have noything !");
      }
    },
    async createUser(user) {
      if (user) {
        console.log("start Create uesr");
        try {
          const res = await axios.post("/api/users", {
            name: user,
          });
          if (res.data == "Created") {
            Swal.fire({
              position: "center",
              icon: "success",
              html: `Hi <span style="color:green">${user}</span> Create User Success !!`,
              showConfirmButton: false,
              timer: 1500,
            });
            this.onLogin = user;
            document.cookie = `username=${user}; expires=Thu, 18 Dec 2030 12:00:00 UTC; path=/`;
            setTimeout(() => {
              location.reload();
            }, 1500);
          } else if (res.data == "Username is already") {
            Swal.fire({
              position: "center",
              icon: "success",
              html: `Welcome back <span style="color:green">${user}</span>`,
              showConfirmButton: false,
              timer: 1500,
            });
            this.onLogin = user;
            document.cookie = `username=${user}; expires=Thu, 18 Dec 2030 12:00:00 UTC; path=/`;
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
    async auth(pin) {
      this.pass = pin;
      console.log("pin in store :", pin);
      const res = await axios.post("/api/users/auth", {
        name: this.onCookie,
        pin: `${pin}`,
      });
      console.log(res.data);

      if (res.data == "success") {
        Swal.fire({
          position: "center",
          icon: "success",
          html: `Login <span style="color:green">Success</span> hope you enjoy <span style="color:green"> ${this.onCookie} </span>`,
          showConfirmButton: false,
          timer: 1500,
        });
        // document.cookie = `onLogin=${user} Login;expires=Thu, 18 Dec 2030 12:00:00 UTC; path=/`;
        var hashObj = new jsSHA("SHA-512", "TEXT", { numRounds: 1 });
        hashObj.update(this.pass);
        var hash = hashObj.getHash("HEX");
        this.pass = hash;

        console.log("this.pass :", this.pass);

        document.cookie = `onLogin=${this.pass};`;
      } else if (res.data == "NewAccount success") {
        Swal.fire({
          position: "center",
          icon: "success",
          html: `Create Account <span style="color:green">Success</span> hope you enjoy <span style="color:green"> ${this.pass} </span>`,
          showConfirmButton: false,
          timer: 1500,
        });
        var hashObj = new jsSHA("SHA-512", "TEXT", { numRounds: 1 });
        hashObj.update(this.pass);
        var hash = hashObj.getHash("HEX");
        this.pass = hash;

        console.log("this.pass :", this.pass);
        document.cookie = `onLogin=${this.pass};`;
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          html: `Your Pin is not correct ;(`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
  },
});
