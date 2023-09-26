import '../styles/globals.css'
import { AuthProvider } from '../contexts/AuthContext'
import { useRouter } from 'next/router'
import Layout from '../components/layout.jsx'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from '../utils/theme'
import loginTheme from '../utils/loginTheme'

const noAuthRequired = ['/', '/signup']

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  return (
    <AuthProvider>
      {noAuthRequired.includes(router.pathname) ? (
        <ThemeProvider theme={loginTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      ) : (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      )}
    </AuthProvider>
  )
}
export default MyApp
