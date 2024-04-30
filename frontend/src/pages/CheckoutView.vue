<template>
  <v-container>
    <v-card class="p-3" color="surface">
      <v-card-title class="text-primary mb-5 text">
        <h1>Nomad Simple E-Commerce</h1>
      </v-card-title>
      <v-card-subtitle>
        <h4>Finalizar compra</h4>
      </v-card-subtitle>
      <v-card-text class="text-center">
        <v-row>
          <v-col>
            <v-sheet class="pa-1 ma-1" v-if="cart.products">
              Tu carrito tiene {{ cart.products.length }} productos
            </v-sheet>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex justify-center">
            <CartTable :cart="cart" />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text>
        <v-row justify="center">
          <v-col class="d-flex justify-center text-center" cols="12" sm="5">
            <v-alert v-if="aprovedCart && newCart.length > 0" type="success" variant="elevated">
              Envío Nomad ⚡️ - $3670
            </v-alert>
            <v-alert v-else-if="newCart.length > 0" type="error" variant="elevated">
              No hay envíos disponibles :(
            </v-alert>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" prepend-icon="mdi-arrow-left" variant="elevated" @click="router.push('/')">
          Volver
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="secondary" append-icon="mdi-backspace-outline" variant="elevated" @click="clearCart">
          Limpiar carrito
        </v-btn>
        <v-btn color="terciary" append-icon="mdi-truck-fast-outline" variant="elevated" @click="checkout"
          :loading="checkLoading">
          Cotizar despacho
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>

import { ref, onMounted } from 'vue';
import { useCartStore } from '@/store/appStore.js'
import { useRouter } from 'vue-router';
import api from '@/services/api';

const cart = ref([]);
const cartStore = useCartStore();

const newCart = ref([]);
const aprovedCart = ref(false);

const checkLoading = ref(false);

const router = useRouter();

const clearCart = () => {
  cartStore.cart = {};
  router.push('/');
}

const checkout = async () => {
  checkLoading.value = true;
  const parseProducts = cart.value.products.map((product) => {
    return {
      productId: product.id,
      price: product.price,
      quantity: product.quantity,
      discount: product.discountPercentage,
    }
  })
  const res = await api.post('/api/cart', {
    cart: parseProducts,
  });
  newCart.value = res.data.newCart;
  aprovedCart.value = res.data.aproved;
  checkLoading.value = false;
}

onMounted(() => {
  cart.value = cartStore.getCart;
})

</script>