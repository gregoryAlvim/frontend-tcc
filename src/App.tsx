import { Routes } from './routes'

import { GlobalStyle } from './styles/global'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import { AuthProvider } from './contexts/auth/AuthProvider'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />

      <AuthProvider>
        <Routes />
        <ToastContainer
          closeOnClick
          theme="light"
          autoClose={3000}
          toastClassName="foo"
          limit={3}
        />
      </AuthProvider>
    </ThemeProvider>
  )
}
