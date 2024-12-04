import Header from "components/Home/Header";
import Banner from "components/Home/Banner";
import About from "components/Home/About";
import Category from "components/Home/Category";
import Courses from 'components/Home/Courses';
import Testominal from 'components/Home/Testominal';
import Instructor from "components/Home/Instructor";
import VideoSection from "components/Home/VideoSection";
import Blog from "components/Home/Blog";
import Footer from "components/common/Footer";

const Home = () => {
  return (
    <>
      <Header styles="header-transparent header-style" />
      <Banner />
      <About />
      <Category />
      <Courses />
      <Testominal />
      <Instructor />
      <VideoSection />
      <Blog />
      <Footer />
    </>
  )
}

export default Home;