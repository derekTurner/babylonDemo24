// vite.config.ts
import { defineConfig } from 'vite'
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';

export default defineConfig(({ command }) => {
  if (command === 'build') {
    return {
      build: {
        rollupOptions: {
          output: {
            manualChunks: {
              '@babylonjs/core': ['@babylonjs/core']
            }
          }
        }
      },
      plugins: [
        chunkSplitPlugin()
      ]
    }
  }
  return {}
})
  

