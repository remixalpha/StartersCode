<template>
  <div class="navbar">
    <div id="links_search">
      <i class="bx bx-search"></i>
      <input
        type="text"
        :placeholder="placeholder"
        @input="$emit('input', $event.target.value)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  props: {
    placeholder: {
      type: String,
      default: "Search...",
    },
    tooltip: {
      type: String,
      default: "Search",
    },
  },
};
</script>
<script setup>
import {
  bgColor,
  secondaryColor,
  searchInputTextColor,
  iconsColor,
  itemsTooltipColor,
} from "../config/color";
</script>

<style>
/* search input */
.navbar {
  position: relative;
  margin-right: 60px;
}

#links_search {
  display: flex;
  flex-direction: row;
}

input {
  font-size: 15px;
  color: var(--search-input-text-color);
  font-weight: 400;
  outline: none;
  height: 50px;
  width: 100%;
  border: none;
  border-radius: 12px;
  padding-left: 40px;
  transition: all 0.5s ease;
}

.bx-search {
  position: absolute;
  top: 50%;
  left: 0;
  margin-left: 10px;
  transform: translateY(-50%);
  font-size: 22px;
  background: var(--secondary-color);
  color: var(--icons-color);
}
</style>
