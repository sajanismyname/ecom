import { useState } from 'react'
import {Route, Routes} from "react-router"
import  Navbar  from './components/Navbar'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import ProfilePage from './pages/ProfilePage'
import CreatePage from './pages/CreatePage'
import EditPage from './EditPage'


function App() {


  return (
    <div>
      <Navbar/>
      <main>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/edit/:id" element={<EditPage />} />

        </Routes>
      </main>
    </div>

    
  )
}

export default App
