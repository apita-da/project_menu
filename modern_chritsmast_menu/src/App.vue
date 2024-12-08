<template>
  <div class="app-container">
    <div class="paralax-container">
      <Background :num-layers="5" star-color="#b8860b" background-color="#28364a" />
    </div>
    <div class="menu-sections">
      <Section title="Entrantes" :items="menu.starters" />
      <Section title="Platos Principales" :items="menu.mainDishes" />
      <Section title="Postres" :items="menu.desserts" />
    </div>
  </div>
</template>
<script setup lang="ts">
import menuService from '@/services/menuService'
import Background from '@/components/Background.vue'
import Section from '@/components/Section.vue'

const menu = menuService.getMenu()
</script>
<style>
@import '@/assets/styles/main';

/* .menu-sections {
  position: absolute;
  top: 10%;
  left: 2%;
  z-index: 1;
} */
.app-container {
  display: flex;
  position: relative;
  flex-direction: column; /* Alinea los elementos verticalmente */
  min-height: 100vh; /* Asegura que el contenedor ocupe toda la altura de la pantalla */
}
.paralax-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0; /* Fondo detrás */
  overflow: hidden;
}

.menu-sections {
  margin-top: 2em;
  padding: 5%;
  z-index: 2;
}
</style>
