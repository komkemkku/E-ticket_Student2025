import { defineStore } from "pinia";

interface State {
  token: string;
  userId: number | null;
}

export const useIndexStore = defineStore("index", {
  state: (): State => ({
    token: " ",
    userId: null,
  }),
});
