<template>
  <div id="app">
    <!-- Router view will display the component based on the current route -->
    <router-view/>
  </div>
</template>

<style>
body, html {
  margin: 0;
  padding: 0;
  background: #f9f9f9; /* Light grey background for a soft look */
  font-family: 'Roboto', sans-serif; /* Roboto for a clean, modern appearance */
}

#app {
  width: 90%;
  max-width: 960px;
  margin: 60px auto; /* Provides spacing at the top and bottom */
  padding: 20px;
  background: #fff; /* The white background for the card */
  box-shadow: 0 0 10px rgba(0,0,0,0.1); /* A subtle shadow around the card */
  border-radius: 8px; /* Rounded corners for the card */
  text-align: center; /* Centers the text within the card */
}

/* Additional elements like forms, divs, and sections inside #app should not
   have their own background or they should be set to transparent. */
   .form-container, .content, .view, .home, .other-class-names {
  background: transparent; /* No background to avoid nested rectangles */
  padding: 20px; /* Spacing inside each content section if needed */
  /* More styling specific to the content if needed */
}

a, button {
  color: #333; /* More natural, dark grey color for better contrast */
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
  width: 80%; /* Adjusted width for form elements */
  padding: 12px;
  margin: 10px auto; /* Centering margins */
  border: 2px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

input:focus, select:focus, textarea:focus {
  border-color: #333; /* Focus color to draw attention */
}

/* Remove specific navigation styles since you prefer no boxes around links */
nav a:hover {
  background-color: transparent; /* Clear any background changes on hover */
}
</style>
