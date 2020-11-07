import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import { useHistory, useParams } from 'react-router-dom';

import DropDown from "../components/DropDown"
import AddAdvr from "../components/AddAdvr"
import EditAdvr from "../components/EditAdvr"

import { getAds, getCats, getTags, getAdvertisiers,addAdvr,editAdvr , deletebyId} from '../services';
import { getDateTimeFromIso, parseParams } from '../services/helper';



export default function Dashboard({user, ...props}) {
    let history = useHistory(),
        [advrs, setAdvrs] = useState([]),
        [queryString, setQueryString] = useState({}),
        [querySelectors, setQuerySelectors] = useState({
            cats:[],tags:[],advertisiers:[]
        })

    let qsSFunc = async ()=>{
        let cats = await getCats(),
            tags = await getTags(),
            advertisiers = await getAdvertisiers();
        setQuerySelectors({cats,tags,advertisiers})
    }

    useEffect(() => {
        qsSFunc();
    }, [])



    let qsFunc = async () => {
        let qs = "",
            allQuery = {...parseParams(props.location.search), ...queryString};

            for (const key in allQuery)
                qs += `${key}=${allQuery[key]}&`;
            let own = history.location.pathname == "/own",
                adsRes = await getAds(qs, own)

            setAdvrs(adsRes.data)
    }

    useEffect(() => {
        qsFunc()
    },[queryString])


    let addAdvrHandler = async(data) => {
        let res = await addAdvr(data)
        if(res.data) {
            let newAdvr = [res.data, ...advrs]
            setAdvrs(newAdvr)
        }
    }

    let editAdvrHandler = async(id, data) => {
        let res = await editAdvr(id, data)
        if(res.data) {
            let advrsEdit = advrs.map(a=>{
                if(a._id == res.data._id)
                return res.data
                else return a;
            })
            setAdvrs(advrsEdit)
        }
    }

    let handleDelete = async(id) => {
        let res = await deletebyId(id, "/advrs")
        if(res.data) {
            let ads = advrs.filter(a=>a._id != res.data._id)
            setAdvrs(ads)
        }
    }

    let dropDownHandler = (selector, elm) => {
        // to make actuall change to object
        let sel = {...queryString};

        if(elm.ind == 0) delete sel[selector]
        else sel[selector] = elm.item._id

        setQueryString(sel)
    }


    return (
        <div style={{width: "90%", height:"100%", position: "absolute"}}>
            {user.role == "adm" && history.location.pathname != "/own"? <div className="srch">
            <div style={{display: "flex", width: "50%", justifyContent: "space-between", alignItems: "center"}}>
            <strong>Search By </strong>
            {querySelectors.advertisiers.length? <DropDown items={[{name: "select advertisier"},...querySelectors.advertisiers]} onChange={(e) => dropDownHandler("user", e)} />: ""}
            {querySelectors.cats.length? <DropDown items={[{name: "select category"},...querySelectors.cats]} onChange={(e) => dropDownHandler("cat", e)} />: ""}
            {querySelectors.tags.length? <DropDown items={[{name: "select tag"},...querySelectors.tags]} onChange={(e) => dropDownHandler("tags", e)} />: ""}
            </div>
             <AddAdvr buttonLabel="+" querySelectors={querySelectors} onSubmit={addAdvrHandler} />
            </div>: null}
                <div style={{height: "calc(100% - 120px)"}}>
                    {!advrs.length ?
                    <div style={{textAlign: "center"}}>No data...</div> : 
                        advrs.map((adv, ind)=>{
                            return (
                                <div key={ind} className="ancBody">
                                    <div className="ancBodyIn">
                                    <div className="ancLeft">
                                    <div className="ancHead">
                                        <div>
                                            <div style={{fontSize: "40px"}}>{adv.title}</div>
                                            <div>{adv.desc}</div>
                                        </div>
                                       { user.role != "adm"? "" :
                                       <div className="bCon">
                                            <EditAdvr buttonLabel="Edit" advr={adv} querySelectors={querySelectors} onSubmit={editAdvrHandler} />
                                            <Button color="danger" onClick={()=>handleDelete(adv._id)} >Delete</Button>
                                        </div>
                                        }
                                    </div>
                                    <div style={{display: "flex"}}>
                                        <div style={{width: "30%"}}>advertisier</div>
                                        <div>{adv.user.name}</div>
                                    </div>
                                    <div style={{display: "flex"}}>
                                        <div style={{width: "30%"}}>category</div>
                                        <div>{adv.cat.name}</div>
                                    </div>
                                    <div style={{display: "flex"}}>
                                        <div style={{width: "30%"}}>type</div>
                                        <div>{adv.type}</div>
                                    </div>
                                    <div style={{display: "flex"}}>
                                        <div style={{width: "30%"}}>start date</div>
                                        <div>{getDateTimeFromIso(adv.sDate).date}</div>
                                    </div>
                                    <div style={{display: "flex"}}>
                                        <div style={{width: "30%"}}>end date</div>
                                        <div>{getDateTimeFromIso(adv.eDate).date}</div>
                                    </div>
                                </div>
                                {adv.photo && <img className="ancPhoto" alt="photo" src={adv.photo} />}
                                    </div>
                                <div className="tags">{
                                            adv.tags.map((t, i) =>
                                                <span key={i} className="tag">{t.name}</span>
                                            )
                                }</div>
                            </div>
                            )
                        })
                    }
                </div>
        </div>
    );
}

