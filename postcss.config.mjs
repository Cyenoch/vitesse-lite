export default {
  plugins: {
    "@tailwindcss/postcss": {},
    "postcss-preset-env": {
      stage: 3,
      autoprefixer: true,
      features: {
        // 布局/兼容性兜底
        "logical-properties-and-values": true,
        "gap-properties": true,
      },
    },
  },
};
