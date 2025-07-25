import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useDarkModeStore = defineStore("darkModeStore", () => {
  // State
  const darkMode = ref<boolean>(false);

  // Getters
  const theme = computed(() => (darkMode.value ? "dark" : "light"));

  const themeClasses = computed(() => ({
    dark: darkMode.value,
    light: !darkMode.value,
  }));

  // Actions
  function toggleDarkMode() {
    darkMode.value = !darkMode.value;
    saveToLocalStorage();
  }

  function setDarkMode(value: boolean) {
    darkMode.value = value;
    updateDocumentClass();
    saveToLocalStorage();
  }

  function updateDocumentClass() {
    if (typeof document !== "undefined") {
      const html = document.documentElement;
      const body = document.body;

      // Delete theme class
      const classesToRemove = ["dark", "light", "theme-dark", "theme-light"];
      classesToRemove.forEach((cls) => {
        html.classList.remove(cls);
        body.classList.remove(cls);
      });

      // Add theme class
      if (darkMode.value) {
        html.classList.add("dark");
        body.classList.add("dark");

        html.style.backgroundColor = "#111827";
        html.style.color = "#f9fafb";
        body.style.backgroundColor = "#111827";
        body.style.color = "#f9fafb";
      } else {
        html.classList.add("light");
        body.classList.add("light");

        html.style.backgroundColor = "#ffffff";
        html.style.color = "#1f2937";
        body.style.backgroundColor = "#ffffff";
        body.style.color = "#1f2937";
      }
    }
  }

  function saveToLocalStorage() {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("pokemon-dark-mode", JSON.stringify(darkMode.value));
    }
  }

  function loadFromLocalStorage() {
    if (typeof localStorage !== "undefined") {
      const stored = localStorage.getItem("pokemon-dark-mode");

      if (stored !== null) {
        try {
          const parsed = JSON.parse(stored);
          darkMode.value = parsed;
        } catch (error) {
          console.warn("❌ Failed dark mode:", error);
          initializeFromSystemPreference();
        }
      } else {
        initializeFromSystemPreference();
      }
    }
  }

  function initializeFromSystemPreference() {
    if (typeof window !== "undefined" && window.matchMedia) {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      darkMode.value = prefersDark;
    } else {
      darkMode.value = false;
    }
  }

  function initialize() {
    loadFromLocalStorage();
    updateDocumentClass();
  }

  return {
    // State
    darkMode,
    // Getters
    theme,
    themeClasses,
    // Actions
    toggleDarkMode,
    setDarkMode,
    initialize,
  };
});
