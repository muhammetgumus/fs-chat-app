import { useState, useEffect } from 'react';
import doodleLogo from '../doodle.png'
import hero from '../Hero.png';
//var doodleLogo = require("../doodle.png")
var service = require('../service/service')
const LoginScreen = () => {
    const [userName, setUserName] = useState("")

    const handleChangeInput = (event) => {
        setUserName(event.target.value)
    }

    const handleJoin = () => {
        service.handleChatJoin(userName)
    }

    return (
        <div className="login-screen" style={{ backgroundImage: `url(${hero})`, opacity: 1 }}>
            <p>LETS JOIN DOODLE CHAT</p>
            <div>
                <input
                    placeholder="Please enter username"
                    className="login-screen-input"
                    id="userNameInbox"
                    type="text"
                    onChange={(event) => { handleChangeInput(event) }} />
                <button
                    className="button"
                    onClick={handleJoin}>Join</button>
            </div>
        </div>
    )
}

export default LoginScreen;