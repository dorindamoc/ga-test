import { WebProductPage } from '@components/WebProductPage'
import * as React from 'react'
import { createRoot } from 'react-dom/client'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

const container = document.getElementById('app')
const root = createRoot(container!)

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<WebProductPage />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
)
