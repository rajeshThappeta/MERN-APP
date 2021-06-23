import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ViewProducts from './ViewProducts';

function UserProfile() {

    let [user, setUser] = useState('')

    //get username from url
    let paramsObj = useParams();//{username:"vikas"}

    useEffect(() => {
        //get userObj from localstorage
        let userObj = JSON.parse(localStorage.getItem('user'))
        setUser({ ...userObj })
    }, [paramsObj.username])

    //fetch userdata from api

    return (
        <div>
            <h5 className="text-end">Welcome ,<span className="text-info">{paramsObj.username}</span></h5>
            <div className="text-center">
                <h3>{user.email}</h3>
                <h3>{user.dob}</h3>
                <img src={user.profileImage} width="200px" alt="" />
            </div>
            <ViewProducts />
        </div>
    )
}

export default UserProfile
