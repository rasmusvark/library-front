<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
body, html {
  margin: 0;
  padding: 0;
  background: url('@/assets/images/library.jpg'); 
  background-size: cover;
  font-family: 'Roboto', sans-serif; 
}

#app {
  width: 90%;
  max-width: 960px;
  margin: 60px auto; 
  padding: 2px;
  background: #f3f2f2; 
  border-radius: 8px; 
  text-align: center; 
}

a, button {
  color: #333;
  text-decoration: none;
  font-weight: 500;
  display: inline-block; /* Ensures links are alignable */
  margin: 0 15px; /* Uniform margin for spacing */
}

button {
  background-color: #333; /* Dark color for buttons for contrast */
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #555;
}

input, select, textarea {
  width: 80%;
  padding: 12px;
  margin: 10px auto;
  border: 2px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

input:focus, select:focus, textarea:focus {
  border-color: #333;
}

nav a:hover {
  background-color: transparent;
}
</style>
