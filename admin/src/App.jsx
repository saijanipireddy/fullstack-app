import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import {Routes,Route} from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Order from './pages/Order/Order'

import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" Component={Add} />
          <Route path="/list" Component={List} />
          <Route path="/order" Component={Order} />
        </Routes>
      </div>
    </div>
  )
}

export default App
