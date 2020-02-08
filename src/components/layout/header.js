import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `rebeccapurple`,
      display: `flex`,
      flex: 1,
      justifyContent: `space-between`,
      margin: `0 auto`,
      maxWidth: 960,
      padding: `1.45rem 1.0875rem`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
    <p className='gMoleTag'>Digging up the latest videogame news</p>
    <div style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
      className='homeCorner'>
        <a href='https://edwardcheever.herokuapp.com' target='_blank' rel='noopener noreferrer'><i className='fas headMenu fa-home'></i></a>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
