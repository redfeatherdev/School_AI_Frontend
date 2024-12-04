import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';
import { Toaster } from 'sonner';
import ScrollToTop from 'utils/ScrollToTop';
import App from 'App';
import 'tailwindcss/tailwind.css';
import './index.css';
import './assets/scss/style.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Toaster position='top-center' />
    <Router>
      <ScrollToTop>
        <ParallaxProvider>
          <App />
        </ParallaxProvider>
      </ScrollToTop>
    </Router>
  </React.StrictMode>
);
