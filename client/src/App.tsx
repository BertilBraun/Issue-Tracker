import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import PageTemplate from './components/home/PageTemplate'
import Home from './pages/Home'
import Login from './pages/Login'
import Project from './pages/Project'
import SignUp from './pages/SignUp'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <PageTemplate>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/project/:projectId" element={<Project />} />
        </Routes>
      </PageTemplate>
    </BrowserRouter>
  )
}

export default App
