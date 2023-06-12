import { createContext, useState } from 'react';


const Context = createContext({
    isLogin: false,
    login: () => { },
    logout: () => { },
    userId: '',
    name: '',
    userBooks: [],
    setNotifHandler: () => { },
    isNotif: false,
    notification: { text: '', status: false },
    setUserBooksHandler: () => {}
});



export const MyContext = (props) => {
    const [loginStatus, setLoginStatus] = useState(false);
    const [userId, setUserId] = useState('');
    const [name, setName] = useState('');
    const [userBooks, setUserBooks] = useState([]);
    const [isNotif, setIsNotif] = useState(false);
    const [notification, setNotification] = useState({ text: '', status: false });


    const login = ({ _id, username, books }) => {
        setUserId(_id);
        setLoginStatus(true);
        setName(username);
        setUserBooks([...books]);
    }

    const logout = () => {
        setUserId('');
        setLoginStatus(false);
        setName('');
        setUserBooks([]);
    }

    const setNotifHandler = (notifInfo, limit = true) => {
        setIsNotif(true);
        setNotification({
            text: notifInfo.text, status: notifInfo.status
        });

        if (limit)
            setTimeout(() => {
                setIsNotif(false);
            }, 4000);
    }
    const setUserBooksHandler = books => setUserBooks([...books])

    return (
        <Context.Provider value={{
            isLogin: loginStatus,
            login: login,
            logout: logout,
            userId: userId,
            name: name,
            userBooks: userBooks,
            setNotifHandler: setNotifHandler,
            isNotif: isNotif,
            notification: { text: notification.text, status: notification.status },
            setUserBooksHandler: setUserBooksHandler
        }}>
            {props.children}
        </Context.Provider >
    )
}

export default Context;