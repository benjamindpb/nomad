import { defineStore } from "pinia"
import { computed, ref } from "vue"

export const useCartStore = defineStore('cart', () => {
  const cart = ref({})

  const getCart = computed(() => {
    return cart.value
  })

  function defineCart(cartValue) {
    cart.value = cartValue;
  }

  return { cart, defineCart, getCart }
})