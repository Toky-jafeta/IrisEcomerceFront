import { Outlet } from "react-router-dom"

function GetCategory(){
    return (
        <div>
            <h1>Get Category</h1>
            <Outlet />
        </div>
    )
}

export default GetCategory