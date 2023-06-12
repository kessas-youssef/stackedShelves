// Styling of this comments modal is similar to the description modal - "descriptionModal.css" 
import { useContext, useState } from "react"
import Comments from "./Comments"
import Context from "./app_context"
import LoadingLayer from "./loadingLayer";

function CommentsModal(props) {

    const ctx = useContext(Context);
    const [isLoading, setIsLoading] = useState(false);

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape')
            props.setCommentsModal(false)
    })

    return (

        <div className={props.commentsModal ? "commentsOverlay commentsModal-active" : "commentsOverlay"}>
            <div className="commentsModal">
                <div className="commentsModal__close"
                    onClick={() => {
                        props.setCommentsModal(false);
                    }}>
                    &times;
                </div>
                <Comments bookTitle={props.bookTitle} currentUserId={ctx.userId} bookId={props.bookId} setIsLoading={setIsLoading} />
                {
                    isLoading
                    &&
                    <LoadingLayer />
                }
            </div>
        </div>

    )
}

export default CommentsModal