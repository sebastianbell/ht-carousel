<template>
  <section class="carousel">
    <div class="main-image">
      <img :src="mainImageUrl" />
      <div class="arrow prev" v-on:click="prevImage"></div>
      <div class="arrow next" v-on:click="nextImage"></div>
    </div>
    <div class="control-strip">
      <img
        v-for="(url, index) in imageUrls"
        :src="url"
        :key="url"
        :data-index="index"
        v-on:click="updateImage"
      />
    </div>
  </section>
</template>

<script>
// Image URLs endpoint.
const endPointUrl =
  "https://run.mocky.io/v3/c5d6233d-84f9-40b7-9801-f4dbd398eceb";
// Array of image URLs, intit with a placeholder or default images.
const placeholderImageUrls = [
  "https://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif",
];

export default {
  name: "Carousel",
  data() {
    this.fetchImageUrls();
    return {
      imageUrls: placeholderImageUrls,
      imagesLength: placeholderImageUrls.length,
      mainImageUrl: placeholderImageUrls[0],
      imageIndex: 0,
    };
  },
  methods: {
    fetchImageUrls: function() {
      // Using axios, see main.js.
      this.$http
        .get(endPointUrl)
        .then((result) => {
          this.imageUrls = result.data.images;
          this.imagesLength = this.imageUrls.length;
          this.mainImageUrl = result.data.images[0];
        })
        .catch((error) => {
          window.console.error(error.response);
        });
    },
    updateImage: function(event) {
      if (event) {
        this.mainImageUrl = event.target.src;
        this.imageIndex = event.target.getAttribute("data-index");
        // console.log(this.imageIndex);
        // console.log(event.target);
      }
    },
    prevImage: function(event) {
      if (event && this.imageIndex > 0) {
        this.imageIndex -= 1;
        this.mainImageUrl = this.imageUrls[this.imageIndex];
        console.log(this.imageIndex);
      } else {
        // console.log("nope!");
      }
    },
    nextImage: function(event) {
      if (event && this.imagesLength - 1 > this.imageIndex) {
        this.imageIndex += 1;
        this.mainImageUrl = this.imageUrls[this.imageIndex];
        console.log(this.imageIndex);
      } else {
        // console.log("nope!");
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
  position: relative;
}

.main-image > img {
  max-height: 80vh;
}

.main-image > .arrow {
  background-image: url(../assets/arrow.svg);
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
  height: 100px;
  opacity: 0.3;
  position: absolute;
  width: 100px;
}

.main-image > .arrow:hover {
  opacity: 0.5;
}

.main-image > .arrow.prev {
  left: 0;
  transform: scale(-1, 1);
}

.main-image > .arrow.next {
  right: 0;
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
