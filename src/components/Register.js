import {useState,useContext} from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { TestContext } from '../contexts/TestContext';

function Register() {

        const result1=useContext(TestContext)
        console.log("result is ",result1)
   
    const { register, handleSubmit } = useForm();
    const [file, setFile] = useState(null)
    const history = useHistory();

    const onFormSubmit = (userObj) => {

        //create FormData obj
        let formData=new FormData();
        //add file(s) to formdata obj
        formData.append('photo',file,file.name)
        //add userObj to formData object
        formData.append("userObj",JSON.stringify(userObj))

        //post req
        axios.post("/user/createuser", formData)
            .then(res => {
                let resObj = res.data;
                alert(resObj.message)
                //navigate to login component
                history.push('/login')
            })
            .catch(err => {
                console.log(err);
                alert("something went wrong")
            })

    }


    //to get selected
    const onFileSelect = (e) => {
        
        setFile(e.target.files[0])
    }




    return (

        <form className="w-50 mx-auto mt-5" onSubmit={handleSubmit(onFormSubmit)}>
            <input type="text" className="form-control mb-3"  {...register("username")} placeholder="Username" />
            <input type="password" className="form-control mb-3"  {...register("password")} placeholder="Password" />
            <input type="email" className="form-control mb-3"  {...register("email")} placeholder="E-mail" />
            <input type="date" className="form-control mb-3"  {...register("dob")} placeholder="Date of birth" />
            <input type="file" name="photo" className="form-control mb-3" onChange={(e) => { onFileSelect(e) }} />

            <button className="btn btn-success">Register</button>
        </form>


    )
}

export default Register
