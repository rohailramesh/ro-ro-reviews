<template>
  <button
      v-if="showScrollToTop"
      class="scroll-to-top"
      @click="scrollToTop"
  >
    ↑ Top
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const showScrollToTop = ref(false);

function handleScroll() {
  showScrollToTop.value = window.scrollY > 200; // Show button after scrolling 200px
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.scroll-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 15px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background: linear-gradient(90deg, #6a11cb, #2575fc);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, background 0.3s ease;
}

.scroll-to-top:hover {
  background: linear-gradient(90deg, #2575fc, #6a11cb);
  transform: scale(1.1);
}
</style>