<template>
  <!-- Carousel: an image viewer that takes an array of image URLs, this component will dynamically scale to its parent container dimensions. -->
  <section class="carousel" :class="carouselClasses">
    <div class="main-image-container">
      <img :src="mainImageUrl" alt="Main Image" />
      <div class="icon arrow prev" v-on:click="prevImage"></div>
      <div class="icon arrow next" v-on:click="nextImage"></div>
      <div
        class="icon download"
        title="Download Image"
        @click="downloadImage"
      ></div>
      <div
        class="icon expanded"
        title="Expand View"
        @click="toggleExpanded"
      ></div>
    </div>
    <div class="control-strip">
      <img
        v-for="(url, index) in imageUrls"
        :src="url"
        :key="url"
        :data-index="index"
        alt="Thumbnail Image"
        @click="updateImage(index)"
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
      showControlStrip: true,
      imageUrls: carouselConfig.placeholderImageUrls,
      imagesLength: carouselConfig.placeholderImageUrls.length,
      mainImageUrl: carouselConfig.placeholderImageUrls[0],
      imageIndex: 0,
    };
  },
  computed: {
    carouselClasses() {
      return [{ "expanded-view": !this.showControlStrip }, "carousel"];
    },
  },
  methods: {
    fetchImageUrls() {
      // Using axios, see main.js.
      this.$http
        .get(carouselConfig.endpointUrl)
        .then((result) => {
          this.imageUrls = result.data.images;
          this.imagesLength = this.imageUrls.length;
          this.mainImageUrl = result.data.images[0];
        })
        .then(() => {
          this.getImgFromQueryString();
          this.keyboardShortcuts();
        })
        .catch((error) => {
          window.console.error(error);
        });
    },
    updateImage(index) {
      this.mainImageUrl = this.imageUrls[index];
      this.imageIndex = index;
    },
    prevImage() {
      if (this.imageIndex > 0) {
        this.imageIndex -= 1;
        this.mainImageUrl = this.imageUrls[this.imageIndex];
      } else {
        this.imageIndex = this.imagesLength - 1;
        this.mainImageUrl = this.imageUrls[this.imageIndex];
      }
    },
    nextImage() {
      if (this.imagesLength - 1 > this.imageIndex) {
        this.imageIndex += 1;
        this.mainImageUrl = this.imageUrls[this.imageIndex];
      } else {
        this.imageIndex = 0;
        this.mainImageUrl = this.imageUrls[this.imageIndex];
      }
    },
    updateStrip() {
      const strip = document.querySelector(".carousel > .control-strip");
      const images = strip.querySelectorAll("img");
      const selected = strip.querySelector(
        `img[data-index='${this.imageIndex}']`
      );
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
    toggleExpanded() {
      this.showControlStrip = !this.showControlStrip;
    },
    downloadImage() {
      // Using axios, see main.js.
      this.$http({
        method: "get",
        url: this.mainImageUrl,
        responseType: "arraybuffer",
      })
        .then((response) => {
          this.forceFileDownload(response);
        })
        .catch((error) => {
          window.console.error(error);
        });
    },
    forceFileDownload(response) {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `image${this.imageIndex}.jpg`);
      document.body.appendChild(link);
      link.click();
    },
    getImgFromQueryString() {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const img = parseInt(urlParams.get("img"));
      if (img >= 0 && img <= this.imagesLength - 1) {
        this.mainImageUrl = this.imageUrls[img];
        this.imageIndex = img;
      }
    },
    keyboardShortcuts() {
      document.addEventListener("keydown", (event) => {
        switch (event.key) {
          case "ArrowLeft":
            this.prevImage();
            break;
          case "ArrowRight":
            this.nextImage();
            break;
          case "Escape":
            this.toggleExpanded();
            break;
        }
      });
    },
  },
  updated() {
    this.updateStrip();
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

// Drop shadow
$drop-shadow: drop-shadow(3px 3px 2px rgba(0, 0, 0, 0.7));
$drop-shadow-hover: drop-shadow(0 0 7px rgba(255, 255, 255, 0.9));

// NOTE: Keep selector properties in alphbetical order :)
.carousel {
  background: $dark;
  height: 100%;
  &.expanded-view .main-image-container {
    height: 100%;
  }
  &.expanded-view .control-strip {
    display: none;
  }
}

.main-image-container {
  align-items: center;
  display: flex;
  height: 80%;
  justify-content: center;
  position: relative;
  img {
    border: 1px solid black;
    max-height: 100%;
  }
}

.icon {
  background-repeat: no-repeat;
  background-size: contain;
  cursor: pointer;
  filter: $drop-shadow;
  opacity: $opacity;
  position: absolute;
  -webkit-tap-highlight-color: transparent;
  &:hover {
    filter: $drop-shadow-hover;
    opacity: $opacity-hover;
  }
  &.arrow {
    background-image: url(#{$asset-path}/icon-arrow.svg);
    height: 7rem;
    width: 7rem;
    &.prev {
      left: 0;
      transform: scale(-1, 1);
    }
    &.next {
      right: 0;
    }
  }
  &.expanded {
    background-image: url(#{$asset-path}/icon-expanded.svg);
    bottom: 1rem;
    height: 3rem;
    right: 1rem;
    width: 3rem;
  }
  &.download {
    background-image: url(#{$asset-path}/icon-download.svg);
    left: 1rem;
    bottom: 1rem;
    height: 3rem;
    width: 3rem;
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
}
</style>
