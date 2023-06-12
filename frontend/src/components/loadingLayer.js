import React, { useContext } from 'react'
import '../style/loadingLayer.css'
import Context from './app_context'

const LoadingLayer = () => {

    const ctx = useContext(Context);

    return (
        <div className={`loadingLayer${ctx.isModal?'--modal':''}`}>
        {/* <div className={`loadingLayer`}> */}
            <div className="loadingLayer__motion">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default LoadingLayer;