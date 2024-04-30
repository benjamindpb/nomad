<template>
  <v-container>
    <v-card class="p-3" color="surface">
      <v-card-title class="text-primary mb-5">
        <h1>Nomad Simple E-Commerce</h1>
      </v-card-title>
      <v-card-text class="text-center">
        <p>Para generar un carrito aleatorio presione el botón "GENERAR CARRITO".</p>
        <div v-if="cart.products">
          <v-row>
            <v-col class="d-flex justify-center">
              <CartTable :cart="cart" />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <p>Si desea continuar con la compra presione el botón "FINALIZAR COMPRA".</p>
            </v-col>
          </v-row>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="createCart" color="secondary" append-icon="mdi-cart-outline" variant="elevated">
          Generar carrito
        </v-btn>
        <v-btn @click="checkout" color="terciary" append-icon="mdi-credit-card-outline" variant="elevated"
          v-if="cart.products">
          Finalizar compra
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import CartTable from '@/components/CartTable.vue';
import { useCartStore } from '@/store/appStore.js'
import api from '@/services/api';

const router = useRouter();

const cartStore = useCartStore();

const cart = ref([]);

const createCart = async () => {
  const cartRes = await api.get('/api/cart');
  cart.value = cartRes.data;
  cartStore.defineCart(cart.value);
}

const checkout = () => {
  router.push('/checkout');
}

onMounted(() => {
  cart.value = cartStore.getCart;
})

</script>