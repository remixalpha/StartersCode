<template>
  <div class="bg-white">
    <header class="absolute h-32 bg-white inset-x-0 top-0 z-50">
      <nav
        class="flex items-center justify-between lg:px-8 overflow-hidden"
        aria-label="Global"
      >
        <!-- Logo -->
        <div class="flex lg:flex-1">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">Your Company</span>
            <img
              class="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </a>
        </div>

        <!-- Search -- Start -->
        <SearchBar
          :placeholder="searchPlaceholder"
          :tooltip="searchTooltip"
          @input="handleSearchInput"
        />
        <!-- Search -- End -->
        <!-- Items -- Start -->
        <div class="hidden relative lg:grid lg:grid-row-1 h-28 mt-4">
          <!-- Pin -->
          <div class="buttons flex gap-8">
            <button
              v-for="button in buttons"
              :key="button.id"
              @click="toggleButton(button)"
              :class="{ active: button.active }"
              class="text-black bg-lightPrimary px-[15px] py-[10px] rounded-full h-[3rem]"
            >
              {{ button.name }}
            </button>
          </div>
          <!-- Selected pin -->
          <div class="selected-buttons absolute flex gap-4 mt-16 pl-1">
            <div
              v-for="selectedButton in selectedButtons"
              :key="selectedButton.id"
            >
              {{ selectedButton.name }}
              <button @click="removeSelectedButton(selectedButton.id)">
                <i class="bx" :class="'bx-x' || 'bx-square-rounded'" />
              </button>
            </div>
          </div>
        </div>
        <!-- Items -- End -->

        <!-- Login -- Start -->
        <div class="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="#" class="text-sm font-semibold leading-6 text-gray-900"
            >Log in <span aria-hidden="true">&rarr;</span></a
          >
        </div>
        <!-- Login -- End -->
      </nav>
    </header>
  </div>
</template>

<script setup>
import { ref } from "vue";
import SearchBar from "../components/SearchBar.vue";

const mobileMenuOpen = ref(false);

// Tag Buttons Start
const buttons = ref([
  { id: 1, name: "Java", active: false },
  { id: 2, name: "JavaScript", active: false },
  { id: 3, name: "Python", active: false },

  // Add more buttons as needed
]);

const selectedButtons = ref([]);

const toggleButton = (button) => {
  button.active = !button.active;

  if (button.active) {
    selectedButtons.value.push(button);
  } else {
    selectedButtons.value = selectedButtons.value.filter(
      (selectedButton) => selectedButton.id !== button.id
    );
  }
};

const removeSelectedButton = (buttonId) => {
  buttons.value.forEach((button) => {
    if (button.id === buttonId) {
      button.active = false;
    }
  });

  selectedButtons.value = selectedButtons.value.filter(
    (selectedButton) => selectedButton.id !== buttonId
  );
};
// Tag Buttons End
</script>
<script>
export default {
  name: "Header",
};
</script>

<style>
/* Add styles for the active class */

.buttons .active {
  color: #ffff;
  border-radius: 50px;
  padding: 10px 15px 10px 15px;
  background-color: #111;
}

.selected-buttons div {
  display: flex;
  align-items: center;
  background-color: #3490dc;
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
}

.selected-buttons button {
  margin-left: 8px;
  cursor: pointer;
  background: none;
  border: none;
  color: #fff;
}
</style>
