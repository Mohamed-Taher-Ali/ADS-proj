import React, { useState } from 'react';
import Datetime from "react-datetime";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label, ButtonGroup } from 'reactstrap';
import DrpDwn from '../components/DropDown';

const AddOrder = ({
  advr={},
  querySelectors,
  buttonLabel,
  className,
  onSubmit=()=>{},
}) => {

  let [modal, setModal] = useState(false),
        [newUser, setNewUser] = useState(false),
        [data, setData] = useState({});

  const toggle = () => setModal(!modal);

  const addClickHandler = () => {
    let newData = {
      ...data,
      ...(data.photo && {photo: data.photo.file}),
      ...(data.tags && {
        tags: data.tags.split(',').map(t => ({ name: t.trim() }))
      })
    }
    
    onSubmit(advr._id, newData)
    toggle();
  }

    let inputChangeHandler = (e) => setData({
        ...data,
        [e.target.name]: e.target.value
    })

    let onFileUpload = e => {
      setData({
        ...data,
        photo: {
          file: e.target.files[0],
          value: e.target.value,
        }
      })
    }

    let handleNewUser = (e) => {
      setData({
        ...data,
        user: {
          ...(typeof data.user == "object" && data.user),
          [e.target.name]: e.target.value
        }
      })
    }

  return (
    <div>
      <Button color="info" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Add New Advertisment</ModalHeader>
        <ModalBody>
        <FormGroup>
        <Input type="text" onChange={inputChangeHandler} value={data.title || advr.title} name="title" placeholder="title" />
      </FormGroup>
      <FormGroup>
        <Input type="text" onChange={inputChangeHandler} value={data.desc || advr.desc} name="desc" placeholder="desc" />
      </FormGroup>
      <FormGroup>
        <Input type="text" onChange={inputChangeHandler} name="tags" placeholder="tags ... ex .. tag1,tag2 .." />
      </FormGroup>
      <FormGroup>
          <DrpDwn items={["free","paid"]} selectedIndex={advr.type=="free"?0:1} onChange={(e)=>setData({...data, type: e.item})} />
      </FormGroup>
      <FormGroup>
      <DrpDwn items={querySelectors.cats} selectedIndex={querySelectors.cats.findIndex(c=>c._id==advr.cat._id)} onChange={(e)=>setData({...data, cat: e.item._id})} />
      </FormGroup>
      <ButtonGroup style={{marginBottom: "10px"}}>
                <Button onClick={e => setNewUser(false)} active={!newUser}>exist</Button>
                <Button onClick={e => setNewUser(true)} active={newUser}>new</Button>
      </ButtonGroup>
      {!newUser ?
            <FormGroup>
              {querySelectors.advertisiers.length && <DrpDwn items={querySelectors.advertisiers} selectedIndex={querySelectors.advertisiers.findIndex(c=>c._id==advr.user._id)} onChange={(e)=>setData({...data, user: e.item._id})} />}
            </FormGroup> :
            <>
              <FormGroup>
                <Input type="text" onChange={handleNewUser} name="name" placeholder="name" />
              </FormGroup>
              <FormGroup>
                <Input type="password" onChange={handleNewUser} name="password" placeholder="password" />
              </FormGroup>
            </>
      }
      <FormGroup>
          <Label for="photo">Photo</Label>
          <Input type="file" name="photo" value={data?.photo?.value || ""} id="photo" onChange={onFileUpload} />
        </FormGroup>
      <FormGroup>
        start time: <Datetime value={data.sDate || advr.sDate} onChange={(e)=>setData({...data, sDate: (new Date(e._d)).toISOString()})} />
      </FormGroup>
      <FormGroup>
        end Time: <Datetime value={data.eDate || advr.eDate} onChange={(e)=>setData({...data, eDate: (new Date(e._d)).toISOString()})} />
      </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={addClickHandler}>Edit</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default AddOrder;