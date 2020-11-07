import React, { useState } from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap'
import {Link} from "react-router-dom"



export default function Modl({
    onSubmit = false,
    onCancel = false,
    submitTitle = "continue",
    customBody = <div></div>,
    body = <div></div>,
    link = false,
    modalTitle = "",
    outButtonContent = "modal",
    modalProps={},
    footer=true,
}) {

    let [modal, setModal] = useState(false),
        OutButtonType = link? Link: Button

    const toggle = () => {
        setModal(!modal);
    }

    const onActionHandler = (type) => {
        let fn = type == "submit" ? onSubmit : onCancel;

        if (!fn) return

        fn();
        toggle();
    }

    return (
        <div>
            <OutButtonType
                onClick={toggle}
                color="primary"
            >
                {outButtonContent}
            </OutButtonType>
            <Modal
                {...modalProps}

                isOpen={modal}
                toggle={toggle}
            >
                {
                    customBody ?
                        <div>{customBody}</div> :
                        <>
                                <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
                                <ModalBody>{body}</ModalBody>
                            {
                                !footer
                                    ? <></>
                                    : <ModalFooter>
                                        <Button color="primary" onClick={() => onActionHandler('submit')}>{submitTitle}</Button>{' '}
                                        <Button color="secondary" onClick={() => onActionHandler('cancel')}>Cancel</Button>
                                    </ModalFooter>
                            }
                        </>
                }
            </Modal>
        </div>
    )
}