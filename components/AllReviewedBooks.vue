<script setup lang="ts">
import {ref, onMounted} from 'vue';
import ScrollToTop from "~/components/ScrollToTop.vue";
const allReviewedBooks = ref([]);
const errorMessage = ref('');
async function getAllReviewedBooks() {
  try{
    const response = await $fetch('/api/books', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if(response.success){
      allReviewedBooks.value = response.data.filter(book => book.reviewed);
      console.log(allReviewedBooks.value);
    }
    else{
      errorMessage.value = 'Error fetching books';
    }
  }
  catch (error) {
    errorMessage.value = 'Error fetching books';
    console.error(error);
  }
}
onMounted(() => {
  getAllReviewedBooks();
});
</script>

<template>
  <div class="bookshelf-container">
    <h1 class="text-4xl font-serif font-bold text-gray-800 mb-4 ml-12">
      <NuxtLink to="/">Ro-Ro-Reviews</NuxtLink>
    </h1>
    <div class="header">
      <NuxtLink to="/what-is-on-my-shelf" class="nav-button">Bookshelf</NuxtLink>
      <h1 class="text-4xl font-serif font-bold text-gray-800">Reviewed Books</h1>
      <NuxtLink to="/to-be-read-list" class="nav-button">TBR</NuxtLink>

    </div>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <div v-if="allReviewedBooks.length > 0" class="bookshelf">
      <div v-for="book in allReviewedBooks" :key="book._id" class="book">
        <img :src="book.coverUrl" class="book-cover" alt="Book Cover" />
        <div class="book-info">
          <h2 class="book-title">{{ book.title }}</h2>
          <p class="book-author">by {{ book.author }}</p>
          <NuxtLink
              :to="`/ro-ro-reviews/${encodeURIComponent(book.title)}?id=${book._id}`"
              class="review-link"
          >
            See Review
          </NuxtLink>
        </div>
      </div>
    </div>
    <p v-else>No reviewed books found</p>
    <ScrollToTop/>
  </div>
</template>

<style scoped>
.bookshelf-container {
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

.error {
  color: red;
  font-weight: bold;
}

.bookshelf {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); /* Reduced min size */
  gap: 15px; /* Reduced gap */
  position: relative;
  padding: 15px; /* Reduced padding */
  background: #8b4513; /* Wooden shelf background */
  border-radius: 10px;
  box-shadow: inset 0 4px 6px rgba(0, 0, 0, 0.2);
}

.book {
  background-color: #f5f5f5;
  border: 2px solid #ddd;
  border-radius: 8px;
  padding: 8px; /* Reduced padding */
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.book:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
}

.book-cover {
  width: 100%;
  height: auto;
  border-radius: 4px;
  margin-bottom: 8px; /* Reduced margin */
}

.book-info {
  text-align: center;
}

.book-title {
  font-size: 0.9rem; /* Reduced font size */
  font-weight: bold;
  margin-bottom: 4px; /* Reduced margin */
  color: #2c3e50;
}

.book-author {
  font-size: 0.8rem; /* Reduced font size */
  color: #555;
}

@media (max-width: 768px) {
  .book-title {
    font-size: 0.8rem; /* Further reduced font size */
  }

  .book-author {
    font-size: 0.7rem; /* Further reduced font size */
  }
}

.review-link {
  display: inline-block;
  margin-top: 10px;
  padding: 5px 10px;
  font-size: 0.9rem;
  font-weight: bold;
  color: white;
  background: linear-gradient(90deg, #6a11cb, #2575fc);
  border-radius: 5px;
  text-decoration: none;
  transition: background 0.3s ease;
}

.review-link:hover {
  background: linear-gradient(90deg, #6a11cb, #2575fc);
}


</style>