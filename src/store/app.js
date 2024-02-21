// Utilities
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    //
  }),
});

export const useAuthStore = defineStore("auth", {
  state: () => ({
    userId: null,
  }),
  actions: {
    setUserId(id) {
      this.userId = id;
    },
    clearUserData() {
      this.userId = null;
    },
  },
});
