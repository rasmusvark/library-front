<template>
    <div>
      <h1>Tere tulemast meie raamatukogu haldussüsteemi</h1>
      <p>Alustamiseks valige allolevast valikust:</p>
      <nav>
        <router-link to="/add-book">Lisa raamat</router-link> |
        <router-link to="/catalog">Kataloog</router-link> |
        <router-link to="/borrow">Laenuta</router-link> |
        <router-link to="/return">Tagasta</router-link> |
        <router-link to="/delete">Kustuta raamat</router-link> |
      </nav>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomeView'
  }
  </script>
  
  <style>
  nav a {
    margin-right: 10px;
    text-decoration: none;
    color: #42b983;
  }
  </style>
  