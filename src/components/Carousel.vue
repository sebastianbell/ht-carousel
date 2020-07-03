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
// Image URLs endpoint.
const endPointUrl =
  "https://run.mocky.io/v3/6d1e82b6-26e3-4c12-951b-fadbf008cff4";
// The array of image URLs, intit with a placeholder.
let imageUrls = [
  "https://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif",
];

export default {
  name: "Carousel",
  data() {
    this.fetchImageUrls();
    return {
      mainImageUrl: imageUrls[0],
      imageUrls,
    };
  },
  methods: {
    fetchImageUrls: function() {
      // Using axios, see main.js.
      this.$http.get(endPointUrl).then((result) => {
        this.imageUrls = result.data;
        this.mainImageUrl = result.data[0];
      });
    },
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
