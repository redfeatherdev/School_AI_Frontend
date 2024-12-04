import { Link } from "react-router-dom";
import { useState } from "react";

import HeaderSticky from "./HeaderSticky";
import ResponsiveMenu from "../ResponsiveMenu";
import SignIn from "components/Auth/Signin";
import SignUp from "components/Auth/Signup";
import DropdownUser from "../DropdownUser";
import { useAuthStore } from "store";

const Header = () => {
  const sticky = HeaderSticky(118);
  const classes = sticky ? 'sticky' : '';
  const [offcanvasShow, setOffcanvasShow] = useState(false);
  const { isAuthenticated } = useAuthStore() as { isAuthenticated: boolean };
  const [isOpenSignInModal, setIsOpenSignInModal] = useState<boolean>(false);
  const [isOpenSignUpModal, setIsOpenSignUpModal] = useState<boolean>(false);

  const onCanvasHandler = () => {
    setOffcanvasShow(prevState => !prevState);
  }

  return (
    <>
      <header className={`header disable-transparent header-sticky  ${classes || ''}`}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-xl-2 col-md-6 col-6">
              <div className="logo">
                <Link to={"/"}>
                  <img className="logo-light" src="/images/logo/logo.png" alt="Main Logo" />
                </Link>
              </div>
            </div>

            <div className="col-lg-8 d-none d-xl-block">
              <nav className="mainmenu-nav d-none d-lg-block">
                <ul className="mainmenu">
                  <li>
                    <Link to="/">Home</Link>
                  </li>

                  <li>
                    <Link to="/about-us">About</Link>
                  </li>

                  <li>
                    <Link to="/course">Courses</Link>
                  </li>

                  <li><Link to="#">Blog</Link>
                  </li>

                  <li>
                    <Link to="/contact">Contact</Link>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="col-lg-6 col-xl-2 col-md-6 col-6">
              <div className="header-right d-flex justify-content-end">
                <div className="header-quote">
                  <div className="quote-user hidden md:block">
                    {isAuthenticated ? <DropdownUser /> : <div className="flex items-center gap-[10px] text-black">
                      <i className="ri-user-line"></i>
                      <div className="cursor-pointer hover:text-primary" onClick={() => { setIsOpenSignInModal(true) }}>
                        Login
                      </div>
                      <span>/</span>
                      <div className="cursor-pointer hover:text-primary" onClick={() => { setIsOpenSignUpModal(true) }}>
                        Register
                      </div>
                    </div>}
                  </div>
                  <div className="quote-icon quote-user d-block d-md-none ml--15 ml_sm--5">
                    {isAuthenticated ? <></> : <button className="hamberger-button" onClick={() => setIsOpenSignInModal(true)}>
                      <i className="ri-user-line"></i>
                    </button>}
                  </div>
                  <div className="hamberger quote-icon d-block d-xl-none">
                    <button className="hamberger-button" onClick={onCanvasHandler}>
                      <i className="ri-menu-line"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <ResponsiveMenu
        show={offcanvasShow}
        onClose={onCanvasHandler}
      />
      <SignIn
        isOpen={isOpenSignInModal}
        onClose={() => { setIsOpenSignInModal(false) }}
        moveToSignUp={() => {
          setIsOpenSignInModal(false);
          setIsOpenSignUpModal(true);
        }}
      />
      <SignUp
        isOpen={isOpenSignUpModal}
        onClose={() => { setIsOpenSignUpModal(false) }}
        moveToSignIn={() => {
          setIsOpenSignInModal(true);
          setIsOpenSignUpModal(false);
        }}
      />
    </>
  )
}

export default Header;