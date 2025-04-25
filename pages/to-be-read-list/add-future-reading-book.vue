
<script setup lang="ts">
import { ref } from 'vue';

const bookForm = ref({
  title: '',
  author: '',
});

const successMessage = ref('');
const errorMessage = ref('');

async function addBook() {
  try {

    // Fetch the cover URL from the external API
    const apiUrl = `https://bookcover.longitood.com/bookcover?book_title=${encodeURIComponent(bookForm.value.title)}&author_name=${encodeURIComponent(bookForm.value.author)}`;
    const response = await fetch(apiUrl);
    const apiResult = await response.json();

    let coverUrl = '';
    if (apiResult.url) {
      coverUrl = apiResult.url;
    } else {
      console.warn(`Cover image not found for book: ${bookForm.value.title} by ${bookForm.value.author}`);
    }

    // Submit the book data
    const book = await $fetch('/api/book-to-buy', {
      method: 'POST',
      body: {
        title: bookForm.value.title,
        author: bookForm.value.author,
        coverUrl,
      },
    });

    successMessage.value = 'Book added successfully!';
    errorMessage.value = '';
    bookForm.value = {
      title: '',
      author: '',
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
    <h1>Add Book to Future Reading List</h1>
    <form @submit.prevent="addBook">
      <div>
        <label for="title">Title:</label>
        <input id="title" v-model="bookForm.title" type="text" required />
      </div>
      <div>
        <label for="author">Author:</label>
        <input id="author" v-model="bookForm.author" type="text" required />
      </div>

      <button type="submit">Add Book</button>
    </form>

    <p v-if="successMessage" class="success">{{ successMessage }}</p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<style scoped>
form div {
  margin-bottom: 1rem;
}
label {
  display: block;
  font-weight: bold;
}
input, select {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.25rem;
}
button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
.success {
  color: green;
}
.error {
  color: red;
}
</style>