import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "store";

import HeaderSticky from "../../common/Header/HeaderSticky";
import ResponsiveMenu from "components/common/ResponsiveMenu";
import SignIn from "components/Auth/Signin";
import SignUp from 'components/Auth/Signup';
import DropdownUser from "components/common/DropdownUser";

const Header = ({ styles }: {
  styles: string
}) => {
  const sticky = HeaderSticky(200);
  const classes = `header-default ${sticky ? 'sticky' : ''}`
  const { isAuthenticated } = useAuthStore() as { isAuthenticated: boolean };
  const [offcanvasShow, setOffcanvasShow] = useState(false);
  const [isOpenSignInModal, setIsOpenSignInModal] = useState<boolean>(false);
  const [isOpenSignUpModal, setIsOpenSignUpModal] = useState<boolean>(false);

  const onCanvasHandler = () => {
    setOffcanvasShow(prevState => !prevState);
  }

  return (
    <>
      <header className={`header header-sticky ${styles} ${classes}`}>
        <div className="row align-items-center">
          <div className="col-lg-4 col-xl-3 col-md-6 col-6">
            <div className="logo">
              <Link to="/">
                <img src="/images/logo/logo.png" alt="Main Logo" />
              </Link>
            </div>
          </div>

          <div className="col-lg-6 d-none d-xl-block">
            <nav className="mainmenu-nav d-none d-lg-block">
              <ul className="mainmenu">
                <li>
                  <Link to="#">Home</Link>
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

          <div className="col-lg-8 col-xl-3 col-md-6 col-6">
            <div className="header-right d-flex justify-content-end">
              <div className="header-menu-bar">
                <div className="quote-icon quote-user d-none d-sm-block ml--15 ml_sm--5">
                  {isAuthenticated ? <DropdownUser /> : <div className="header-auth">
                    <i className="ri-user-line"></i>
                    <div className="header-link" onClick={() => { setIsOpenSignInModal(true) }}>
                      Login
                    </div>
                    <span>/</span>
                    <div className="header-link" onClick={() => { setIsOpenSignUpModal(true) }}>
                      Register
                    </div>
                  </div>}
                </div>
                <div className="quote-icon quote-user d-block d-md-none ml--15 ml_sm--5">
                  {isAuthenticated ? <></> : <div
                    className="white-box-icon cursor-pointer"
                    onClick={() => { setIsOpenSignInModal(true) }}
                  >
                    <i className="ri-user-line"></i>
                  </div>}
                </div>
              </div>
              <div className="mobile-menu-bar ml--15 ml_sm--5 d-block d-xl-none">
                <div className="hamberger">
                  <button className="white-box-icon hamberger-button header-menu" onClick={onCanvasHandler}>
                    <i className="ri-menu-line"></i>
                  </button>
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