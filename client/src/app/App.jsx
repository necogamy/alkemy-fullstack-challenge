import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';

// Components
import Dashboard from '../components/dashboard/Dashboard';
import Register from '../components/register/Register';
import Login from '../components/login/Login';

toast.configure();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  }

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/is-authenticated', {
        method: 'GET',
        headers: {
          token: localStorage.getItem('token.alkemy.challenge.app')
        }
      });

      const jsonResponse = await response.json();

      jsonResponse === 'true' ? setAuth(true)
      : setAuth(false);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    checkAuth();
  }, [])

  return (
    <Router>
      <Switch>
        <Route exact path='/login'>
          {
            !isAuthenticated ? <Login setAuth={setAuth} />
            : <Redirect to='/dashboard' />
          }
        </Route>
        <Route exact path='/register'>
          {
            !isAuthenticated ? <Register setAuth={setAuth} />
            : <Redirect to='/login'  />
          }
        </Route>
        <Route exact path='/dashboard'>
          {
            isAuthenticated ? <Dashboard setAuth={setAuth} />
            : <Redirect to='/login' />
          }
        </Route>
        <Route exact path='/'>
          <Redirect to='/login' />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
