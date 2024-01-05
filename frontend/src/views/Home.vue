<template>
  <div class="Home">
    <div class="fixed flex flex-row inset-0 bg-white h-[5rem] z-50">
      <Header />
    </div>
    <div>
      <Sidebar />
    </div>

    <div class="main bg-lightPrimary mx-2  p-8 rounded-3xl">
      <!--  Banner -- Start -->

      <swiper
        :modules="modules"
        :slides-per-view="1"
        :space-between="0"
        :pagination="{ clickable: true }"
        :autoplay="{ delay: 5000, disableOnInteraction: false }"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
      >
        <!-- Loop through CardContent.json to display each card -->
        <swiper-slide v-for="card in BannerContent" :key="card.id">
          <Banner
            :id="card.id"
            :title="card.startUpTitle"
            :description="card.startUpDescription"
          />
        </swiper-slide>
      </swiper>
      <!--  Banner -- End -->
      <!-- StartUps -- Start -->
      <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
        <!-- Section 1 -->
        <div
          class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 m-4 p-4 relative items-start justify-between gap-x-[2rem] gap-y-4 bg-third rounded-primary"
        >
          <!-- Section title -->
          <h1
            :class="{ 'sticky-title': isHeaderSticky }"
            class="flex-auto text-5xl font-poppins font-semibold text-white mt-8 ml-8 opacity-40"
          >
            Non Code based
          </h1>
          <!-- Loop through CardContent.json to display each card -->
          <router-link v-for="card in CardContent" :key="card.id" :to="{ name: 'StartUpHome', params: { id: card.id }}">
          <SPCard
            :id="card.id"
            :name="card.startUpName"
            :date="card.createdDate"
            :title="card.startUpTitle"
            :description="card.startUpDescription"
            :technologyIds="card.technologyIds"
            @click.native="navigateToStartUpHome(card.id)"
          />
        </router-link>
        </div>
        <!-- Section 2 -->
        <div
          class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 m-4 p-4 relative items-start justify-between gap-x-[2rem] gap-y-4 bg-primary rounded-primary"
        >
          <!-- Section title -->
          <h1
            :class="{ 'sticky-title': isHeaderSticky }"
            class="flex-auto text-5xl font-poppins font-semibold text-white mt-8 ml-8 mr-11 opacity-40"
          >
            Code based
          </h1>
          <!-- Loop through CardContent.json to display each card -->
          <SPCard
            v-for="card in CardContent"
            :key="card.id"
            :id="card.id"
            :name="card.startUpName"
            :date="card.createdDate"
            :title="card.startUpTitle"
            :description="card.startUpDescription"
            :technologyIds="card.technologyIds"
          />
        </div>
      
      </div>
      <!-- StartUps -- ENd -->
    </div>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
import SPCard from "../components/SPCard.vue";
import Banner from "../components/Banner.vue";
import Header from "../components/Header.vue";
import CardContent from "../content/CardContent.json";
import BannerContent from "../content/BannerContent.json";
// Swiper
import { Autoplay, Pagination, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";


export default {
  name: "Home",
  components: {
    Sidebar,
    Header,
    Swiper,
    SwiperSlide,
    SPCard,
    Banner,

  },
  data() {
    return {
      isHeaderSticky: true,
    };
  },

  setup() {
    const onSwiper = (swiper) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log("slide change");
    };
    return {
      onSwiper,
      onSlideChange,
      modules: [Autoplay, Pagination, A11y],
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      // You can adjust the scroll threshold based on your design
      this.isHeaderSticky = window.scrollY > 100;
    },
    navigateToStartUpHome(id) {
      router.push({ name: 'StartUpHome', params: { id } });
    }
  },
};
</script>

<script setup>
import { ref } from "vue";
const selectedId = ref(1); // Default ID to show
const selectedCard = ref(getCardById(selectedId.value));

function getCardById(id) {
  return CardContent.find((card) => card.id === id);
}

// You can change the ID to a different one to display a different content item
function changeSelectedCard(id) {
  selectedId.value = id;
  selectedCard.value = getCardById(id);
}
</script>

<style>

</style>
