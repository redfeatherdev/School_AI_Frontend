import React from 'react';
import Item from './Item';
import SectionTitle from '../../common/SectionTitle';

const Category = () => {
  return (

    <div className="home-one-cat edu-service-area service-wrapper-1 edu-section-gap bg-image">
      <div className="container animated-shape">
        <div className="row">
          <div className="col-lg-12">
            <SectionTitle
              classes="text-center"
              slogan="Course Categories"
              title="Popular Topics To Learn"
            />
          </div>
        </div>

        <Item />

        <div className="shape-dot-wrapper shape-wrapper d-xl-block d-none">
          <div className="shape-image shape-image-1">
            <img src="/images/shapes/shape-03-01.png" alt="Shape Thumb" />
          </div>
          <div className="shape-image shape-image-2">
            <img src="/images/shapes/shape-08.png" alt="Shape Thumb" />
          </div>
          <div className="shape-image shape-image-3">
            <img src="/images/shapes/shape-04-01.png" alt="Shape Thumb" />
          </div>
          <div className="shape-image shape-image-4">
            <img src="/images/shapes/shape-03-02.png" alt="Shape Thumb" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Category;