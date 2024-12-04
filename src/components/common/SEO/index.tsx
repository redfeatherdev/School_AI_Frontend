import PropTypes from 'prop-types';
import React from 'react'


const SEO = ({ title }: {
  title: string
}) => {
  return (
    <>
      <meta charSet="utf-8" />
      <title>{title} || School AI - Online Learning and Education</title>
      <meta name="robots" content="noindex, follow" />
      <meta name="description" content="School AI – Online Learning and Education" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    </>
  )
}
SEO.propTypes = {
  title: PropTypes.string
};

export default SEO;