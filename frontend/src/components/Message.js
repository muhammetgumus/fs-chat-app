const Message = (data) => {
    const message=data.data
    const style = {
        "text-align": "left",
        "display": "grid",
        "width": "90%",
        "margin": "auto"
    }
    const styleWrap = {
        display: "inline-flex",
        width: "80%",
        "box-shadow": "0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%)",
        "margin": "40px",
        "margin-bottom": "5px"
    }
    const infoStyle = {
        "margin": "0px",
        "opacity": 0.5
    }
    const contentStyle = {
        "margin": "0px",
        "padding": "20px",
        "word-wrap": "break-word"
    }

    return (
        <div style={styleWrap}>
            <div className="chat-room-pp"><p>{message.messageOwner.substring(0, 1).toUpperCase()}</p></div>
            <div style={style}>
                <p style={infoStyle}>{message.messageOwner}</p>
                <p style={contentStyle}>{message.content}</p>
                <p style={infoStyle}>{message.date}</p>
            </div>
        </div>

    )

}
export default Message;