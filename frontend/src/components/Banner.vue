<template>
  <div
    :style="{ height: formHeight }"
    class="flex flex-col font-sans rounded-primary border-4 border-white cursor-pointer overflow-hidden transition-all duration-300"
  >
    <!-- Main Content -- Start -->
    <form
      :style="{
        height: formHeight,
        backgroundColor: generateBackgroundColor(id),
      }"
      class="flex flex-auto m-4 p-14 space-y-6 rounded-primary shadow-md transition-all duration-300"
    >
      <!-- Middle Section -- Start -->
      <div class="flex flex-wrap space-y-6 mr-[40rem]">
        <!-- Startup Title -- Start -->
        <h1 class="flex-auto text-4xl font-poppins font-semibold text-primary">
          {{ title }}
        </h1>
        <!-- Startup Title -- End -->

        <!-- Displayed Content -- Start -->
        <div class="flex-auto space-y-4" v-if="!showFullDescription">
          <!-- Startup Description -- Start -->
          <span
            class="w-full flex-none text-md font-normal font-sans text-second mt-2"
          >
            {{ limitedDescription }}...
          </span>
          <!-- Startup Description -- End -->
        </div>
        <!-- Displayed Content -- End -->

        <!-- Hidden Content -- Start -->
        <div v-else>
          <span
            class="w-full flex-none text-md font-normal font-poppins text-second mt-2"
          >
            {{ description }}
          </span>
          <!-- Image -->
          <div
            class="relative w-[20rem] h-[10rem] mt-4 rounded-primary bg-black overflow-hidden"
          >
            <img
              src="../assets/images/SP-Card/image.jpeg"
              alt=""
              class="inset-0 w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
        <!-- Hidden Content -- End -->

        <!-- Technology -- Start -->
        <div class="flex flex-col space-y-2 overflow-hidden">
          <!-- <h1 class="flex-auto text-xl font-poppins font-medium text-primary">
              Technology
            </h1> -->
          <div class="grid grid-cols-3 gap-4 justify-between">
            <button
              v-for="tech in mappedTechnologies"
              :key="tech"
              class="h-10 px-6 font-semibold rounded-full border border-primary text-black overflow-hidden"
              type="submit"
            >
              {{ tech }}
            </button>
          </div>
        </div>
        <!-- Technology -- Start -->
      </div>

      <div
        class="relative w-full h-full scale-150 mt-4 rounded-primary overflow-hidden"
      >
        <img
          src="../assets/images/Banner/startups.png"
          alt=""
          class="inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <!-- Middle Section -- End -->

      <!-- Show More Button -- Start -->
      <button
        @click="toggleDescription"
        class="relative -bottom-11 -right-[89rem] p-1 bg-white text-black rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>
      <!-- Show More Button -- End -->
    </form>
    <!-- Main Content -- End -->

    <!-- Bottom Buttons -- Start -->
    <div
      class="flex relative justify-start items-center space-x-[14rem] p-6 mb-6 text-sm font-medium"
    >
      <button
        class="h-10 px-6 font-semibold rounded-full bg-primary text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-black duration-300"
        type="submit"
      >
        Start
      </button>
    </div>
    <!-- Bottom Buttons -- End -->
  </div>
</template>

<script>
import imagePath1 from "@/assets/images/SP-Card/image.jpeg";

export default {
  name: "Banner",
  props: {
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showFullDescription: false,
      isHeartFilled: false,
      formHeight: "auto",
      imagePaths: [imagePath1, imagePath1, imagePath1, imagePath1],
    };
  },
  computed: {
    limitedDescription() {
      return this.description.slice(0, 200);
    },
  },

  watch: {
    showFullDescription(newValue) {
      this.adjustFormHeight(newValue);
    },
  },
  methods: {
    toggleDescription() {
      this.showFullDescription = !this.showFullDescription;
    },
    adjustFormHeight(isFullDescriptionShown) {
      this.formHeight = "auto";
    },
    generateBackgroundColor(id) {
      const colors = ["#a2d2ff", "#bbd0ff", "#f7f3c8", "#eaf4f4"]; // Add more colors if needed
      const index = id % colors.length; // Simple way to get a color based on id
      return colors[index];
    },
  },
  mounted() {
    console.log("ID:", this.id); // This should log the id value
  },
};
</script>

<script setup></script>

<style></style>
