<template>
  <div id="app">
    <Carousel />
  </div>
</template>

<script>
import Carousel from "./components/Carousel.vue";

export default {
  name: "App",
  components: {
    Carousel,
  },
};
</script>

<style lang="scss">
// Reset
html {
  box-sizing: border-box;
  font-size: 16px;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body,
h1,
h2,
h3,
h4,
h5,
h6,
p,
ol,
ul {
  margin: 0;
  padding: 0;
  font-weight: normal;
}

ol,
ul {
  list-style: none;
}

img {
  max-width: 100%;
  height: auto;
}

// App
#app {
  height: 100vh;
}
</style>
