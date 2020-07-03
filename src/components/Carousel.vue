<template>
  <section class="carousel">
    <div class="main-image">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6e/A_Song_Bird_%28177187493%29.jpeg"
      />
    </div>
    <div class="control-strip">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6e/A_Song_Bird_%28177187493%29.jpeg"
      />
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/4/4a/19-06-170-carter.jpg"
      />
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/d/da/Dog-shaking-itself.jpg"
      />
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/d/de/Chicken_from_Venezuela.jpg"
      />
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/4/47/Raccoon_on_Log.jpg"
      />
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/9/95/Testudohermanni.jpg"
      />
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/8/8d/Squirrel_holding_nut.jpg"
      />
    </div>
  </section>
</template>

<script>
export default {
  name: "Carousel",
};
</script>

<style scoped>
.carousel {
  background: #333;
}

.main-image {
  align-items: center;

  display: flex;
  height: 80vh;
  justify-content: center;
}

.main-image > img {
  max-height: 80vh;
}

.control-strip {
  display: flex;
  overflow-x: auto;
}

.control-strip::-webkit-scrollbar {
  display: none;
}

.control-strip > img {
  cursor: pointer;
  height: 20vh;
}
</style>
