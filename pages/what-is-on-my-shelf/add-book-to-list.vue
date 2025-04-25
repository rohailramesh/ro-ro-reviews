
<script setup lang="ts">
import { ref } from 'vue';

const bookForm = ref({
  title: '',
  author: '',
  genre: '',
  fictionType: 'fiction',
  read: false,
  reviewed:false,
  reviewText: '',
  literatureOrigin: '',
});

const successMessage = ref('');
const errorMessage = ref('');

async function addBook() {
  try {
    const genresArray = bookForm.value.genre.split(',').map((genre) => genre.trim());

    // Fetch the cover URL from the external API
    const apiUrl = `https://bookcover.longitood.com/bookcover?book_title=${encodeURIComponent(bookForm.value.title)}&author_name=${encodeURIComponent(bookForm.value.author)}`;
    const response = await fetch(apiUrl);
    const apiResult = await response.json();

    let coverUrl = '';
    if (apiResult.url) {
      coverUrl = apiResult.url;
    } else {
      // Fallback to a default image if the API does not return a cover URL
      coverUrl = 'https://th.bing.com/th/id/OIP.9GrtREuzqGsuEckSOa2-bgHaL2?rs=1&pid=ImgDetMain';
      console.warn(`Cover image not found for book: ${bookForm.value.title} by ${bookForm.value.author}`);
    }

    // Submit the book data
    const book = await $fetch('/api/books', {
      method: 'POST',
      body: {
        title: bookForm.value.title,
        author: bookForm.value.author,
        genre: genresArray,
        fictionType: bookForm.value.fictionType,
        read: bookForm.value.read,
        reviewed: bookForm.value.reviewed,
        reviewText: bookForm.value.reviewText,
        literatureOrigin: bookForm.value.literatureOrigin,
        coverUrl,
      },
    });

    successMessage.value = 'Book added successfully!';
    errorMessage.value = '';
    bookForm.value = {
      title: '',
      author: '',
      genre: '',
      fictionType: 'fiction',
      read: false,
      reviewed: false,
      reviewText: '',
      literatureOrigin: '',
    };
  } catch (error) {
    errorMessage.value = 'Failed to add the book. Please try again.';
    successMessage.value = '';
    console.error(error);
  }
}
</script>

<template>
  <div>
    <h1 class="text-4xl font-serif font-bold text-gray-800 mb-4">
      <NuxtLink to="/">Ro-Ro-Reviews</NuxtLink>
    </h1>
    <h1>Add Book to List</h1>
    <form @submit.prevent="addBook">
      <div>
        <label for="title">Title:</label>
        <input id="title" v-model="bookForm.title" type="text" required />
      </div>
      <div>
        <label for="author">Author:</label>
        <input id="author" v-model="bookForm.author" type="text" required />
      </div>
      <div>
        <label for="genre">Genre (comma-separated):</label>
        <input id="genre" v-model="bookForm.genre" type="text" required />
      </div>
      <div>
        <label for="fictionType">Fiction Type:</label>
        <select id="fictionType" v-model="bookForm.fictionType">
          <option value="fiction">Fiction</option>
          <option value="non-fiction">Non-Fiction</option>
        </select>
      </div>
      <div>
        <label for="read">Read:</label>
        <input id="read" v-model="bookForm.read" type="checkbox" />
      </div>
      <div>
        <label for="reviewed">Reviewed:</label>
        <input id="reviewed" v-model="bookForm.reviewed" type="checkbox" />

      </div>
      <div>
        <label for="reviewText">Review Text:</label>
        <textarea id="reviewText" v-model="bookForm.reviewText" rows="4" placeholder="Add a review - if no review yet, just add review coming soon"></textarea>
      </div>
      <div>
        <label for="literatureOrigin">Literature Origin:</label>
        <input id="literatureOrigin" v-model="bookForm.literatureOrigin" type="text" required />
      </div>
      <button type="submit">Add Book</button>
    </form>

    <p v-if="successMessage" class="success">{{ successMessage }}</p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<style scoped>
/* Container styling */
div {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: linear-gradient(135deg, #e0eafc, #cfdef3);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
}

/* Form styling */
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

label {
  font-weight: bold;
  color: #2c3e50;
}

input, select, textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

textarea {
  resize: none;
}

/* Button styling */
button {
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background: linear-gradient(90deg, #6a11cb, #2575fc);
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: transform 0.3s ease, background 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

button:hover {
  background: linear-gradient(90deg, #2575fc, #6a11cb);
  transform: scale(1.05);
}

/* Success and error messages */
.success {
  color: green;
  font-weight: bold;
  margin-top: 1rem;
}

.error {
  color: red;
  font-weight: bold;
  margin-top: 1rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  div {
    padding: 15px;
  }

  button {
    font-size: 0.9rem;
    padding: 8px 15px;
  }
}
</style>