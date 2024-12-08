<template>
  <div class="background" ref="parallax" :style="{ '--background-color': backgroundColor }">
    <div v-for="n in numLayers" :key="n" :class="`layer layer${n}`" :id="`layer${n}`"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

const props = defineProps({
  numLayers: {
    type: Number,
    default: 3,
  },
  starColor: {
    type: String,
    default: 'white',
  },
  backgroundColor: {
    type: String,
    default: '#28364a',
  },
})

function isHTMLElement(element: Element): element is HTMLElement {
  return element instanceof HTMLElement
}
const parallax = ref<HTMLDivElement | null>(null)

const createStars = (layer: any, numStars: number, starColor: string) => {
  for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div')
    star.classList.add('star')
    const size = Math.random() * 5 + 1
    star.style.width = `${size}px`
    star.style.height = `${size}px`
    star.style.left = `${Math.random() * 100}%`
    star.style.top = `${Math.random() * 100}%`
    star.style.animationDelay = `-${Math.random() * 3}s`
    star.style.background = `radial-gradient(circle, ${starColor}, rgba(255, 255, 255, 0) 50%)`
    layer.appendChild(star)
  }
}

onMounted(() => {
  if (parallax.value) {
    const layers = parallax.value.children as HTMLCollectionOf<Element>
    for (let i = 0; i < props.numLayers; i++) {
      createStars(layers[i], 200, props.starColor) // Pasamos starColor a createStars
    }

    let animationId: number
    const animate = (time: number) => {
      for (let i = 0; i < props.numLayers; i++) {
        const layer = layers[i]
        const depth = (i + 1) / props.numLayers // Calcula la profundidad de la capa
        const x = Math.sin(time * 0.0008 * depth) * 50 // Increased multipliers
        const y = Math.cos(time * 0.0004 * depth) * 30

        if (isHTMLElement(layer)) {
          layer.style.transform = `translate3d(-${x}px, -${y}px, 0)`
        }
      }

      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)
    onUnmounted(() => cancelAnimationFrame(animationId))
  }
})
</script>

<style>
.background {
  margin: 0;
  padding: 0;
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: var(--background-color);
}

.layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.star {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  animation: animateStar 5s linear infinite;
}

@keyframes animateStar {
  0% {
    opacity: 0.2;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.2;
  }
}
</style>
