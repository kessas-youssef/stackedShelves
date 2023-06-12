import "../style/header.css";
import logo from "../img/Stacked Shelves Noir.svg"
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useContext, useState } from "react";
import Context from "./app_context";
import LoadingLayer from './loadingLayer'
import axios from "axios";

const Header = ({ activeBtn }) => {

  const ctx = useContext(Context);

  const navigate = useNavigate();

  const [authIconHover, setAuthIconHover] = useState(false);
  const [logoutIconHover, setLogoutIconHover] = useState(false);
  const [profileIconHover, setProfileIconHover] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const authIcon = authIconHover ? <FontAwesomeIcon icon={icon({ name: 'door-open' })} /> : <FontAwesomeIcon icon={icon({ name: 'door-closed' })} />

  const logoutIcon = logoutIconHover ? <FontAwesomeIcon icon={icon({ name: 'right-from-bracket' })} /> : <FontAwesomeIcon icon={icon({ name: 'arrow-right-from-bracket' })} />

  const profileIcon = profileIconHover ? <FontAwesomeIcon icon={icon({ name: 'user', style: 'solid' })} /> : <FontAwesomeIcon icon={icon({ name: 'user', style: 'regular' })} />

  const logoutHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await axios({
      method: "POST",
      data: {
        username: ctx.name,
      },
      withCredentials: true,
      url: `http://localhost:4000/logout`
    })

    ctx.logout()
    navigate('/auth');
    ctx.setNotifHandler({ text: res.data.message, status: res.data.status })
    setIsLoading(false);
  }


  if (!activeBtn)
    activeBtn = '';


  return (
    <>
      <header className="header">
        <Link to={'/'} className="header__logoContainer">
          <img className="header__logo" src={logo} alt="logo" />
          <h3 className="header__logoName">Stacked Shelves</h3>
        </Link>
        <nav className="header__navBar">
          <NavLink to='/home' className={({ isActive }) => isActive ? 'header__navLink header__navLink--active' : 'header__navLink header__navLink'}>Home</NavLink>
          <NavLink to='/books' className={({ isActive }) => isActive ? 'header__navLink header__navLink--active' : 'header__navLink header__navLink'} >Books</NavLink>
          <NavLink to='/about' className={({ isActive }) => isActive ? 'header__navLink header__navLink--active' : 'header__navLink header__navLink'} >About</NavLink>
          {
            !ctx.isLogin
            &&
            <NavLink to='/auth' className={({ isActive }) => isActive ? 'header__navLink header__navLink--active' : 'header__navLink header__navLink'} onMouseEnter={() => setAuthIconHover(true)} onMouseLeave={() => setAuthIconHover(false)} >{authIcon}</NavLink>
          }
          {
            ctx.isLogin
            &&
            <NavLink to='/profile' className={({ isActive }) => isActive ? 'header__navLink header__navLink--active' : 'header__navLink header__navLink'} onMouseEnter={() => setProfileIconHover(true)} onMouseLeave={() => setProfileIconHover(false)} >{profileIcon}</NavLink>
          }

          {
            ctx.isLogin
            &&
            <NavLink to='/auth' className={({ isActive }) => isActive ? 'header__navLink header__navLink--active' : 'header__navLink header__navLink'} onClick={isLoading ? () => { } : logoutHandler} onMouseEnter={() => setLogoutIconHover(true)} onMouseLeave={() => setLogoutIconHover(false)} >{logoutIcon}</NavLink>
          }

        </nav>
      </header>
          {
            isLoading
            &&
            <LoadingLayer/>
          }
    </>
  );
};

export default Header;
