import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Auth from "./components/Auth/Auth";
import { store, type RootState } from "./store/store";
import { Provider, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import Home from "./components/Home";
import OthersProfile from "./components/OthersProfile";
import FriendsRequestsList from "./components/FriendsRequestsList";

function AppRoutes() {
  const isAuth = useSelector(
    (state: RootState) => state.social.isAuthenticated
  );

  return (
    <BrowserRouter>
      <Routes>
       <Route
          path="/"
          element={isAuth ? <Navigate to="/home" replace /> : <Auth />}
        />
 <Route
          path="/home"
          element={isAuth ? <Home /> : <Navigate to="/" replace />}
        />

<Route path="/user/:id" element={isAuth ? <OthersProfile /> : <Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/friend-requests" element={<FriendsRequestsList />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <>
      <Provider store={store}>
        <Toaster
          position="top-center"
          reverseOrder={true}
          toastOptions={{
            style: {
              margin: "40px",
              background: "#363636",
              color: "#fff",
            },
          }}
        />
        <AppRoutes />
      </Provider>
    </>
  );
}

export default App;
