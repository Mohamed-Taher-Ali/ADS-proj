import React, { useState, useEffect } from 'react';
import { Button, Input } from 'reactstrap';
import { useHistory, useParams, Link } from 'react-router-dom';

import AddCatAndTag from "../components/AddCatAndTag"
import EditCatAndTag from "../components/EditCatAndTag"
import { getByRoute,addByRoute,updateByRoute , deletebyId} from '../services';



export default function Dashboard({user, ...props}) {
    let history = useHistory(),
        [dispData, setDispData] = useState([]),
        [search, setSearch] = useState(""),
        route = history.location.pathname;


    let qsFunc = async () => {
        let res = await getByRoute(route)
        setDispData(res.data);
    }



    useEffect(() => {
        qsFunc()
    },[route])


    let addAdvrHandler = async(data) => {
        let res = await addByRoute(data, route)
        if(res.data) {
            let newAdvr = [...dispData, res.data[0]]
            setDispData(newAdvr)
        }
    }

    let editHandler = async (id, data) => {
        let res = await updateByRoute(id, data,route)
        if (res.data) {
            let dispDataEdit = dispData.map(a => {
                if (a._id == res.data._id)
                    return res.data
                else return a;
            })
            setDispData(dispDataEdit)
        }
    }

    let handleDelete = async(id) => {
        let res = await deletebyId(id,route)
        if(res.data) {
            let ads = dispData.filter(a=>a._id != res.data._id)
            setDispData(ads)
        }
    }


    let searchText = (e) =>setSearch(e.target.value)

    return (
        <div style={{width: "90%", height:"100%", position: "absolute"}}>
            <div className="srch">
            <div style={{display: "flex", width: "50%", justifyContent: "space-between", alignItems: "center"}}>
            <Input type="text" onChange={searchText} name="search" placeholder="search..." />
            </div>
             {user.role == "adm" && <AddCatAndTag route={route} buttonLabel="+" onSubmit={addAdvrHandler} />}
            </div>
                <div style={{height: "calc(100% - 120px)"}} className="tgsCtsCont">
                    {!dispData.length ?
                    <div style={{textAlign: "center"}}>No data...</div> : 
                        dispData.filter(d=>d.name.includes(search)).map((adv, ind)=>{
                            return (
                                <div key={ind} className="tagsAndCats">
                                    <div className="tagsAndCatsIn">{adv.name}</div>
                                    {user.role == "adm" && <div>
                                        <EditCatAndTag buttonLabel="Edit" route={route} advr={adv} onSubmit={editHandler} />&nbsp;
                                        <span style={{cursor: "pointer"}} onClick={()=>handleDelete(adv._id)}>Delete</span>
                                    </div>}
                                </div>
                            )
                        })
                    }
                </div>
        </div>
    );
}

