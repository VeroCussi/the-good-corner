import { Route, Routes } from 'react-router'
import './App.css'
import { RecentAds } from './components/RecentAds'
import { Layout } from './pages/Layout'
import { About } from './pages/About'
import { AdDetails } from './components/AdDetails'
import { NewAdForm } from './pages/NewAdForm'
import { CategoryPage } from './pages/CategoryPage'
import { NewCategoryForm } from './pages/NewCategoryForm'
import { NewTagForm } from './pages/NewTagForm'

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  
  return (
    <>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<RecentAds />} />
        <Route path="about" element={<About />} />
        <Route path="ad/:id" element={<AdDetails />} />
        <Route path="ad/new" element={<NewAdForm />} />
        <Route path="/category/:id" element={<CategoryPage />} />
        <Route path="/category/new" element={<NewCategoryForm />} />
        <Route path="/tags/new" element={<NewTagForm />} />
      </Route>
    </Routes>
    <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  )
}

export default App
