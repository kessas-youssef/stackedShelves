import { useState, useEffect, useContext } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import '../style/comments.css'
import {
    getComments as getCommentsApi,
    createComment as createCommentApi,
    updateComment as updateCommentApi,
    deleteComment as deleteCommentApi,
} from "../api";
import Context from "./app_context";

const Comments = ({bookId, bookTitle}) => {
    const ctx = useContext(Context);

    const [backendComments, setBackendComments] = useState([]);
    const [activeComment, setActiveComment] = useState(null);
    const rootComments = backendComments.filter(
        (backendComment) => backendComment.parentId === null
    );


    const getReplies = (commentId) =>
        backendComments
            .filter((backendComment) => backendComment.parentId === commentId)
            .sort(
                (a, b) =>
                    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );


    const addComment = (text, parentId) => {
        createCommentApi(text, ctx.name, ctx.userId, bookId, parentId).then((res) => {
            if (res.status) {
                setBackendComments([...backendComments, res.data]);
                setActiveComment(null);
            }
            ctx.setNotifHandler({ text: res.message, status: res.status })
        });
    };

    const updateComment = (text, commentId) => {
        updateCommentApi(text, commentId).then((res) => {
            if (res.status) {
                const updatedBackendComments = backendComments.map((backendComment) => {
                    if (backendComment._id === commentId) {
                        return { ...backendComment, body: res.data.body };
                    }
                    return backendComment;
                });
                setBackendComments(updatedBackendComments);
                setActiveComment(null);
            }
            ctx.setNotifHandler({ text: res.message, status: res.status })
        });
    };


    const deleteComment = (commentId) => {
        deleteCommentApi(commentId).then((res) => {
            if (res.status) {
                const updatedBackendComments = backendComments.filter(
                    (backendComment) => backendComment._id !== commentId
                );
                setBackendComments(updatedBackendComments);
            }
            ctx.setNotifHandler({ text: res.message, status: res.status })

        });

    };

    useEffect(() => {
        getCommentsApi(bookId).then((res) => {
            if (res.status) {
                setBackendComments(res.data);
            }
            ctx.setNotifHandler({ text: res.message, status: res.status })
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="comments">
            <h3 className="comments-title">Comments on : "{bookTitle}"</h3>
            <CommentForm submitLabel="Comment" handleSubmit={addComment} />
            <div className="comments-container">
                {rootComments.map((rootComment) => (
                    <Comment
                        key={rootComment._id}
                        comment={rootComment}
                        replies={getReplies(rootComment._id)}
                        activeComment={activeComment}
                        setActiveComment={setActiveComment}
                        addComment={addComment}
                        deleteComment={deleteComment}
                        updateComment={updateComment}
                        currentUserId={ctx.userId}
                    />
                ))}
            </div>
        </div>
    );
};

export default Comments;