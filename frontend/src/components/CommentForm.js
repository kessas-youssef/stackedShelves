import { useState } from "react";

const CommentForm = ({
    handleSubmit,
    submitLabel,
    hasCancelButton = false,
    handleCancel,
    initialText = "",
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [text, setText] = useState(initialText);
    const isTextareaDisabled = text.length === 0 || isLoading;
    const onSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        await handleSubmit(text);
        setIsLoading(false);
        setText("");
    };
    return (
        <form onSubmit={onSubmit}>
            <textarea
                className="comment-form-textarea"
                value={text}
                onChange={(e) => setText(e.target.value)}
                maxLength={240}
            />
            <button className="commentBtn" disabled={isTextareaDisabled}>
                {submitLabel}
            </button>
            {hasCancelButton && (
                <button
                    type="button"
                    className="commentBtn"
                    onClick={handleCancel}
                >
                    Cancel
                </button>
            )}
        </form>
    );
};

export default CommentForm;