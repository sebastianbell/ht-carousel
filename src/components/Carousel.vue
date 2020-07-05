<template>
  <section class="carousel">
    <div class="main-image">
      <img :src="mainImageUrl" />
      <div class="icon-arrow prev" v-on:click="prevImage"></div>
      <div class="icon-arrow next" v-on:click="nextImage"></div>
      <div class="icon-fullscreen" v-on:click="toggleFullscreen"></div>
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
const carouselConfig = {
  // Image URLs endpoint.
  endpointUrl: "https://run.mocky.io/v3/c5d6233d-84f9-40b7-9801-f4dbd398eceb",
  // Array of image URLs, intit with a placeholder or default images.
  placeholderImageUrls: [
    "https://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif",
  ],
};

export default {
  name: "Carousel",
  data() {
    this.fetchImageUrls();
    return {
      imageUrls: carouselConfig.placeholderImageUrls,
      imagesLength: carouselConfig.placeholderImageUrls.length,
      mainImageUrl: carouselConfig.placeholderImageUrls[0],
      imageIndex: 0,
    };
  },
  mounted() {
    document.onreadystatechange = () => {
      if (document.readyState === "complete") {
        // DOM ready.
        this.keyboardShortcuts();
      }
    };
  },
  methods: {
    fetchImageUrls: function() {
      // Using axios, see main.js.
      this.$http
        .get(carouselConfig.endpointUrl)
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

      // Remove the intial placeholder image border.
      strip.classList.remove("strip-init");
      // Remove all image borders.
      images.forEach((element) => {
        element.classList.remove("strip-selected");
      });
      // Add border to selected strip image.
      selected.classList.add("strip-selected");
      // Scrolls the strip left to the selected strip image, when possible.
      strip.scrollTo({
        left: selected.offsetLeft,
        behavior: "smooth",
      });
    },
    toggleFullscreen: function() {
      const container = document.querySelector(".carousel");
      container.classList.toggle("strip-hide");
      this.scrollStrip();
    },
    keyboardShortcuts: function() {
      // Arrow keys.
      document.addEventListener("keydown", (event) => {
        switch (event.key) {
          case "ArrowLeft":
            this.prevImage();
            break;
          case "ArrowRight":
            this.nextImage();
            break;
          case "Escape":
            this.toggleFullscreen();
            break;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
// Colors
$dark: #333;
$light: #eee;

// Assets
$asset-path: "../assets";

// Opacity
$opacity: 0.3;
$opacity-hover: 0.5;

// NOTE: Keep selector properties in alphbetical order :)
.carousel {
  background: $dark;
  display: flex;
  flex-flow: column;
  height: 100vh;
  &.strip-hide .main-image img {
    max-height: 100vh;
  }
  &.strip-hide .control-strip {
    display: none;
  }
}

.main-image {
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
  position: relative;
  img {
    border: 1px solid black;
    max-height: 80vh;
  }
}

.icon-arrow {
  background-image: url(#{$asset-path}/icon-arrow.svg);
  background-repeat: no-repeat;
  background-size: contain;
  cursor: pointer;
  height: 7rem;
  opacity: $opacity;
  position: absolute;
  width: 7rem;
  &:hover {
    opacity: $opacity-hover;
  }
  &.prev {
    left: 0;
    transform: scale(-1, 1);
  }
  &.next {
    right: 0;
  }
}

.icon-fullscreen {
  background-image: url(#{$asset-path}/icon-fullscreen.svg);
  background-repeat: no-repeat;
  background-size: contain;
  bottom: 1rem;
  cursor: pointer;
  height: 3rem;
  opacity: $opacity;
  position: absolute;
  right: 1rem;
  width: 3rem;
  &:hover {
    opacity: $opacity-hover;
  }
}

.control-strip {
  display: flex;
  height: 20%;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  img {
    border: 2px solid transparent;
    cursor: pointer;
    height: 100%;
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
