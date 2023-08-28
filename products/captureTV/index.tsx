import * as React from 'react'
import { createRoot } from 'react-dom/client'

import { TVProductPage } from '@components/TVProductPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const container = document.getElementById('app')
const root = createRoot(container!)

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<TVProductPage />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
)
