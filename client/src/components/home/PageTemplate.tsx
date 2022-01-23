import React from 'react'
import Footer from './Footer'

const NavBar: React.FC = ({ children }) => {
  return (
    <div>
      <NavBar />
      {children}
      <Footer />
    </div>
  )
}

export default NavBar
