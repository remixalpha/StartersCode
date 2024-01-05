<template>
    <!-- Main side -->
    <div class="sideOptions" :class="isOpened ? 'open' : ''" :style="cssVars">
      <!-- Top -->
      <div class="logo-details" style="margin: 6px 14px 0 14px">
        <i
          class="bx"
          :class="isOpened ? 'bx-menu-alt-right' : 'bx-menu'"
          id="btn"
          @click="isOpened = !isOpened"
        />  <!-- menubar (Clicking this open and close) -->
      </div>
  <!-- Second top -->
      <div
        style="
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex-grow: 1;
          max-height: calc(100% - 60px);
        "
      >
        <div id="my-scroll" style="margin: 6px 14px 0 14px">
          <ul class="option-list" style="overflow: visible">
   
            <li
              v-for="(menuItem, index) in menuItems"
              :key="index"
              :id="'links_' + index"
            >
              <!-- Icon -->
              <router-link v-if="isUsedVueRouter" :to="menuItem.link">
                <i class="bx" :class="menuItem.icon || 'bx-square-rounded'" />
                <span class="links_name">{{ menuItem.name }}</span>
              </router-link>
              <!-- Text -->
              <a
                v-else
                @click.stop.prevent="$emit('menuItemClicked', menuItem.link)"
                :href="menuItem.link"
                :class="{ selected: selectedItem === menuItem.name }"
                @click="selectMenuItem(menuItem.name)"
              >
                <i class="bx" :class="menuItem.icon || 'bx-square-rounded'" />
                <span class="links_name">{{ menuItem.name }}</span>
              </a>
              <!-- Tip tool -->
              <span :data-target="'links_' + index" class="tooltip">{{
                menuItem.tooltip || menuItem.name
              }}</span>
            </li>
            <!-- Sidebar Menus -- End -->
          </ul>
        </div>
      </div>
    </div>
  
  </template>
  
  <script>
  export default {
    name: "SideOptions",
    props: {
      //! Menu settings
      isMenuOpen: {
        type: Boolean,
        default: true,
      },
      // Router
      isUsedVueRouter: {
        type: Boolean,
        default: false,
      },
    
      // Body Open close
      isPaddingLeft: {
        type: Boolean,
        default: true,
      },
    
  
      //! Menu items
      menuItems: {
        type: Array,
        default: () => [
          {
            link: "/home",
            name: "Home",
            tooltip: "Home",
            icon: "bx-home",
          },
          {
            link: "#",
            name: "Starters",
            tooltip: "Entrolled",
            icon: "bx-file",
          },
          {
            link: "#",
            name: "Chat",
            tooltip: "Chat",
            icon: "bx-chat",
          },
          {
            link: "#",
            name: "Applied Status",
            tooltip: "Applied-Status",
            icon: "bx-pie-chart-alt-2",
          },
          {
            link: "#",
            name: "Saved",
            tooltip: "Saved",
            icon: "bx-bookmark",
          },

        ],
      },
  
      //! Styles
      bgColor: {
        type: String,
        default: "#ffffff",
      },
      secondaryColor: {
        type: String,
        default: "#F4F7FE",
      },
      homeSectionColor: {
        type: String,
        default: "#e4e9f7",
      },
      // Title Color
      logoTitleColor: {
        type: String,
        default: "#111",
      },
      // Icon Color
      iconsColor: {
        type: String,
        default: "#111",
      },
      // Tip showing color
      itemsTooltipColor: {
        type: String,
        default: "#e4e9f7",
      },
      // Search input field color
      searchInputTextColor: {
        type: String,
        default: "#212121",
      },
      // Menu Box color
      menuItemsHoverColor: {
        type: String,
        default: "#212121",
      },
      // Text Color
      menuItemsTextColor: {
        type: String,
        default: "#111",
      },
      // Text Hover Color
      menuItemsTextHoverColor: {
        type: String,
        default: "#ffffff",
      },

    },
    data() {
      return {
        isOpened: false,
        selectedItem: "Home",
      };
    },
    mounted() {
      this.isOpened = this.isMenuOpen;
      this.tooltipAttached();
    },
    computed: {
      cssVars() {
        return {

          "--bg-color": this.bgColor,
          "--secondary-color": this.secondaryColor,
          "--home-section-color": this.homeSectionColor,
          "--logo-title-color": this.logoTitleColor,
          "--icons-color": this.iconsColor,
          "--items-tooltip-color": this.itemsTooltipColor,
          "--menu-items-hover-color": this.menuItemsHoverColor,
          "--menu-items-text-hover-color": this.menuItemsTextHoverColor,
          "--menu-items-text-color": this.menuItemsTextColor,

        };
      },
    },
    watch: {
      isOpened(val) {
        if (window.matchMedia("(max-width: 768px)").matches) {
          // Assuming md breakpoint is 768px
          window.document.body.style.paddingLeft = this.menuClosedPaddingLeftBody;
        } else {
          window.document.body.style.paddingLeft =
            val && this.isPaddingLeft
              ? this.menuOpenedPaddingLeftBody
              : this.menuClosedPaddingLeftBody;
        }
      },
    },
    methods: {
      tooltipAttached() {
        const tooltips = document.querySelectorAll(".tooltip");
        tooltips.forEach((tooltip) => {
          document.body.appendChild(tooltip);
        });
        document.querySelectorAll(".tooltip").forEach((tooltip) => {
          const targetID = tooltip.dataset.target;
          const target = document.querySelector(`#${targetID}`);
          if (!target) return;
          target.addEventListener("mouseenter", () => {
            const targetPosition = target.getBoundingClientRect();
            if (this.isOpened) return;
            tooltip.style.top = `${targetPosition.top + window.scrollY}px`;
            tooltip.style.left = `${
              targetPosition.left + targetPosition.width + 20
            }px`;
            tooltip.classList.add("active");
          });
          target.addEventListener("mouseleave", () => {
            tooltip.classList.remove("active");
          });
        });
      },
      handleMenuItemClick(link) {
        this.$emit("menuItemClicked", link);
      },
      selectMenuItem(itemName) {
        console.log("selectMenuItem: " + itemName);
        this.selectedItem = itemName;
      },
    },
  };
  </script>
  
  <style>
  /* Google Font Link */
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap");
  @import url("https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css");
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
  }
  body {
    transition: all 0.5s ease;
  }
  
  .sideOptions {
    position: relative;
    display: flex;
    flex-direction: column;
    left: 0;
    top: 0;
    height: 100%;
    min-height: min-content;
    width: 78px;
    background: var(--bg-color);
    z-index: 99;
    transition: all 0.5s ease;
  }
  .sideOptions.open {
    width: 250px;
  }
  .sideOptions .logo-details {
    height: 60px;
    display: flex;
    align-items: center;
    position: relative;
  }
  .sideOptions .logo-details .icon {
    opacity: 0;
    transition: all 0.5s ease;
  }
  .sideOptions .logo-details .logo_name {
    color: var(--logo-title-color);
    font-size: 20px;
    font-weight: 600;
    opacity: 0;
    transition: all 0.5s ease;
  }
  .sideOptions.open .logo-details .icon,
  .sideOptions.open .logo-details .logo_name {
    opacity: 1;
  }
  .sideOptions .logo-details #btn {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    font-size: 22px;
    transition: all 0.4s ease;
    font-size: 23px;
    text-align: center;
    cursor: pointer;
    transition: all 0.5s ease;
  }
  .sideOptions.open .logo-details #btn {
    text-align: right;
  }
  .sideOptions i {
    color: var(--icons-color);
    height: 60px;
    min-width: 50px;
    font-size: 28px;
    text-align: center;
    line-height: 60px;
  }
  
  .sideOptions .option-list {
    margin-top: 20px;
  }
  .sidebar li {
    position: relative;
    margin: 8px 0;
    list-style: none;
  }
  
  /* Tool Tip */
  .tooltip {
    position: absolute;
    z-index: 3;
    background: white;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 15px;
    font-weight: 400;
    opacity: 0;
    white-space: nowrap;
    pointer-events: none;
    transition: 0s;
  }
  .tooltip.active {
    opacity: 1;
    pointer-events: auto;
    transition: all 0.4s ease;
    transform: translateY(25%);
  }
  .sideOptions.open li .tooltip {
    display: none;
  }
  
  /* Menu Section */
  .sideOptions li a {
    display: flex;
    height: 100%;
    width: 100%;
    border-radius: 12px;
    align-items: center;
    text-decoration: none;
    transition: all 0.4s ease;
  }
  .sideOptions li a:hover {
    background: var(--menu-items-hover-color);
  }
  /* Selected and active */
  .sideOptions li a.selected {
    background: var(--menu-items-hover-color);
  }
  .sideOptions li a.selected .links_name,
  .sideOptions li a.selected i {
    transition: all 0.5s ease;
    color: var(--menu-items-text-hover-color);
  }
  /*  */
  
  .sideOptions li a .links_name {
    color: var(--menu-items-text-color);
    font-size: 15px;
    font-weight: 400;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: 0.4s;
  }
  
  .sideOptions.open li a .links_name {
    opacity: 1;
    pointer-events: auto;
  }
  .sideOptions li a:hover .links_name,
  .sideOptions li a:hover i {
    transition: all 0.5s ease;
    color: var(--menu-items-text-hover-color);
  }
  
  .sideOptions li router-link {
    display: flex;
    height: 100%;
    width: 100%;
    border-radius: 12px;
    align-items: center;
    text-decoration: none;
    transition: all 0.4s ease;
    background: var(--bg-color);
  }
  .sideOptions li router-link:hover {
    background: var(--menu-items-hover-color);
  }
  .sideOptions li router-link .links_name {
    color: var(--menu-items-text-color);
    font-size: 15px;
    font-weight: 400;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: 0.4s;
  }
  .sideOptions.open li router-link .links_name {
    opacity: 1;
    pointer-events: auto;
  }
  .sideOptions li router-link:hover .links_name,
  .sideOptions li router-link:hover i {
    transition: all 0.5s ease;
    color: var(--bg-color);
  }
  
  /* Icon border box */
  .sideOptions li i {
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    border-radius: 12px;
  }
  
  </style>
  