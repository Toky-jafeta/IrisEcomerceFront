import { Outlet } from "react-router-dom"

function GetProduct(){
    return (
        <div>
            <h1>Get Product</h1>
            <Outlet />
        </div>
    )
}

export default GetProduct