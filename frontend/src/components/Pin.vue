<template>
    <div class="pin-container">
      <input
        v-for="(digit, index) in pinArray"
        :key="index"
        type="text"
        maxlength="1"
        v-model="pinArray[index]"
        @input="handleInput(index)"
        @keydown="handleKeydown(index, $event)"
        ref="pinInput"
        class="pin-input"
      />
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        pinArray: Array(5).fill(""), // Assuming a 4-digit PIN
      };
    },
    methods: {
      handleInput(index) {
        if (this.pinArray[index].length === 1 && index < this.$refs.pinInput.length - 1) {
          this.$refs.pinInput[index + 1].focus();
        }
        // Emit the full PIN value to the parent
        this.$emit('update:pin', this.pinArray.join(''));
      },
      handleKeydown(index, event) {
        if (event.key === "Backspace" && index > 0 && this.pinArray[index] === "") {
          this.$refs.pinInput[index - 1].focus();
        }
        // Emit the full PIN value to the parent
        this.$emit('update:pin', this.pinArray.join(''));
      },
    },
  };
  </script>
  
<style scoped>
.pin-container {
  display: flex;
  gap: 10px;
}

.pin-input {
  width: 40px;
  height: 40px;
  font-size: 24px;
  text-align: center;
  border: 1px solid black;
  color: black;
}
</style>
