import { Link } from "react-router-dom"
import { useGetAllArticleQuery } from "../../services/api.service"
import Loading from "../../common/component/loading"
import ProductCart from "../../common/component/cart/productCart"
import styled from "styled-components"
import panier from "../../assets/panier.png"
import inscription from "../../assets/inscription.webp"
import connecter from "../../assets/connecter.png"
import { useSelector } from "react-redux"
import { getTotalNumberItemInCards } from "../../app/selectors"
import { useState } from "react"
import CardMenu from "../../common/component/cart/cardMenu"


const HomeArticleProducts = styled.article`
    display: grid;
    grid-template-rows: 1fr;
    background-color: #c4bebb;
`

const HomeSection = styled.section`
    margin-top: 10vh;
`

const HomeNav = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    min-height:10vh;
    background-color:#d3d3d3;
    width:100%;
    display: flex;
    align-items: center;
    z-index:1;
    justify-content: space-around;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`

const HomeNaveTitle =styled.h1`

`

const HomeLinkContainer = styled.div`
    display: flex;
    align-items: center;
`

const Logo = styled.img`
    max-height: 40px;
`


const HomeDivLink = styled.div`
    margin-left: 50px;
`

const HomeDivPanier = styled.div`
    display: flex;
    margin-left: 50px;
    text-decoration:none;
    color: white;
    cursor: pointer;
`

const CircleContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #fb5043;
`

const HomeArticleProductsTitle = styled.h4`
    font-size: 30px;
`

function Home(){
    const {data: articleListe, isLoading } = useGetAllArticleQuery()
    const totalOrder = useSelector(getTotalNumberItemInCards)

    const [cardMenu, setCardMenu] = useState(false)

    const menuhandler = () => {
        cardMenu ? setCardMenu(false) : setCardMenu(true)
    }

    return (
        <div>
            <HomeNav>
                <HomeNaveTitle>Trouvez et commandé vos articles</HomeNaveTitle>
                <HomeLinkContainer>
                    <HomeDivLink>
                        <HomeDivPanier onClick={menuhandler}>
                            <Logo src={panier} alt="panier-logo" />
                            <CircleContainer>
                                <p>{totalOrder}</p>
                            </CircleContainer>
                        </HomeDivPanier>
                    </HomeDivLink>
                    <HomeDivLink>
                        <Link to="/signup">
                            <Logo src={inscription} alt="inscription-logo"/>
                        </Link>
                    </HomeDivLink>
                    <HomeDivLink>
                        <Link to="/login">
                            <Logo src={connecter} alt="se-conecter-logo"/>
                        </Link>
                    </HomeDivLink>
                </HomeLinkContainer>
            </HomeNav>
            {
                cardMenu && (
                    <CardMenu />
                )
            }
            <HomeSection>
                <HomeArticleProducts>
                    <HomeArticleProductsTitle>+ de {articleListe?.count} articles a choisir</HomeArticleProductsTitle>
                    {
                        isLoading ? (
                            <Loading />
                        ) : (
                            articleListe?.results.map((article) => (
                                ((article.is_active && article.price) || (article.is_active && !article.price && article.variants.length !== 0)) && (
                                    <ProductCart key={article.id}
                                    article={article}
                                />
                                )
                            ))
                        )
                    }
                </HomeArticleProducts>
            </HomeSection>

        </div>
    )
}

export default Home