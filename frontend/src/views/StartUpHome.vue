
  <template>
    <div class="StartUpHome">
      
      <div class="relative flex flex-col " >
            <!-- Sidebar and SideOptions -->
        <div class="flex flex-row z-50">
          <!-- Sidebar -->
          <div class="inline-flex">
            <Sidebar />
          </div>
          <!-- SideOptions -->
          <div class="inline-flex fixed z-50 ">
            <SideOptions />
          </div>
        </div>
        <div>
          <div class="fixed flex flex-row inset-0 bg-white h-[5rem] z-40">
            <Header />
          </div>
          <div class="main bg-lightPrimary mx-2  p-8 rounded-3xl">
              <!-- Main Content -->
              <div class="main bg-lightPrimary">
                <h1>Startup Home Page</h1>
                <p>Selected Startup ID: {{ startupId }}</p>
              </div>
                <!-- StartUps -- ENd -->
          </div>
        </div>
    </div>
    </div>
  </template>
  
  <script>
//   Components Imports
  import Header from "../components/Header.vue";
  import Sidebar from "../components/Sidebar.vue";
  import SideOptions from "../components/SideOptions.vue";
  
  export default {
    name: "StartUpHome",
    components: {
      Sidebar,
      Header,
    },
    props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    startupId() {
      return this.id;
    }
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
    },
  };
  </script>
  
  <script setup>
  import { ref } from "vue";
 
  </script>
  
  <style>

  </style>
  