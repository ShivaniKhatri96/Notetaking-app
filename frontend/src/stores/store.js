import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('myStore', {
  state: () => ({
    isLoginClick: false,
  })
})
