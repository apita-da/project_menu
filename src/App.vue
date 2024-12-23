<template>
  <div v-if="showVideo" class="video-container">
    <video
      class="init-video"
      ref="introVideo"
      @ended="videoEnded"
      src="/assets/video_nochebuena.mp4"
      playsinline
      autoplay
      muted
    ></video>
    <button class="enable-sound" @click="toggleAudio">
      <img :src="soundIconSrc" alt="Icono de sonido" />
    </button>

    <button class="go-to-menu" @click="goToMenu">
      <span class="go-to-menu-text">Ir al menu</span>
    </button>
  </div>
  <div v-else>
    <menuPage v-if="menuLoaded" :menu="menu" />
    <div v-else>Cargando menú...</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, onUnmounted, computed } from 'vue'
import MenuPage from '@/components/MenuPage.vue'
import menuService, { type Menu } from '@/services/menuService'

const introVideo = ref<HTMLVideoElement | null>(null)
const showVideo = ref(true)
const showMenu = ref(false)
const menuLoaded = ref(false)
const menu = ref<Menu | null>(null)
const soundIconSrc = ref('/assets/sound_disable.png')

const toggleAudio = () => {
  if (introVideo.value) {
    introVideo.value.muted = !introVideo.value.muted
    soundIconSrc.value = introVideo.value.muted
      ? '/assets/sound_disable.png'
      : '/assets/sound_enable.png'
  }
}
const goToMenu = () => {
  showVideo.value = false // Ocultar el video
  showMenu.value = true // Mostrar el menú
  menu.value = menuService.getMenu() // Cargar el menú (si no se ha cargado ya)
  menuLoaded.value = true
}

onMounted(async () => {
  menu.value = menuService.getMenu()
  menuLoaded.value = true

  await nextTick()

  if (introVideo.value) {
    introVideo.value.addEventListener('ended', videoEnded)

    try {
      await introVideo.value.play()
    } catch (error) {
      console.error('Error al iniciar la reproducción automática:', error)
    }
  }
})

onUnmounted(() => {
  if (introVideo.value) {
    introVideo.value.removeEventListener('ended', videoEnded)
  }
})

const videoEnded = () => {
  showVideo.value = false
  showMenu.value = true
}
</script>
<style>
@import '@/assets/styles/main';
.video-container {
  position: relative; /* Necesario para posicionar elementos dentro */
  height: 100vh; /* Altura completa de la ventana */
  overflow: hidden; /* Evita que el video se desborde */
}

.init-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #28364a; /* Color de fondo del video */
}

.enable-sound {
  position: absolute;
  top: 0;
  right: 0;
  background-color: transparent; /* Fondo transparente para el botón de sonido */
  border: none;
  padding: 10px; /* Ajusta según sea necesario */
  cursor: pointer;
  img {
    width: 40px;
  }
}

.go-to-menu {
  position: absolute;
  bottom: 30px;
  right: 0;
  padding: 15px;
  color: #b8860b;
  background-color: transparent;
  border: none;
  font-family: sans-serif;
  cursor: pointer;
  text-decoration: none;
}

.go-to-menu-text {
  font-size: 24px;
}

.go-to-menu::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #b8860b;
  border-radius: 50px;
  animation: underline-draw 5s infinite linear;
}

@keyframes underline-draw {
  0% {
    width: 0;
  }
  50% {
    width: 100%;
  }
  100% {
    width: 0;
  }
}
</style>
