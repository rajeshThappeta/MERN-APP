import {
    BrowserRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";
import AddProduct from './AddProduct'
import ViewProducts from './ViewProducts'


function AdminProfile() {
    return (
        <BrowserRouter>
            <ul className="nav nav-pills nav-fill">
                <li className="nav-item">
                    <Link to="/add-product" className="nav-link" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">Add product</Link>
                </li>
                <li className="nav-item">
                    <Link to="/view-products" className="nav-link" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">View products</Link>
                </li>

            </ul>

            <Switch >

                <Route path="/add-product">
                    <AddProduct />
                </Route>
                <Route path="/view-products">
                    <ViewProducts />
                </Route>

            </Switch>
        </BrowserRouter>
    )
}

export default AdminProfile
