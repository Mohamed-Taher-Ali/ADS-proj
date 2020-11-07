import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label, ButtonGroup } from 'reactstrap';

const Edit = ({
    advr,
    route,
    buttonLabel,
    className,
    onSubmit=()=>{}
}) => {

  let [modal, setModal] = useState(false),
        [data, setData] = useState({});

  const toggle = () => setModal(!modal);

  const addClickHandler = () => {
    onSubmit(advr._id, data)
    toggle();
  }

    let inputChangeHandler = (e) => setData({
        ...data,
        [e.target.name]: e.target.value
    })


  return (
    <>
      <span style={{cursor: "pointer"}} color="primary" onClick={toggle}>{buttonLabel}</span>
      <Modal isOpen={modal} toggle={toggle} className={className}>
  <ModalHeader toggle={toggle}>Edit {route.substring(1).slice(0, -1)}</ModalHeader>
        <ModalBody>
        <FormGroup>
        <Input type="text" value={data.name || advr.name} onChange={inputChangeHandler} name="name" placeholder="name" />
      </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={addClickHandler}>Edit</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default Edit;