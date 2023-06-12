import "../style/descriptionModal.css"

function DescriptionModal(props) {

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape')
            props.setDescriptionModal({ status: false })
    })

    return (

        <div className={props.status ? "overlay modal-active" : "overlay"} onClick={() => console.log("Clicked")}>
            <div className="descriptionModal">
                <div className="descriptionModal__close" onClick={
                    () => {
                        props.setDescriptionModal({ status: false })
                    }
                    }>
                    &times;
                </div>
                <div className="descriptionModal__content">
                    <h3 className="descriptionModal__header">Description of <span className="descriptionModal__headerTitle">{`"${props.title}"`}</span> :</h3>
                    <p className="descriptionModal__text">{props.description}</p>
                </div>
            </div>
        </div>

    )
}

export default DescriptionModal