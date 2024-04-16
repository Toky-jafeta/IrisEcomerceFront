import { Link } from "react-router-dom"

function Signup(){
    return (
        <div>
            <h1>Signup</h1>
            <Link to="/login">Retourné a la page de connéxion</Link>
        </div>
    )
}

export default Signup