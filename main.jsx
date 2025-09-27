
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Admin from './pages/Admin.jsx'
import Teacher from './pages/Teacher.jsx'
import Student from './pages/Student.jsx'
import DemoCreds from './pages/DemoCreds.jsx'
import './styles.css'

function App(){
  return (
    <BrowserRouter>
      <nav className="topnav">
        <Link to="/">Smart Campus</Link>
        <div className="spacer" />
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/teacher" element={<Teacher/>}/>
          <Route path="/student" element={<Student/>}/>
          <Route path="/demo-creds" element={<DemoCreds/>}/>
          <Route path="*" element={<Navigate to="/" replace/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

function Home(){
  return (<div className="banner card"><div><h1>Smart Campus — VEDA-style demo</h1><p>Role-based demo: Admin / Teacher / Student. Demo credentials are private — use <a href="/demo-creds">/demo-creds</a> when presenting.</p></div></div>)
}

createRoot(document.getElementById('root')).render(<App/>)
