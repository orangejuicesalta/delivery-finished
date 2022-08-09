import { defineStore } from "pinia";
import { ref } from "vue";

export const loginStore = defineStore("user", () => {
  const user = ref({
    firstName: "",
    lastName: "",
  });
  return {
    user,
  };
});
