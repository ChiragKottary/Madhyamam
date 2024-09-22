import {BrowserRouter,Route,Routes,Navigate} from 'react-router-dom'
import './App.css'
import {Signup} from './pages/Signup';
import {Signin} from './pages/Signin';
import {Blog} from './pages/Blog';
import { Blogs } from './pages/Blogs';
import { Publish } from './pages/Publish';
import { DropDown } from './components/AppBar';

function App() {
  const ClearLoaclStorageSignout = ()=>{
    localStorage.clear();
    return <Navigate to="/signup" replace />;
  }
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/signup" />} />
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/signin' element={<Signin/>}></Route>
      <Route path='/blogs' element={<Blogs/>}></Route>
      <Route path='/publish' element={<Publish/>}></Route>
      <Route path='/blog/:id' element={<Blog/>}></Route>
      <Route path='/dropbox' element={<DropDown/>}></Route>
      <Route path="*" element={<ClearLoaclStorageSignout/>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
