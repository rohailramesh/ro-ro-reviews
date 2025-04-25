<script setup lang="ts">
import { Vue3Lottie } from 'vue3-lottie';
import animationData from '../assets/animations/home-animation.json';
</script>

<template>
  <div class="home-container">
    <h1 class="text-4xl font-serif font-bold text-gray-800 mb-4">
      <NuxtLink to="/">Ro-Ro-Reviews</NuxtLink>
    </h1>
    <div class="animation-wrapper">
      <Vue3Lottie :animation-data="animationData" :height="300" :width="300" />
    </div>
    <div class="content">
      <p>Discover my book shelf, reviews, and what I want to read next!</p>
      <div class="button-group">
        <NuxtLink to="/what-is-on-my-shelf" class="nav-button">Book Shelf</NuxtLink>
        <NuxtLink to="/ro-ro-reviews" class="nav-button">Reviews</NuxtLink>
        <NuxtLink to="/to-be-read-list" class="nav-button">TBR</NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #e0eafc, #cfdef3);
  text-align: center;
  overflow: hidden;
}

.animation-wrapper {
  width: 100%;
  max-width: 400px;
  margin: 0 auto 30px;
}

.content p {
  font-size: 1.2rem;
  margin-bottom: 25px;
  color: #34495e;
  line-height: 1.5;
}

.button-group {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  justify-content: center;
}

.nav-button {
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background: linear-gradient(90deg, #6a11cb, #2575fc);
  border: none;
  border-radius: 25px;
  text-decoration: none;
  text-align: center;
  transition: transform 0.3s ease, background 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.nav-button:hover {
  background: linear-gradient(90deg, #2575fc, #6a11cb);
  transform: scale(1.05);
}



@media (max-width: 768px) {
  .animation-wrapper {
    max-width: 300px;
  }

  .content p {
    font-size: 1rem;
  }

  .nav-button {
    font-size: 0.9rem;
    padding: 8px 15px;
  }

}
</style>