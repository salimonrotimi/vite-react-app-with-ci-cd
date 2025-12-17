import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Toaster} from "react-hot-toast";
import { GeneralContextProvider } from './context/general-context';
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import HomePage from './pages/home-page';
import LoginPage from './pages/login-page';
import DashboardPage from './pages/dashboard-page';
import ProtectedRoute from './components/protected-route';

// The app is created with "Vite" using the following steps.
// 1. Run "npx create-vite ."
// 2. Select "React" as the preferred framework and "JavaScript" as the preferred language variant
// 3. Type "yes" under the section  "Install with npm and start now".
// 4. Install other dependencies such as "react-router-dom" and "react-hot-toast" with "npm install"

function App() {
  
  return (
    <GeneralContextProvider>
      <BrowserRouter>
        <Navbar />

        {/* The Component or element are from "pages" folder */}
        <div className='main-body'>
          <Toaster position="top-center" reverseOrder={false}/>

          <Routes>
            <Route path='/' element={<HomePage/>}/>

            <Route path='/login' element={<LoginPage/>}/>

            <Route path='/dashboard' element={
              <ProtectedRoute>
                <DashboardPage/>
              </ProtectedRoute>}
            />
          </Routes>
        </div>
        
        <Footer />
      </BrowserRouter>
    </GeneralContextProvider>
    
  )
}

export default App
