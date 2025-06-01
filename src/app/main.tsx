import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { MainPage } from '../pages'
import { ContextProvider } from '../context/context'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ContextProvider>
    <MainPage/>
    </ContextProvider>
  </StrictMode>,
)
