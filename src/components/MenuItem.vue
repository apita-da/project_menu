<template>
  <div class="menu-section-element" @click="visible = true">
    <img
      class="dish-type"
      v-if="dish.type === 'hot'"
      src="/assets/fuego-cobre.png"
      alt="Icono caliente"
    />
    <img
      class="dish-type"
      v-else-if="dish.type === 'cold'"
      src="/assets/nieve-cobre.png"
      alt="Icono frío"
    />
    <span class="dish-item">{{ dish.name }}</span>
  </div>
  <!--
  <Sheet v-model:visible="visible">
    {{ dish.name }}
    {{ dish.description }}
  </Sheet>
  -->
</template>

<script setup lang="ts">
import type { Dish } from '@/services/menuService'
import { ref } from 'vue'
import { Sheet } from 'bottom-sheet-vue3'

const visible = ref(false)

const props = defineProps<{
  dish: Dish
}>()
</script>

<style>
.menu-section-element {
  pointer-events: all;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;

  &:hover {
    /* cursor: not-allowed; */
    color: #b8860b;
  }
}
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
