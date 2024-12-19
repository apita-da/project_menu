<template>
  <div v-if="showPreVideoPage">
    <div>
      <p>Aquí tienes un mensaje</p>
      <button @click="startVideo">Ver Video</button>
    </div>
  </div>
  <div v-else-if="showVideo">
    <video
      class="init-video"
      ref="introVideo"
      @ended="videoEnded"
      src="../src/assets/video_nochebuena.mp4"
      playsinline
    ></video>
  </div>
  <div v-else-if="showButton">
    <div
      style="
        background-color: blue;
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
      "
    >
      <button @click="showMenu = true">Ir al Menú</button>
    </div>
  </div>
  <div v-else>
    <menuPage v-if="menuLoaded" :menu="menu" />
    <div v-else>Cargando menú...</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import MenuPage from '@/components/MenuPage.vue'
import menuService, { type Menu } from '@/services/menuService'

const introVideo = ref<HTMLVideoElement | null>(null)
const showVideo = ref(false)
const showButton = ref(false)
const showMenu = ref(false)
const menuLoaded = ref(false)
const menu = ref<Menu | null>(null)
const showPreVideoPage = ref(true)

const startVideo = () => {
  showPreVideoPage.value = false
  showVideo.value = true

  nextTick(() => {
    if (introVideo.value) {
      introVideo.value.play().catch((error) => {
        console.error('Error al reproducir el video:', error)
      })
    }
  })
}

const videoEnded = () => {
  showVideo.value = false
  showButton.value = true
}

onMounted(() => {
  menu.value = menuService.getMenu()
  menuLoaded.value = true
})
</script>
<style>
@import '@/assets/styles/main';
.init-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #28364a;
}
</style>
