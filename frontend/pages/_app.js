import '../styles/globals.css'
import { AuthProvider } from '../contexts/AuthContext'
import { useRouter } from 'next/router'
import Layout from '../components/layout.jsx'

const noAuthRequired = ['/', '/signup']

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  return (
    <AuthProvider>
      {noAuthRequired.includes(router.pathname) ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </AuthProvider>
  )
}
export default MyApp
