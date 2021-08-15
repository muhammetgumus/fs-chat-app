import Message from './Message'
import { useState, useEffect } from 'react'
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'


const ChatRoom = ({ userName }) => {
    const [messages, setMessages] = useState([])
    const [textAreaValue, setTextAreaValue] = useState("")
    const [isErrorOccured, setIsErrorOccured] = useState(false)

    let msgRef = messages

    useEffect(() => {
        connectChat()
    }, [isErrorOccured])


    var wsUrl = "/chatWs"
    var socket = new SockJS(wsUrl)
    var stompClient = stompClient = Stomp.over(socket);

    const connectChat = async () => {

        if (userName) {
            await stompClient.connect({}, onConnected, onError)
        }
    }

    const onConnected = () => {
        stompClient.subscribe("/chatTopic/general", onMessageIncome)
        if (isErrorOccured) {
            setIsErrorOccured(false)
        }
    }

    const onMessageIncome = (recievedPayload) => {

        var payload = JSON.parse(recievedPayload.body)
        msgRef = msgRef.concat(payload);
        setMessages(msgRef)
        scrollBottom()
    }

    const onError = (error) => {
        setIsErrorOccured(true)
        connectChat()
        console.log(error)
    }

    const sendMessage = async (e) => {
        try {
            if (stompClient == null) {
                await connectChat()
            }
            if (stompClient && textAreaValue.length > 0) {
                var chatMessage = {
                    messageOwner: userName,
                    content: textAreaValue,
                    date: new Date().toLocaleString()
                };

                await stompClient.send("/api/chat.sendMessage", {}, JSON.stringify(chatMessage));
                setTextAreaValue("")
                clearInputArea()
            }
        } catch (e) {
            console.log(e)
            setIsErrorOccured(true)
        }
    }

    const handleTextAreaChange = (event) => {
        setTextAreaValue(event.target.value.trim())
    }

    const scrollBottom = () => {
        var chatDiv = document.getElementById("chatDiv")
        chatDiv.scrollTop = chatDiv.scrollHeight

    }
    const clearInputArea = () => { document.getElementById("inputArea").value = "" }

    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            sendMessage()
        }
    }

    const inputWrapperStyle = {
        "display": "inline-flex",
        "width": "80%",
    }
    const inputStyle = {
        "width": "100%",
        "height": "100px",
        "margin-top": "10px",
        "display": "flex"
    }
    const buttonStyle = {
        "display": "block",
        "width": "auto",
        "margin-top": "10px",
        "flex": "1",
        "margin-right": "15px",
        "margin-bottom": "0px"
    }

    return (
        <div>
            {!isErrorOccured && <div id="chatDiv" className="chat-room">{
                messages.map((data) => {
                    return (<Message data={data} />)
                })
            }
            </div>
            }
            {isErrorOccured && <div><p>Error occured while connecting to the server</p></div>}
            <div style={inputWrapperStyle}>
                <input className="inputArea" id="inputArea" onKeyDown={(e) => handleKeyDown(e)} onChange={(e) => { handleTextAreaChange(e) }} type="text" style={inputStyle} />
                <button
                    className="button-send"
                    style={buttonStyle}
                    onClick={(e) => { sendMessage(e); return setTextAreaValue("") }}>Send</button>
            </div>
        </div>
    )
}
export default ChatRoom;