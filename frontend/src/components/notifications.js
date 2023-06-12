import React, { useContext } from 'react'
import Context from './app_context';
import '../style/notification.css'

const Notification = () => {

    const ctx = useContext(Context);
    return (
        <>
            {
                ctx.isNotif
                &&
                <p className={`notification${ctx.isModal?'--modal':''}`} style={{
                    backgroundColor: ctx.notification.status ? '#54b96e' : '#e75555'
                }}> {ctx.notification.text}</p >
            }
        </>
    )
}

export default Notification;