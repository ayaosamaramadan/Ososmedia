import { BrowserRouter,Routes , Route } from 'react-router-dom'
import './App.css'
// import Home from './components/Home'
import Login from './components/Login'
import { store } from './store/store'
import { Provider } from 'react-redux'

function App() {

  return (
  <>
   <Provider store={store}>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      {/* <Route
      path="/"
      element={
       user ? <Home /> : <Login />
      }
      /> */}
    </Routes>
  </BrowserRouter></Provider>
  
  </>
  )
}

export default App
