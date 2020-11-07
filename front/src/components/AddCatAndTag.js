import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label, ButtonGroup } from 'reactstrap';

const AddOrder = ({
    route,
    buttonLabel,
    className,
    onSubmit=()=>{}
}) => {

  let [modal, setModal] = useState(false),
        [data, setData] = useState({});

  const toggle = () => setModal(!modal);

  const addClickHandler = () => {
    onSubmit(data)
    toggle();
  }

    let inputChangeHandler = (e) => setData({
        ...data,
        [e.target.name]: e.target.value
    })


  return (
    <div>
      <Button color="primary" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
  <ModalHeader toggle={toggle}>Add New {route.substring(1).slice(0, -1)}</ModalHeader>
        <ModalBody>
        <FormGroup>
        <Input type="text" onChange={inputChangeHandler} name="name" placeholder="name" />
      </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={addClickHandler}>Add</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default AddOrder;