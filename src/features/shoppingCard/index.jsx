import { Link } from "react-router-dom"
import ArticleCardList from "../../common/component/cart/ArticleCartList"
import { useSelector } from "react-redux"
import { getTotalOrder } from "../../app/selectors"
import styled from "styled-components"
import ClientForm from "../../common/component/forms/client"
import retour from "../../assets/retour.png"

const DivContainer = styled.div`
    background-color: #d3d3d3;
    height: 100vh;
`

const DivSection = styled.div`
    display: flex;
    margin-left: 20px;
    margin-right: 50px;
    justify-content: space-around;
`

const SectionStat = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 50%;
`

const SectionNav = styled.nav`
    display: flex;
    padding-top: 20px;
    margin-bottom: 20px;
    margin-left: 20px;
`

const SectionNavLink = styled(Link)`
    text-decoration: none;
    font-size: 20px;
    color: black;

    &:hover{
        color: red;
    }
`

const DivClientForm = styled.div`
    width: 40%;
    justify-content: center;
    background-color: #d3d3d3;
`

const ImgReturn = styled.img`
    height: 3vh;
`

const TotalContainer = styled.p`
    font-size: 50px;
`

const TotalContainerSpan = styled.span`
    font-size: 100px;
`

function ShoppingCard(){
    const TotalOrder = useSelector(getTotalOrder)
    return (
        <DivContainer>
            <SectionNav>
                <SectionNavLink to="/"><ImgReturn src={retour} alt="return_buttun" /></SectionNavLink>
            </SectionNav>
            <DivSection>
                <SectionStat>
                    <ArticleCardList />
                    <TotalContainer>Total : <TotalContainerSpan>{TotalOrder} Ar</TotalContainerSpan></TotalContainer>
                </SectionStat>
                <DivClientForm>
                    <ClientForm />
                </DivClientForm>
            </DivSection>
        </DivContainer>
    )
}

export default ShoppingCard