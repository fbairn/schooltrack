import React from 'react'
import PropTypes from 'prop-types'

const Navbar = ({ title }) => {
  return (
    <nav>
      <div className="nav-wrapper black">
        <div className="brand-logo">A+ Time Tracker</div>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
        </ul>
      </div>
    </nav>
  )
}

Navbar.defaultProps = {
  title: 'NAV'
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired
}

export default Navbar
