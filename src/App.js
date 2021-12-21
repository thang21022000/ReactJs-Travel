import './Responsive.css';
import './App.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dangky from './components/Dangky';
import DangNhap from './components/DangNhap';
import Home from './components/Home';
import Account from './components/Account';
import AllHotels from './components/AllHotels';
import HotelDetail from './components/HotelDetail';
import React, {} from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Router>
          <Navbar />
            <Switch>
              <Route  path="/allhotels" component={AllHotels} />
              <Route  path="/hotels/:id" component={HotelDetail} />          
              <Route  path="/dangnhap" component={DangNhap} />          
              <Route  path="/dangky" component={Dangky} />
              <Route path="/account" component={Account}/>         
              <Route  path="/" exact component={Home} />         
            </Switch>
          <Footer />
        </Router>
    </div>
  );
}

export default App;
