import { defineConfig } from 'cypress'
import vitePreprocessor from 'cypress-vite'
import { resolve } from 'path'

export default defineConfig({
    e2e: {
        setupNodeEvents(on) {
            on(
                'file:preprocessor',
                vitePreprocessor(resolve(__dirname, './vite.config.ts')),
            ),
            on(
                'task', {
                log: (message) => {
                    console.log(message)
                    return null
                },
              }
            )
        },
        baseUrl: 'https://localhost:9000',
        chromeWebSecurity: false,
        specPattern: ['./cypress/e2e/**/*.spec.ts', './cypress/e2e/*.cy.ts'],
        videoUploadOnPasses: false,
        video: false,
        screenshotsFolder: 'cypress/screenshots',
        retries: {
            runMode: 2,
            openMode: 0,
        },
    },

    component: {
        devServer: {
            framework: 'react',
            bundler: 'vite',
        },
    },
})
