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
      this.initUi();
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
    initUi: function() {
      const firstStripImage = document.querySelector(
        ".carousel > .control-strip > img"
      );
      firstStripImage.classList.add("strip-selected");
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

.arrow {
  background-image: url(../assets/arrow.svg);
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
  height: 100px;
  opacity: 0.3;
  position: absolute;
  width: 100px;
}

.arrow:hover {
  opacity: 0.5;
}

.arrow.prev {
  left: 0;
  transform: scale(-1, 1);
}

.arrow.next {
  right: 0;
}

.control-strip {
  display: flex;
  overflow-x: scroll;
}

.control-strip::-webkit-scrollbar {
  display: none;
}

.control-strip > img {
  border: 2px solid transparent;
  cursor: pointer;
  height: 20vh;
}

.control-strip > img:hover,
.control-strip > img.strip-selected {
  border-color: #eee;
}
</style>
