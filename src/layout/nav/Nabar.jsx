import React from 'react'
import './Navbar.scss'
import Logo from '../../assets/photo/CRYPTOFOLIO.svg'
import { Link } from 'react-router-dom'
import { Container } from '../../utils/Util'

const Nabar = () => {
  return (
    <Container>
      <nav>
        <div className="nav__logo">
            <img src={Logo} alt="" />
            <h1 className='seo_title'>CRYPTOFOLIO</h1>
        </div> 
        <select>
            <option value="">USD</option>
        </select>
        <Link className='nav__link' to='/'>WATCH LIST</Link>
      </nav>
    </Container>
  )
}

export default Nabar