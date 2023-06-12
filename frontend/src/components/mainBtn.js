import React from 'react'
import '../style/mainBtn.css'

const MainBtn = ({onClick,disabled = false, children}) => {
  return (
    <button onClick={onClick} disabled={disabled} type="button" className="mainBtn mainBtn--yellow">
	<span className="mainBtn__txt">{children}</span>
	<i className="mainBtn__bg" aria-hidden="true"></i>
	<i className="mainBtn__bg" aria-hidden="true"></i>
	<i className="mainBtn__bg" aria-hidden="true"></i>
	<i className="mainBtn__bg" aria-hidden="true"></i>
</button>
  )
}

export default MainBtn;