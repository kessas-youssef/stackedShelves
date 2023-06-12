// Styling of this comments modal is similar to the description modal - "descriptionModal.css" 
import { useContext } from "react"
import Comments from "./Comments"
import Context from "./app_context"

function CommentsModal(props) {

    const ctx = useContext(Context);

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
                <Comments bookTitle={props.bookTitle} currentUserId={ctx.userId} bookId={props.bookId} />
            </div>
        </div>

    )
}

export default CommentsModal