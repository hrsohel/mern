import React, { useEffect } from 'react';
import axios from "axios"

const Ordered = () => {
    const getOrdered = async () => {
        const {data} = await axios.get("/get-ordered-data")
        console.log(data)
    }
    useEffect(() => {
        getOrdered()
    }, [])
    return (
        <div>
            <div className="container-fluid my-2">
                <div className="table-responsive-md">
                    <table className="table table-success table-striped">
                        <thead>
                            <tr>
                            <th scope="col">food name</th>
                            <th scope="col">category</th>
                            <th scope="col">user Id</th>
                            <th scope="col">user name</th>
                            <th scope="col">user email</th>
                            <th scope="col">status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            </tr>
                            <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            </tr>
                            <tr>
                            <th scope="row">3</th>
                            <td colspan="2">Larry the Bird</td>
                            <td>@twitter</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Ordered;