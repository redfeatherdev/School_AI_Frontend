import React from 'react';
import { Link } from 'react-router-dom';

const ResponsiveMenu = ({ show, onClose }: {
  show: boolean,
  onClose: () => void
}) => {
  var elements = document.querySelectorAll('.popup-mobile-menu .has-droupdown > a');
  var elementsTwo = document.querySelectorAll('.popup-mobile-menu .with-megamenu > a');
  for (var i in elements) {
    if (elements.hasOwnProperty(i)) {
      (elements[i] as HTMLElement).onclick = function () {
        const target = this as HTMLElement;
        target.parentElement?.querySelector('.submenu')?.classList.toggle('active');
        target.classList.toggle('open');
      }
    }
  }

  for (var j in elementsTwo) {
    if (elementsTwo.hasOwnProperty(j)) {
      (elementsTwo[j] as HTMLElement).onclick = (event) => {
        const target = event.currentTarget as HTMLElement;
        target.parentElement?.querySelector('.rn-megamenu')?.classList.toggle('active');
        target.classList.toggle('open');
      }
    }
  }

  return (
    <>
      <div className={`popup-mobile-menu ${show ? 'active' : ''}`}>
        <div className="inner">
          <div className="header-top">
            <div className="logo">
              <Link to='/'>
                <img src="/images/logo/logo.png" alt="Main Logo" />
              </Link>
            </div>
            <div className="close-menu">
              <button className="close-button" onClick={onClose}>
                <i className="ri-close-line"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResponsiveMenu;