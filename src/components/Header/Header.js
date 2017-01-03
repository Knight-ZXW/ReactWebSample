import React from 'react'
import {IndexLink, Link} from 'react-router'
import './Header.scss'

export const Header = () => (

  <div className="navbar navbar-default">
    <div className="navbar-header">
      <button className="navbar-togle" type="button " data-toggle="collapse"></button>
    </div>
  </div>
  // <div>
  //   <h1>why no ff</h1>
  //   <IndexLink to='/' activeClassName='route--active'>
  //     Home
  //   </IndexLink>
  //   {' · '}
  //   <Link to='/counter' activeClassName='route--active'>
  //     Counter
  //   </Link>
  // </div>
)

export default Header
