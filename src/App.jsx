import { BrowserRouter,Route,Routes } from 'react-router-dom'
import './App.css'
import  LandingPage from './pages/landing/LandingPage.jsx'
import LoginComponent from './components/auth/login/LoginComponent.jsx'

function App() {


  return (
 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginComponent />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
