<template>
  <div
    :style="{ height: formHeight }"
    class="flex flex-col font-sans rounded-primary border border-slate-200 bg-white cursor-pointer overflow-hidden transition-all duration-300"
  >
    <!-- Main Content -- Start -->
    <form
      :style="{
        height: formHeight,
        backgroundColor: generateBackgroundColor(id),
      }"
      class="m-4 p-6 space-y-6 rounded-primary transition-all duration-300"
    >
      <!-- Top Section - Start -->
      <div class="flex flex-wrap gap-4 items-center justify-center">
        <!-- Logo -- Start -->
        <div class="relative h-12 w-12 rounded-full bg-black overflow-hidden">
          <img
            src="../assets/images/SP-Card/image.jpeg"
            alt=""
            class="inset-0 w-full h-full object-cover rounded-full"
            loading="lazy"
          />
        </div>
        <!-- Logo -- End -->
        <!-- Name -- Start -->
        <h1 class="flex-auto text-lg font-sans font-normal text-primary">
          {{ name }}
        </h1>
        <!-- Name -- End -->
        <!-- date -- Start -->
        <button
          class="h-8 px-4 text-sm font-normal rounded-full bg-white text-slate-900"
          type="button"
        >
          {{ date }}
        </button>
        <!-- date -- End -->
        <!-- Heart Button -- Start -->
        <button
          @click="toggleHeart"
          class="h-8 px-4 text-sm font-normal flex items-center"
        >
          <!-- Heart Icon -->
          <svg
            v-if="isHeartFilled"
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
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path
              fill-rule="evenodd"
              d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
              clip-rule="evenodd"
            />
          </svg>

          <!-- Heart Text (You can remove or replace this if you want) -->
        </button>
        <!-- Heart Button -- End -->
      </div>
      <!-- Top Section - End -->

      <!-- Middle Section -- Start -->
      <div class="flex flex-wrap space-y-6">
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

      <!-- Middle Section -- End -->

      <!-- Show More Button -- Start -->
      <button
        @click="toggleDescription"
        class="relative -bottom-11 -right-[23rem] p-1 bg-white text-black rounded-full"
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
      <!-- Profiles-- Start -->
      <div class="flex space-x-2 items-center">
        <div class="flex items-center -space-x-5">
          <img
            v-for="imagePath in imagePaths"
            :key="imagePath"
            class="h-10 w-10 rounded-full"
            :src="imagePath"
            alt=""
          />
        </div>

        <p class="font-poppins font-semibold text-base">
          +{{ imagePaths.length }}
        </p>
      </div>
      <!-- Profiles-- End -->
      <button
        class="h-10 px-6 font-semibold rounded-full bg-primary text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-black duration-300"
        type="submit"
      >
        Request
      </button>
    </div>
    <!-- Bottom Buttons -- End -->
  </div>
</template>

<script>
import technologiesData from "../content/technologies.json";
import imagePath1 from "@/assets/images/SP-Card/image.jpeg";

export default {
  name: "SPCard",
  props: {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    date: {
      type: String,
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
    technologyIds: {
      type: Array,
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
    mappedTechnologies() {
      console.log("technologiesData:", technologiesData);

      return this.technologyIds.map((id) => {
        const tech = technologiesData.find((tech) => tech.id === id);
        if (tech && tech.name) {
          return tech.name; // Return the technology name if found
        } else {
          console.warn(`Technology not found for ID: ${id}`); // Log a warning for debugging
          return "Unknown Technology"; // Return a default value if the technology is not found
        }
      });
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
    toggleHeart() {
      this.isHeartFilled = !this.isHeartFilled; // Toggle the heart fill state
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
