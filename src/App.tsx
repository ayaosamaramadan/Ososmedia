import { BrowserRouter,Routes , Route } from 'react-router-dom'
import './App.css'
// import Home from './components/Home'
import Login from './components/Login'

function App() {

  return (
  <>
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* <Route
      path="/"
      element={
       user ? <Home /> : <Login />
      }
      /> */}
    </Routes>
  </BrowserRouter>
  
  </>
  )
}

export default App
