<template>
  <section class="menu-section">
    <h2 class="menu-section-title">{{ title }}</h2>
    <ul class="menu-section-list">
      <li class="menu-section-element" v-for="item in items" :key="item.id">
        <MenuItem :dish="item" />
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import MenuItem from './MenuItem.vue'
import type { Dish } from '@/services/menuService'

const props = defineProps<{
  title: string
  items: Dish[]
}>()
</script>

<style>
.menu-section {
  z-index: 1;
  position: relative;
  margin-bottom: 1em;
  text-align: center;

  .menu-section-title {
    margin-bottom: 10px;
    color: #b8860b;
    font-size: 24px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial,
      sans-serif;
  }

  .menu-section-list {
    max-width: fit-content;
    margin: auto;
  }

  .menu-section-element {
    pointer-events: all;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;

    &:hover {
      cursor: pointer;
      color: #b8860b;
    }
  }
}
</style>
