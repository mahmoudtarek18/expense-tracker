import { Routes, Route } from 'react-router-dom'
import './App.css'

import CreateCategory from './components/category/CreateCategory'
import MainLayout from './components/MainLayout'
import Header from './components/Header'
import Charts from './components/expenses/Charts'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route element={<MainLayout />} path="/"></Route>
        <Route element={<CreateCategory />} path="/add-category"></Route>
        <Route element={<Charts />} path="/charts"></Route>
      </Routes>
    </>
  )
}

export default App
