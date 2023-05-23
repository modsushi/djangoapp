import React from 'react';
import { hot } from 'react-hot-loader/root';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";
import Home from './pages/Home';
import Welcome from './pages/Welcome';
import configureStore from './store';
import SentryBoundary from './utils/SentryBoundary';

const store = configureStore({});
const App = () => (
  <Router>

    <Routes>
    <Route exact path='/' element={<Home/>}>

    </Route>
    <Route path='/welcome' element={<Welcome/>}>
     
    </Route>
    </Routes>

  </Router>
);

export default hot(App);
