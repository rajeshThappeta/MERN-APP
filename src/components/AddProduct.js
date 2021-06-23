import { useState } from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useHistory } from 'react-router-dom'

function AddProduct() {
    const { register, handleSubmit } = useForm();
    const [file, setFile] = useState(null)
    const history = useHistory();
    const onFormSubmit = (productObj) => {

        //create FormData obj
        let formData = new FormData();
        // //add file(s) to formdata obj
        formData.append('photo', file, file.name)
        //add userObj to formData object
        formData.append("productObj", JSON.stringify(productObj))

        //post req
        axios.post("/product/createproduct", formData)
            .then(res => {
                let resObj = res.data;
                alert(resObj.message)
                //navigate to login component
                history.push('/view-products')
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
            <input type="text" className="form-control mb-3"  {...register("productname")} placeholder="productname" />
            <input type="text" className="form-control mb-3"  {...register("model")} placeholder="model" />
            <input type="number" className="form-control mb-3"  {...register("price")} placeholder="Price" />
            <textarea type="text" className="form-control mb-3"  {...register("description")} placeholder="description" />

            <input type="file" name="photo" className="form-control mb-3" onChange={(e) => { onFileSelect(e) }} />

            <button className="btn btn-success">Add product</button>
        </form>


    )
}

export default AddProduct
