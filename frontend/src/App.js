import './App.css';
import {useState} from 'react';
import LoginScreen from './components/LoginScreen';
import ChatRoom from './components/ChatRoom';

function App() {
  const [isLogged ,setIsLogged] = useState(false);
  const [userName, setUserName] = useState("")
  return (
    <div className="App">
        <div>
            {!isLogged && <LoginScreen  userName={userName} setUserName={setUserName} setIsLogged={setIsLogged} />}
            {isLogged && <ChatRoom userName={userName}/>}
        </div>
    </div>
  );
}

export default App;
