import Footer from './footer.jsx'
import Header from './header.jsx'
import Navbar from './navbar.jsx'

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="content">
        <Navbar />
        {children}
      </div>
      <Footer />
    </>
  )
}

export default Layout