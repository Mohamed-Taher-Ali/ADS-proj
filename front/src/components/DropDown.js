import React, { useState, useEffect } from 'react'
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
  } from 'reactstrap'

export default function DrpDwn({
    items=[],
    selectedIndex=0,
    onChange
}) {
    let [dropdownOpen, setDropdownOpen] = useState(false);
    let [itemsState, setItemsState] = useState(items),
        [selectedIndexState, setSelectedIndexState] = useState(selectedIndex)

    let toggle = () => setDropdownOpen(prevState => !prevState);

    useEffect(() => {
        setItemsState(items)
        setSelectedIndexState(selectedIndexState)
    }, [items])

    useEffect(() => {
        setSelectedIndexState(selectedIndex)
    }, [selectedIndex])


    let onChangeHandler = (item, ind) =>{
        if(!onChange) return

        onChange({ind,item})
        setSelectedIndexState(ind)
    }


    let itemsRender = (items) => items.map((item, ind) => (
        <DropdownItem key={ind} onClick={()=>onChangeHandler(item, ind)}>
            {item.name || item}
        </DropdownItem>
    ))

    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret color="primary">
                {itemsState.length ? itemsState[selectedIndexState].name || itemsState[selectedIndexState] : 'undefined'}
            </DropdownToggle>
            <DropdownMenu>
                {itemsRender(itemsState)}
            </DropdownMenu>
        </Dropdown>
    )
}