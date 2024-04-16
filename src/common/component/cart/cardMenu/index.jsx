import { useSelector } from "react-redux"
import styled from "styled-components"
import { getTotalOrder } from "../../../../app/selectors"
import { useNavigate } from "react-router-dom"
import ArticleCardList from "../ArticleCartList"


const CardMenuContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;
    height: 250px;
    background-color: #a29b93;
    position: fixed;
    width: 100%;
    top: 10vh;
    z-index: 2;
    border-radius: 0px 0px 30px 30px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    overflow: scroll;
`

const DivTotal = styled.div`
    font-size: 50px;
    width: 35%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const DivButton = styled.button`
    height: 50px;
    width: 15%;
    border: none;
    border-radius: 10px;
    font-size: 1em;
    font-weight: 700;
    letter-spacing: 1.3px;
    color: #fff;
    background-color: ${props => props.disabled ? '#ccc' : '#fb5043'};
    box-shadow: 2px 2px 25px -7px black;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    position: relative;
    right: 34px;
    opacity: ${props => props.disabled ? 0.5 : 1};

    &:active {
        transform: ${props => props.disabled ? 'none' : 'scale(0.97)'};
    }
`


function CardMenu(){
    const total = useSelector(getTotalOrder)
    const navigate = useNavigate()

    const handelClick = () => {
        navigate("/shopping-card")
    }
    return (
        <CardMenuContainer>
            <ArticleCardList />
            <DivTotal>
                <p>Total : {total} Ar</p>
            </DivTotal>
            <DivButton onClick={handelClick} disabled={total === 0}>Validé ma commande</DivButton>

        </CardMenuContainer>
    )
}

export default CardMenu