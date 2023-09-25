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
                on('task', {
                    log: (message) => {
                        console.log(message)
                        return null
                    },
                })
        },
        baseUrl: 'http://0.0.0.0:3000',
        chromeWebSecurity: false,
        specPattern: [
            'products/captureWeb/cypress/e2e/**/*.spec.ts',
            'products/captureWeb/cypress/e2e/*.cy.ts',
        ],
        videoUploadOnPasses: false,
        video: false,
        screenshotsFolder: 'cypress/screenshots',
        retries: {
            runMode: 2,
            openMode: 0,
        },
        supportFile: 'products/captureWeb/cypress/support/e2e.ts',
    },

    component: {
        devServer: {
            framework: 'react',
            bundler: 'vite',
        },
    },
})
