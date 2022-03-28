//import logo from './logo.svg';
import  { useState } from 'react'; //importing usestate hook
import './App.css';
import MainMint from './MainMint';
import NavBar from './NavBar';  


function App() {
  const [accounts,setAccounts] = useState([]);// anytime these variables change react will know how to render
  return (
    <div className = "overlay">
      <div className="App">

        <NavBar accounts={accounts} setAccounts={setAccounts} />
        <MainMint accounts={accounts} setAccounts={setAccounts} />
  
      </div>
      <div className="movingbackground"></div>
    </div>
  );
}

export default App;
