import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { ModalContextProvider, ImageProvider } from '@contexts'
import { ModalRoot } from '@ui'
import store from './slices/index.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ImageProvider>
        <ModalContextProvider>
          <App />
          <ModalRoot />
        </ModalContextProvider>
      </ImageProvider>
    </Provider>
  </StrictMode>,
)
