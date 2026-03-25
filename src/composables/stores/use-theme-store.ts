import { shallowRef } from "vue";
import type { Pinia } from "pinia";

const STORAGE_KEY = "vitesse-lite:theme-preference";
const DARK_CLASS = "app-dark";
const mediaQuery = "(prefers-color-scheme: dark)";

export type ThemePreference = "system" | "light" | "dark";
type ResolvedTheme = Exclude<ThemePreference, "system">;

function isThemePreference(value: string | null): value is ThemePreference {
  return value === "system" || value === "light" || value === "dark";
}

export const useThemeStore = defineStore("theme", () => {
  const themePreference = shallowRef<ThemePreference>("system");
  const systemTheme = shallowRef<ResolvedTheme>("light");
  const initialized = shallowRef(false);

  let mediaQueryList: MediaQueryList | null = null;
  let stopSync: (() => void) | null = null;

  const resolvedTheme = computed<ResolvedTheme>(() => {
    return themePreference.value === "system" ? systemTheme.value : themePreference.value;
  });

  const isDark = computed(() => resolvedTheme.value === "dark");

  function applyTheme(theme: ResolvedTheme) {
    if (typeof document === "undefined") {
      return;
    }

    const root = document.documentElement;
    root.classList.toggle(DARK_CLASS, theme === "dark");
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
  }

  function persistPreference() {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, themePreference.value);
  }

  function syncSystemTheme() {
    if (!mediaQueryList) {
      return;
    }

    systemTheme.value = mediaQueryList.matches ? "dark" : "light";

    if (themePreference.value === "system") {
      applyTheme(systemTheme.value);
    }
  }

  function setThemePreference(nextTheme: ThemePreference) {
    themePreference.value = nextTheme;
    persistPreference();
    applyTheme(resolvedTheme.value);
  }

  function initialize() {
    if (initialized.value) {
      applyTheme(resolvedTheme.value);
      return;
    }

    if (typeof window !== "undefined") {
      const storedTheme = window.localStorage.getItem(STORAGE_KEY);

      if (isThemePreference(storedTheme)) {
        themePreference.value = storedTheme;
      }

      mediaQueryList = window.matchMedia(mediaQuery);
      syncSystemTheme();

      const handleChange = () => syncSystemTheme();
      mediaQueryList.addEventListener("change", handleChange);
      stopSync = () => mediaQueryList?.removeEventListener("change", handleChange);
    }

    applyTheme(resolvedTheme.value);
    initialized.value = true;
  }

  function dispose() {
    stopSync?.();
    stopSync = null;
    mediaQueryList = null;
  }

  return {
    themePreference,
    resolvedTheme,
    isDark,
    initialized,
    initialize,
    dispose,
    setThemePreference,
  };
});

export function useThemeStoreForApp(pinia: Pinia) {
  return useThemeStore(pinia);
}

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useThemeStore, import.meta.hot));
}
