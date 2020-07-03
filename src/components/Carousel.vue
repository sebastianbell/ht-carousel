<template>
  <section class="carousel">
    <div class="main-image">
      <img :src="mainImageUrl" />
    </div>
    <div class="control-strip">
      <img
        v-for="url in imageUrls"
        :src="url"
        :key="url"
        v-on:click="updateImage"
      />
    </div>
  </section>
</template>

<script>
const imageUrls = [
  "https://upload.wikimedia.org/wikipedia/commons/6/6e/A_Song_Bird_%28177187493%29.jpeg",
  "https://upload.wikimedia.org/wikipedia/commons/4/4a/19-06-170-carter.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/d/da/Dog-shaking-itself.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/d/de/Chicken_from_Venezuela.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/4/47/Raccoon_on_Log.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/9/95/Testudohermanni.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/8/8d/Squirrel_holding_nut.jpg",
];

export default {
  name: "Carousel",
  data() {
    return {
      mainImageUrl: imageUrls[0],
      imageUrls,
    };
  },
  methods: {
    updateImage: function(event) {
      if (event) {
        this.mainImageUrl = event.target.src;
      }
    },
  },
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
