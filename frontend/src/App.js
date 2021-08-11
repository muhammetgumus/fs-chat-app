import logo from './logo.svg';
import './App.css';
import {useState,useEffect } from 'react';
import LoginScreen from './components/LoginScreen';

function App() {
  const [data,setData]= useState(null);

  return (
    <div className="App">
        <div>
            <LoginScreen/>
        </div>
    </div>
  );
}

export default App;
