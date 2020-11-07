import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody,CardHeader, Table } from 'reactstrap';
import { useHistory, Link } from 'react-router-dom';

import {getAdvertisiers,} from '../services';
import { getDateTimeFromIso } from '../services/helper';



export default function Advertisiers({user, ...props}) {
    let [advertisiers, setAdvs] = useState([])


    useEffect(() => {
        (async () => {
            let ads = await getAdvertisiers();
            setAdvs(ads)
        })()
    }, [advertisiers])



    return (
        <div style={{width: "90%", height:"100%", position: "absolute"}}>
            <Card style={{width: "95%"}}>
                <CardBody>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>name</th>
                                <th>created at</th>
                                <th>updated at</th>
                                <th>ads</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                advertisiers.map((ad, ind) => {
                                    let c = getDateTimeFromIso(ad.createdAt),
                                        u = getDateTimeFromIso(ad.updatedAt)
                                    return (
                                        <tr key={ind}>
                                        <th>{ind + 1}</th>
                                        <td>{ad.name}</td>
                                        <td>{c.date} * {c.time}</td>
                                        <td>{u.date} * {u.time}</td>
                                        <td><Link to={`/own?user=${ad._id}`} className="btn btn-warning">go</Link></td>
                                    </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        </div>
    );
}

