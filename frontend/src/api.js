import axios from "axios";

export const getComments = async (bookId) => {
    // return [
    //     {
    //         id: "1",
    //         bookId: '2',
    //         body: "2 First comment",
    //         username: "Jack",
    //         userId: "1",
    //         parentId: null,
    //         createdAt: "2021-08-16T23:00:33.010+02:00",
    //     },
    //     {
    //         id: "2",
    //         bookId: '30',
    //         body: " 2 Second comment",
    //         username: "John",
    //         userId: "2",
    //         parentId: null,
    //         createdAt: "2021-08-16T23:00:33.010+02:00",
    //     },
    //     {
    //         id: "3",
    //         bookId: '30',
    //         body: "30 First comment first child",
    //         username: "John",
    //         userId: "2",
    //         parentId: "1",
    //         createdAt: "2021-08-16T23:00:33.010+02:00",
    //     },
    //     {
    //         id: "4",
    //         bookId: '30',
    //         body: " 30 Second comment second child",
    //         username: "John",
    //         userId: "2",
    //         parentId: "2",
    //         createdAt: "2021-08-16T23:00:33.010+02:00",
    //     },
    // ];

    return axios({
        method: 'GET',
        url: `https://stackedshelves.onrender.com/getComments/${bookId}`
    }).then(res => {
        return res.data;
    })
};

export const createComment = async (text, username, userId, bookId, parentId = null) => {
    return axios({
        method: 'POST',
        data: {
            bookId: bookId,
            body: text,
            parentId,
            userId: userId,
            username: username,
            createdAt: new Date().toISOString()
        },
        withCredentials: true,
        url: 'https://stackedshelves.onrender.com/addComment'
    }).then(res => {
        return res.data;
    });
};

export const updateComment = async (text, commentId) => {

    return axios({
        method: 'PUT',
        data: {
            text: text
        },
        withCredentials: true,
        url: `https://stackedshelves.onrender.com/updateComment/${commentId}`
    }).then(res => res.data);
};

export const deleteComment = async (commentId) => {
    return axios({
        method: 'DELETE',
        withCredentials: true,
        url: `https://stackedshelves.onrender.com/deleteComment/${commentId}`
    }).then(res => res.data)
};