import { Parallax } from 'react-scroll-parallax';

const WhoWeAre = ({ wrapperClass }: {
  wrapperClass?: string
}) => {
  return (
    <div className={`home-three-about edu-about-area about-style-4 bg-color-white ${wrapperClass || 'edu-section-gapBottom'}`}>
      <div className="container animated-shape mb-40">
        <div className="row g-lg-5 g-md-5 g-sm-5">
          <div className="col-lg-12 col-xl-6">
            <div className="gallery-wrapper">
              <img src="/images/about/about-group-01.jpg" alt="About Images" />
              <div className="image-2">
                <Parallax translateY={[-25, 15]}>
                  <img src="/images/about/about-group-02.jpg" alt="About Images" />
                </Parallax>
              </div>
              <div className="image-3">
                <Parallax translateY={[-25, 15]}>
                  <img src="/images/about/about-group-03.jpg" alt="About Images" />
                </Parallax>
              </div>
            </div>
          </div>
          <div className="col-lg-12 col-xl-6">
            <div className="inner mt_mobile--40">
              <div className="section-title text-start">
                <span className="pre-title">Who We Are</span>
                <h3 className="title">We Offer The Best Carrier</h3>
              </div>
              <div className="feature-style-6 mt--40">
                <div className="edu-feature-list color-variation-1">
                  <div className="icon">
                    <img src="/images/about/student.png" alt="Icons Images" />
                  </div>
                  <div className="content">
                    <h6 className="title">Industry Expert Instructor</h6>
                    <p className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, eiusmoded tempor incididunt dolore magna aliqua.</p>
                  </div>
                </div>

                <div className="edu-feature-list color-variation-2">
                  <div className="icon">
                    <img src="/images/about/book.png" alt="Icons Images" />
                  </div>
                  <div className="content">
                    <h6 className="title">Up-to-Date Course Content</h6>
                    <p className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, eiusmoded tempor incididunt dolore magna aliqua.</p>
                  </div>
                </div>

                <div className="edu-feature-list color-variation-3">
                  <div className="icon">
                    <img src="/images/about/rewards.png" alt="Icons Images" />
                  </div>
                  <div className="content">
                    <h6 className="title">Biggest Student Community</h6>
                    <p className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, eiusmoded tempor incididunt dolore magna aliqua.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhoWeAre;