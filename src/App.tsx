import { Routes } from './routes'
import Compose from './contexts/Compose'
import { GlobalStyle } from './styles/global'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import { AuthProvider } from './contexts/auth/AuthProvider'
import { IncomeProvider } from './contexts/income/IncomeProvider'
import { ExpenseProvider } from './contexts/expense/ExpenseProvider'
import { TransactionsProvider } from './contexts/transactions/TransactionsProvider'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />

      <Compose components={[AuthProvider, TransactionsProvider]}>
        <Routes />
        <ToastContainer
          closeOnClick
          theme="light"
          autoClose={3000}
          toastClassName="foo"
          limit={3}
        />
      </Compose>
    </ThemeProvider>
  )
}
