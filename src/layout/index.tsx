import Header from "components/common/Header";
import Footer from "components/common/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <main className="main-wrapper">
        <Header />
        <Outlet />
        <Footer />
      </main>
    </>
  )
}

export default Layout;