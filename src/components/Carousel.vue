<template>
  <section class="carousel">
    <div class="main-image">
      <img :src="mainImageUrl" />
      <div class="arrow prev" v-on:click="prevImage"></div>
      <div class="arrow next" v-on:click="nextImage"></div>
    </div>
    <div class="control-strip strip-init">
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
const endpointUrl =
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
  mounted() {
    window.addEventListener("load", () => {
      document.addEventListener("keydown", (event) => {
        switch (event.key) {
          case "ArrowLeft":
            this.prevImage();
            break;
          case "ArrowRight":
            this.nextImage();
            break;
        }
      });
    });
  },
  methods: {
    fetchImageUrls: function() {
      // Using axios, see main.js.
      this.$http
        .get(endpointUrl)
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
      this.mainImageUrl = event.target.src;
      this.imageIndex = parseInt(event.target.getAttribute("data-index"));
      this.scrollStrip();
    },
    prevImage: function() {
      if (this.imageIndex > 0) {
        this.imageIndex -= 1;
        this.mainImageUrl = this.imageUrls[this.imageIndex];
      } else {
        this.imageIndex = this.imagesLength - 1;
        this.mainImageUrl = this.imageUrls[this.imagesLength - 1];
      }
      this.scrollStrip();
    },
    nextImage: function() {
      if (this.imagesLength - 1 > this.imageIndex) {
        this.imageIndex += 1;
        this.mainImageUrl = this.imageUrls[this.imageIndex];
      } else {
        this.imageIndex = 0;
        this.mainImageUrl = this.imageUrls[0];
      }
      this.scrollStrip();
    },
    scrollStrip: function() {
      const strip = document.querySelector(".carousel > .control-strip");
      const images = strip.querySelectorAll("img");
      const selected = strip.querySelector(
        `img[data-index='${this.imageIndex}']`
      );
      const width = strip.querySelector("img").offsetWidth;

      strip.classList.remove("strip-init");
      images.forEach((element) => {
        element.classList.remove("strip-selected");
      });
      selected.classList.add("strip-selected");
      strip.scrollTo({
        top: 0,
        left: width * this.imageIndex,
        behavior: "smooth",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
// Colors
$dark: #333;
$medium: #666;
$light: #eee;

// Assets
$asset-path: "../assets";

.carousel {
  background: $dark;
}

.main-image {
  align-items: center;
  display: flex;
  height: 80vh;
  justify-content: center;
  position: relative;
  img {
    border: 1px solid black;
    max-height: 80vh;
  }
}

.arrow {
  background-image: url(#{$asset-path}/arrow.svg);
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
  height: 100px;
  opacity: 0.3;
  position: absolute;
  width: 100px;
  &:hover {
    opacity: 0.5;
  }
  &.arrow.prev {
    left: 0;
    transform: scale(-1, 1);
  }
  &.arrow.next {
    right: 0;
  }
}

.control-strip {
  display: flex;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  img {
    border: 2px solid $medium;
    cursor: pointer;
    height: 20vh;
    &:hover,
    &.strip-selected {
      border-color: $light;
    }
  }
  &.strip-init > img:first-child {
    border-color: $light;
  }
}
</style>
