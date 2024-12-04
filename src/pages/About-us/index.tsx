import SEO from "components/common/SEO";
import Breadcrumb from "components/common/Breadcrumb";
import WhoWeAre from "components/About/WhoWeAre";
import Progress from "components/About/Progress";
import Mission from "components/About/Mission";
import Instructor from "components/About/Instructor";
import CounterUpOne from "components/About/CounterUpOne";
import TestominalSection from "components/About/TestominalSection";

const AboutUs = () => {
  return (
    <>
      <SEO title="About Us" />
      <Breadcrumb
        title="About Us"
        rootUrl="/"
        parentUrl="Home"
        currentUrl="About Us"
      />
      <WhoWeAre wrapperClass="edu-section-gapTop" />
      <Progress />
      <Mission />
      <Instructor />
      <CounterUpOne />
      <TestominalSection classes="counterup-overlay-top" />
    </>
  )
}

export default AboutUs;