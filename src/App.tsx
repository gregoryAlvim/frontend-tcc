import { Routes } from './routes'
import { GlobalStyle } from './styles/global'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import { TransactionsProvider } from './contexts/TransactionsContext'
import { AuthProvider } from './contexts/AuthContext'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <AuthProvider>
        <TransactionsProvider>
          <Routes />
        </TransactionsProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
