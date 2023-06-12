import React, {useContext, useEffect} from 'react'
import UserProfile from '../components/userProfile'
import UserBooks from '../components/userBooks'
import { useNavigate } from 'react-router-dom';
import Context from '../components/app_context';

const ProfilePage = () => {
    const ctx = useContext(Context);
    const navigate = useNavigate();
  
    useEffect(() => {
      if (!ctx.isLogin) {
        navigate('/auth/login'); // Redirect to signin page if not logged in
      }
    }, [ctx.isLogin, navigate]);

    return (
        <>
            <UserProfile />
            <UserBooks />
        </>
    )
}

export default ProfilePage;