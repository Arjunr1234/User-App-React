import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './component/Header'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import LoginAdmin from './section/admin/Login'
import Admin from './section/admin/Admin'
import AdminCreateUser from './pages/AdminCreateUser';
import UserAuth from './middleware/UserAuth';
import AdminAuth from './middleware/AdminAuth'
import Sample from './features/authUser/sample'


function App() {
  return (
    <>
      <Router>
          <div className='container'>
          
              <Routes>
                   <Route path='/' element={ <UserAuth> <Dashboard/>  </UserAuth> }/>
                   <Route path='/login' element={<Login/>}/>
                   <Route path='/register' element={<Register/>}/>
                   <Route path='/admin' element={<LoginAdmin/>}/>
                   <Route path='/admin/home' element={ <AdminAuth> <Admin/> </AdminAuth>} />
                   <Route path='/createUser' element={<AdminCreateUser/>} />
                   <Route path='/sample' element={<Sample/>}/>
              </Routes>
          </div>
          
      </Router>
      <ToastContainer/>
    </>
  )
}

export default App
