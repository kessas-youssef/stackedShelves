import React from 'react'
import Header from '../components/header'

function ErrorPage({keyWord}) {
  return (
    <>
        <Header/>
        <h1 style={{margin: '100px auto', width:'20%'}}>{keyWord} Not Found ! 😞</h1>
    </>
  )
}

export default ErrorPage