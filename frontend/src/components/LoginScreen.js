import hero from '../Hero.png';

const LoginScreen = ({setIsLogged,userName,setUserName}) => {
    
    const handleChangeInput = (event) => {
        setUserName(event.target.value)
    }

    const handleJoin = () => {
        if(userName.length>0){  
            setIsLogged(true)
        }
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