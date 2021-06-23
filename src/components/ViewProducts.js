import { useEffect, useState } from 'react'
import axios from 'axios'

function ViewProducts() {

    const [products, setProducts] = useState('')

    useEffect(() => {
        axios.get('/product/viewproducts')
            .then(res => {
                setProducts(res.data.message)
            })
            .catch(err => {
                console.log("err in get products ", err)
                alert("Something went wrong")
            })
    }, [])


    return (
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 ">
            {products &&
                products.map((product, index) => {
                    return (
                        <div class="col" key={index}>
                            <div class="card">
                                <img src={product.productImage} class="card-img-top" alt="..." />
                                <div class="card-body">
                                    <h5 class="card-title">{product.productname}</h5>
                                    <p class="card-text">{product.description}</p>
                                </div>
                            </div>
                        </div>

                    )
                })
            }
        </div>
    )
}

export default ViewProducts
