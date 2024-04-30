<template>
  <v-table class="bg-background">
    <thead>
      <tr>
        <th class="text-left">
          Producto
        </th>
        <th class="text-left">
          Nombre
        </th>
        <th class="text-right">
          Precio
        </th>
        <th class="text-right">
          Cantidad
        </th>
        <th>
          Descuento
        </th>
        <th class="text-right">
          Total
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in cart.products" :key="product.id">
        <td class="text-left"><a :href="product.thumbnail" target="_blank" rel="noopener noreferrer"><v-img :src="product.thumbnail" cover></v-img></a></td>
        <td class="text-left">{{ product.title }}</td>
        <td class="text-right">${{ product.price }}</td>
        <td class="text-right">{{ product.quantity }}</td>
        <td class="text-right">
          <v-chip color="danger">
            -{{ product.discountPercentage }}%
          </v-chip>
        </td>
        <td class="text-right">
          <p class="mb-0"><b>${{ product.discountedPrice }}</b></p>
          <p class="mb-0 text-decoration-line-through">${{ product.total }}</p>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <th id="total" colspan="5">Total :</th>
        <td><b>${{ cart.discountedTotal }}</b></td>
      </tr>
    </tfoot>
  </v-table>
</template>

<script setup>
defineProps(['cart'])
</script>

<style>
#total {
  text-align: right;
}
</style>