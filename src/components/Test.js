import React from 'react'
import axios from 'axios'

function Test() {


    let token = localStorage.getItem("token")

    //create new axios req obj
    let apiURL = "http://localhost:8080"

    const axiosReq = axios.create({

        baseURL: apiURL,
        headers: {
            Authorization: `Bearer ${token}`
        }

    })


    const makeReqToProtectedRoute=()=>{
        axiosReq.get("/user/testing")
        .then(res=>{
            alert(res.data.message)
        })
    }




    return (
        <div>
            <h1>test</h1>
            <button onClick={()=>makeReqToProtectedRoute()}>Make req</button>
        </div>
    )
}

export default Test
