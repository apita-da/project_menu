<template>
  <img
    class="dish-type"
    v-if="dish.type === 'hot'"
    src="@/assets/icons/fuego-cobre.png"
    alt="Icono caliente"
  />
  <img
    class="dish-type"
    v-else-if="dish.type === 'cold'"
    src="@/assets/icons/nieve-cobre.png"
    alt="Icono frío"
  />
  <span class="dish-item">{{ dish.name }}</span>
</template>

<script setup lang="ts">
import type { Dish } from '@/services/menuService'

const props = defineProps<{
  dish: Dish
}>()
</script>

<style>
.dish-type {
  width: 20px;
}
.dish-item {
  color: #f2f0ec;
  font-size: 16px;
  font-family: sans-serif;
  line-height: 30px;
  &:hover {
    color: #daa520;
  }
}
</style>
