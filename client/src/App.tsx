import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/home/Footer'
import NavBar from './components/home/NavBar'
import Home from './pages/Home'
import Login from './pages/Login'
import Project from './pages/Project'
import SignUp from './pages/SignUp'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/project/:projectId" element={<Project />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
