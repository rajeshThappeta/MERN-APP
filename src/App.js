
import './App.css';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import UserProfile from './components/UserProfile'
import AdminProfile from './components/AdminProfile'
import Test from './components/Test'
import { useState,createContext } from 'react'






function App() {

  let [userLoginStatus, setUserLoginStatus] = useState('');


  const logOutUser = () => {
    localStorage.clear();
    setUserLoginStatus(false)
  }

  return (
    <BrowserRouter>
      <>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark ">
        <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nv" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>


          <div class="collapse navbar-collapse" id="nv">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
              <li className="nav-item">
                <Link to="/" className="nav-link" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">Register</Link>
              </li>

              <li className="nav-item">
                <Link to="/test" className="nav-link" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">Test</Link>
              </li>

              {
                !userLoginStatus ?
                  <li className="nav-item">
                    <Link to="/login" className="nav-link" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">Login</Link>
                  </li> :

                  <li className="nav-item">
                    <Link to="/login" className="nav-link" onClick={() => logOutUser()} data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">Logout</Link>
                  </li>
              }

            </ul>
          </div>
          </div>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
       
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login setUserLoginStatus={setUserLoginStatus} />
          </Route>
          <Route path="/test">
            <Test />
          </Route>
          <Route path="/userprofile/:username">
            <UserProfile />
          </Route>

          <Route path="/adminprofile/:username">
            <AdminProfile />
          </Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </>
    </BrowserRouter>
  );

}

export default App;
