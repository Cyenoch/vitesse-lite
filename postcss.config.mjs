export default {
  plugins: {
    "@tailwindcss/postcss": {},
    "postcss-preset-env": {
      stage: 2,
      autoprefixer: true,
      features: {
        // 颜色函数
        // Preserve modern syntax while generating fallbacks when possible.
        // Note: fallbacks cannot be computed when values depend on CSS variables.
        "oklab-function": { preserve: true },
        "color-function": { preserve: true },

        // 布局/兼容性兜底
        "logical-properties-and-values": true,
        "gap-properties": true,
      },
    },
  },
};
