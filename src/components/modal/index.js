import styles from './modal.module.css';

export default function Modal({children, title, onClose, show}) {

    return show && (
        <div className={styles.modal}>
            <div className={styles.content}>
                <div className={styles.header}>
                    <h4>{title}</h4>
                </div>
                {children}
                <Modal.Footer/>
            </div>
        </div>
    )
}

Modal.Footer = function Footer({children}) {
    return (
        <div className={styles.footer}>
            {children}
        </div>
    )
}
