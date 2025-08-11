import React from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Upload from './pages/Upload'
import Dashboard from './pages/Dashboard'
import Billing from './pages/Billing'
export default function App(){
  return (
    React.createElement('div', {className: 'app'},
      React.createElement('nav', null,
        React.createElement(Link, {to: '/'}, 'Home'), ' | ',
        React.createElement(Link, {to: '/upload'}, 'Upload Logs'), ' | ',
        React.createElement(Link, {to: '/dashboard'}, 'Dashboard'), ' | ',
        React.createElement(Link, {to: '/billing'}, 'Billing'), ' | ',
        React.createElement(Link, {to: '/login'}, 'Login')
      ),
      React.createElement(Routes, null,
        React.createElement(Route, {path: '/', element: React.createElement('div', null, 'Welcome to LogShield')}),
        React.createElement(Route, {path: '/login', element: React.createElement(Login)}),
        React.createElement(Route, {path: '/signup', element: React.createElement(Signup)}),
        React.createElement(Route, {path: '/upload', element: React.createElement(Upload)}),
        React.createElement(Route, {path: '/dashboard', element: React.createElement(Dashboard)}),
        React.createElement(Route, {path: '/billing', element: React.createElement(Billing)})
      )
    )
  )
}
