<template>
  <div class="book-details-container">
    <h1 class="text-4xl font-serif font-bold text-gray-800 mb-4 mr-4">
      <NuxtLink to="/">Ro-Ro-Reviews</NuxtLink>
    </h1>
    <div class="header">
      <NuxtLink to="/" class="nav-button">Home</NuxtLink>
      <h1 class="text-1xl font-serif font-bold text-gray-800">Book Review</h1>
      <NuxtLink to="/ro-ro-reviews" class="nav-button">Reviews</NuxtLink>
    </div>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <div v-if="book" class="book-details">
      <div class="details-grid">
        <div class="details-image">
          <img :src="book.coverUrl" alt="Book Cover" />
        </div>
        <div class="details-text">
          <h2 class="book-title">{{ book.title }}</h2>
          <p class="book-author">by {{ book.author }}</p>
          <p><strong>Genre:</strong> {{ book.genre.join(', ') }}</p>
          <p><strong>Fiction Type:</strong> {{ book.fictionType }}</p>
          <p><strong>Read:</strong> {{ book.read ? 'Yes' : 'No' }}</p>
          <p><strong>Literature Origin:</strong> {{ book.literatureOrigin }}</p>
        </div>
      </div>
      <div class="review-section">
        <h3>Review</h3>
        <p>{{ book.reviewText }}</p>
      </div>
    </div>
    <p v-else class="loading-message">Loading book details...</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
const bookTitle = route.params.bookDetails;
const bookId = route.query.id;

const book = ref(null);
const errorMessage = ref('');
async function fetchBookDetails() {
  try {
    const response = await $fetch(`/api/books/?id=${bookId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.success) {
      book.value = response.data;
    } else {
      errorMessage.value = 'Error fetching book details';
    }
  } catch (error) {
    errorMessage.value = 'Error fetching book details';
    console.error(error);
  }
}
onMounted(() => {
  fetchBookDetails();
});
</script>

<style scoped>
.book-details-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  background: linear-gradient(135deg, #e0eafc, #cfdef3);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
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

.error-message {
  color: red;
  font-weight: bold;
}

.book-details {
  text-align: left;
  margin-top: 20px;
}

.details-grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
  align-items: start;
}

.details-image img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.details-text {
  text-align: left;
}

.book-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 10px;
}

.book-author {
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 10px;
}

.review-section {
  margin-top: 20px;
  padding: 15px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

.review-section h3 {
  font-size: 1.2rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 10px;
}

.review-section p {
  font-size: 1rem;
  color: #7f8c8d;
}

.loading-message {
  font-size: 1rem;
  color: #7f8c8d;
}
</style>