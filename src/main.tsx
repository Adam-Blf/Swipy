import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ToastProvider, InstallPrompt } from '@/components/molecules'
import { router } from './router'
import './index.css'

// Register service worker
import { registerSW } from 'virtual:pwa-register'

registerSW({
  onNeedRefresh() {
    // Show a toast or notification that new content is available
    console.log('New content available, please refresh.')
  },
  onOfflineReady() {
    console.log('App ready to work offline')
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <RouterProvider router={router} />
      <InstallPrompt />
    </ToastProvider>
  </StrictMode>
)
