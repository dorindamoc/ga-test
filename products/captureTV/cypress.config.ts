import { defineConfig } from 'cypress'
import vitePreprocessor from 'cypress-vite'
import { resolve } from 'path'

export default defineConfig({
    e2e: {
        setupNodeEvents(on) {
            on(
                'file:preprocessor',
                vitePreprocessor(resolve(__dirname, './vite.config.ts')),
            )
        },
        baseUrl: 'https://localhost:9001',
        chromeWebSecurity: false,
        specPattern: ['./cypress/e2e/**/*.spec.ts', './cypress/e2e/*.cy.ts'],
        videoUploadOnPasses: false,
        video: false,
        screenshotsFolder: 'cypress/screenshots',
    },

    component: {
        devServer: {
            framework: 'react',
            bundler: 'vite',
        },
    },
})
