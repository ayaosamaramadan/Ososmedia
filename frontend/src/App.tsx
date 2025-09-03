import { BrowserRouter,Routes , Route } from 'react-router-dom'
import './App.css'
// import Home from './components/Home'
import Auth from './components/Auth'
import { store } from './store/store'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast';


// import Login from './components/Login'

function App() {

  return (
  <>
   <Provider store={store}>
<Toaster
  position="top-center"
  reverseOrder={true}
  toastOptions={{
    style: {
      margin: '40px',
      background: '#363636',
      color: '#fff',
    },
  }}
/>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Auth />} />
      {/* <Route
      path="/"
      element={
       user ? <Home /> : <Login />
      }
      /> */}
    </Routes>
  </BrowserRouter>
  </Provider>
  
  </>
  )
}

export default App
