import { useSelector } from "react-redux"
import { getIsAuthenticated } from "../../app/selectors"
import { Navigate } from "react-router-dom"

function ProtectRoutes({ children }){
    const isAuthenticated = useSelector(getIsAuthenticated)
    return isAuthenticated ? children : <Navigate to="/login" />;
}

export default ProtectRoutes