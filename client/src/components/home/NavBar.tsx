import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const NavBar: React.FC = () => {
  return (
    <div>
      <h1>NavBar</h1>

      <nav>
        <Link to="/">Home</Link>
      </nav>

      <Button>Login</Button>
    </div>
  )
}

export default NavBar
