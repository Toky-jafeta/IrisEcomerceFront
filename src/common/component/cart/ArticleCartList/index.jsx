import { useSelector, useDispatch } from "react-redux"
import styled from "styled-components"
import { getUniqueArticles } from "../../../../app/selectors"
import { CardSlice } from "../../../../features/home/cartSlice"
import delete_cart from '../../../../assets/delete_cart.png'


const TableContainer = styled.table`
    width: 100%;
    border-collapse: collapse;
`

const TableContainerCaption = styled.caption`
    border: solid 1px;
    height: 50px;
    font-size: 25px;
`

const TableContainerThead = styled.thead`
`

const TableContainerTheadTr = styled.tr`
    height: 50px;
`

const TableContainerTheadTrTh = styled.th`
    border: solid 1px;
    height: 50px;
    font-size: 20px;
`


const TableContainerTbody = styled.tbody`

`

const TableContainerTbodyTr = styled.tr`
    height: 50px;
`

const TableContainerTbodyTrTd = styled.td`
    border: solid 1px;
    height: 50px;
    font-size: 18px;
`

const CartImg = styled.img`
    margin-top: 5px;
    height: 100%;
    cursor: pointer;
`

const CartButton = styled.button`
    width: 50%;
    font-size: 32px;
    background-color: #fb5043;
    color: white;
    border: None;
    box-shadow: 1px 1px 15px -7px black;
    border-radius: 10px 10px 10px 10px;
    cursor: pointer;
`


function ArticleCardList(){
    const uniqueArticles = useSelector(getUniqueArticles)
    const dispatch = useDispatch()


    const DeleteProduct = (articleId) => {
        dispatch(
            CardSlice.actions.removeProduct(articleId)
        )
    }

    const DeleteFirstProduct = (articleId) => {
        dispatch(
            CardSlice.actions.removeFirstProduct(articleId)
        )
    }

    return (
        <TableContainer>
            <TableContainerCaption>STATISTIQUE DU PANIER</TableContainerCaption>
            <TableContainerThead>
                <TableContainerTheadTr>
                    <TableContainerTheadTrTh>Designation</TableContainerTheadTrTh>
                    <TableContainerTheadTrTh>Quantité</TableContainerTheadTrTh>
                    <TableContainerTheadTrTh>Prix unitaire</TableContainerTheadTrTh>
                    <TableContainerTheadTrTh>Prix total</TableContainerTheadTrTh>
                    <TableContainerTheadTrTh>Supprimer</TableContainerTheadTrTh>
                    <TableContainerTheadTrTh>Reduire quantité</TableContainerTheadTrTh>
                </TableContainerTheadTr>
            </TableContainerThead>
            <TableContainerTbody>
                {
                    uniqueArticles.length !== 0 ? (uniqueArticles.map(({ article, quantity }, index) => (
                        <TableContainerTbodyTr key={`${article.id}-${index}`}>
                            <TableContainerTbodyTrTd>{article.name}</TableContainerTbodyTrTd>
                            <TableContainerTbodyTrTd>{quantity}</TableContainerTbodyTrTd>
                            <TableContainerTbodyTrTd>{article.price}</TableContainerTbodyTrTd>
                            <TableContainerTbodyTrTd>{parseFloat(article.price) * quantity}</TableContainerTbodyTrTd>
                            <TableContainerTbodyTrTd><CartImg src={delete_cart} alt="delete_cart" onClick={() => DeleteProduct(article.id)}/></TableContainerTbodyTrTd>
                            <TableContainerTbodyTrTd><CartButton onClick={() => DeleteFirstProduct(article.id)}>-</CartButton></TableContainerTbodyTrTd>
                        </TableContainerTbodyTr>
                    ))) : (
                        <TableContainerTbodyTr>
                            <TableContainerTbodyTrTd colSpan="6">Acune produit pour le selectioné</TableContainerTbodyTrTd>
                        </TableContainerTbodyTr>
                    )
                }
            </TableContainerTbody>
        </TableContainer>
    )
}


export default ArticleCardList