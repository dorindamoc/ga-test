import basicSsl from '@vitejs/plugin-basic-ssl'
import react from '@vitejs/plugin-react'
import { defineConfig, splitVendorChunkPlugin } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [
        VitePWA({
            manifest: {
                name: 'CaptureTV',
                icons: [
                    {
                        src: './assets/img/favicon.png',
                        sizes: [120, 152, 167, 180, 1024],
                        type: 'image/png',
                    },
                    {
                        src: './assets/img/favicon.png',
                        sizes: [36, 48, 72, 96, 144, 192, 512],
                        type: 'image/png',
                    },
                ],
            },
        }),
        splitVendorChunkPlugin(),
        react(),
        tsconfigPaths(),
        basicSsl(),
    ],
    server: {
        https: true,
        port: 9001,
        strictPort: true,
    },
})
