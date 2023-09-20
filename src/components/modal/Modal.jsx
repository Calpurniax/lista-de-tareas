import "../../styles/components/modal.scss"

const Modal = ({handleModal}) => {

    const handleClick = (ev) => {
        console.log(ev.target.id)        
        handleModal(ev.target.id)
    }    
    return (
        <article className="modal">
            <div className="modal__container">               
                <div className="modal__textContainer">
                    <p className="modal__text">
                       ¿Quieres borrar esta tarea?
                    </p>
                    <div className="modal__buttonsContainer" onClick={handleClick}>
                       <button className="modal__buttons" id='yes'>Sí</button>
                       <button className="modal__buttons" id='no'>No</button>
                    </div>
                </div>                
            </div>
        </article>

    )
}
export default Modal