// vite.config.js
import { defineConfig } from "file:///G:/Other/Development/Projects/SPTProfileConnectWeb/node_modules/vite/dist/node/index.js";
import { svelte } from "file:///G:/Other/Development/Projects/SPTProfileConnectWeb/node_modules/@sveltejs/vite-plugin-svelte/src/index.js";
import path from "path";
var __vite_injected_original_dirname = "G:\\Other\\Development\\Projects\\SPTProfileConnectWeb";
var vite_config_default = defineConfig({
  plugins: [svelte()],
  server: {
    port: 3e3
  },
  resolve: {
    alias: {
      "~bootstrap": path.resolve(__vite_injected_original_dirname, "node_modules/bootstrap"),
      "@services": path.resolve(__vite_injected_original_dirname, "src/services"),
      "@stores": path.resolve(__vite_injected_original_dirname, "src/stores"),
      "@pages": path.resolve(__vite_injected_original_dirname, "src/pages"),
      "@lib": path.resolve(__vite_injected_original_dirname, "src/lib"),
      "@utils": path.resolve(__vite_injected_original_dirname, "src/utilities")
    }
  },
  envDir: "./",
  define: {
    "APP_VERSION": JSON.stringify(process.env.npm_package_version)
  }
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `@import './src/scss/custom-bootstrap.scss';`
  //     }
  //   }
  // }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJHOlxcXFxPdGhlclxcXFxEZXZlbG9wbWVudFxcXFxQcm9qZWN0c1xcXFxTUFRQcm9maWxlQ29ubmVjdFdlYlwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRzpcXFxcT3RoZXJcXFxcRGV2ZWxvcG1lbnRcXFxcUHJvamVjdHNcXFxcU1BUUHJvZmlsZUNvbm5lY3RXZWJcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0c6L090aGVyL0RldmVsb3BtZW50L1Byb2plY3RzL1NQVFByb2ZpbGVDb25uZWN0V2ViL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHsgc3ZlbHRlIH0gZnJvbSAnQHN2ZWx0ZWpzL3ZpdGUtcGx1Z2luLXN2ZWx0ZSdcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtzdmVsdGUoKV0sXHJcbiAgc2VydmVyOiB7XHJcbiAgICBwb3J0OiAzMDAwLFxyXG4gIH0sXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgJ35ib290c3RyYXAnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnbm9kZV9tb2R1bGVzL2Jvb3RzdHJhcCcpLFxyXG4gICAgICAnQHNlcnZpY2VzJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9zZXJ2aWNlcycpLFxyXG4gICAgICAnQHN0b3Jlcyc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvc3RvcmVzJyksXHJcbiAgICAgICdAcGFnZXMnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3BhZ2VzJyksXHJcbiAgICAgICdAbGliJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9saWInKSxcclxuICAgICAgJ0B1dGlscyc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvdXRpbGl0aWVzJyksXHJcbiAgICB9XHJcbiAgfSxcclxuICBlbnZEaXI6ICcuLycsXHJcbiAgICBkZWZpbmU6IHtcclxuICAgICdBUFBfVkVSU0lPTic6IEpTT04uc3RyaW5naWZ5KHByb2Nlc3MuZW52Lm5wbV9wYWNrYWdlX3ZlcnNpb24pLFxyXG4gIH0sXHJcbiAgLy8gY3NzOiB7XHJcbiAgLy8gICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XHJcbiAgLy8gICAgIHNjc3M6IHtcclxuICAvLyAgICAgICBhZGRpdGlvbmFsRGF0YTogYEBpbXBvcnQgJy4vc3JjL3Njc3MvY3VzdG9tLWJvb3RzdHJhcC5zY3NzJztgXHJcbiAgLy8gICAgIH1cclxuICAvLyAgIH1cclxuICAvLyB9XHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBa1YsU0FBUyxvQkFBb0I7QUFDL1csU0FBUyxjQUFjO0FBQ3ZCLE9BQU8sVUFBVTtBQUZqQixJQUFNLG1DQUFtQztBQUt6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsT0FBTyxDQUFDO0FBQUEsRUFDbEIsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLGNBQWMsS0FBSyxRQUFRLGtDQUFXLHdCQUF3QjtBQUFBLE1BQzlELGFBQWEsS0FBSyxRQUFRLGtDQUFXLGNBQWM7QUFBQSxNQUNuRCxXQUFXLEtBQUssUUFBUSxrQ0FBVyxZQUFZO0FBQUEsTUFDL0MsVUFBVSxLQUFLLFFBQVEsa0NBQVcsV0FBVztBQUFBLE1BQzdDLFFBQVEsS0FBSyxRQUFRLGtDQUFXLFNBQVM7QUFBQSxNQUN6QyxVQUFVLEtBQUssUUFBUSxrQ0FBVyxlQUFlO0FBQUEsSUFDbkQ7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsRUFDTixRQUFRO0FBQUEsSUFDUixlQUFlLEtBQUssVUFBVSxRQUFRLElBQUksbUJBQW1CO0FBQUEsRUFDL0Q7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVFGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
