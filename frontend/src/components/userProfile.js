import React, { useContext, useState } from 'react'
import Context from './app_context'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import '../style/userProfile.css'
import MainBtn from './mainBtn';

const UserProfile = () => {

  const ctx = useContext(Context);
  const navigate = useNavigate();

  const [isDelete, setIsDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);



  const deleteAccountHandler = async () => {
    setIsLoading(true);
    const res = await axios(
      {
        method: 'DELETE',
        data: {
          username: ctx.name
        },
        withCredentials: true,
        url: 'https://stackedshelves.onrender.com/deleteAccount'
      }
    );

    if (res.data.status) {
      ctx.logout();
      navigate('/auth');
    }
    ctx.setNotifHandler({ text: res.data.message, status: res.data.status });
    setIsLoading(false);
  }

  return (
    <div className='userProfile'>
      <h1 className='userProfile__name' style={{ textAlign: "center" }}>Welcome : {ctx.name}</h1>

      {
        !isDelete
        &&
        <MainBtn className='userProfile__deleteBtn' onClick={() => setIsDelete(true)}>Delete Account</MainBtn>

      }

      {
        isDelete
        &&
        <div className='userProfile__deleteBtn'>
          <button className='userProfile__deleteBtnOk' disabled={isLoading} onClick={deleteAccountHandler}>OK</button>
          <button className='userProfile__deleteBtnNo' disabled={isLoading} onClick={() => setIsDelete(false)}>NO</button>
        </div>
      }
    </div>
  )
}

export default UserProfile