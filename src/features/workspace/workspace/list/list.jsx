import styled from "styled-components"
import { useGetCategoryListQuery } from "../../../../services/api.service"
import Loading from "../../../../common/component/loading"
import { useNavigate } from "react-router-dom"

const ListContainer = styled.div`
    display: flex;
    justify-content: center;
    max-height: 70vh;
    overflow-y: auto;
`

const StyledTable = styled.table`
    margin-top: 40px;
    width: 90%;
    border-collapse: collapse;
    background-color: #f9f9f9;
    border-radius: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const StyledTh = styled.th`
    padding: 12px;
    text-align: center;
    border-bottom: 2px solid #ddd;
    background-color: #4CAF50;
    color: white;
    font-weight: bold;
`

const StyledTd = styled.td`
    padding: 12px;
    border-bottom: 1px solid #ddd;
    text-align: center;
`

const StyledTr = styled.tr`
    &:hover {
        background-color: #f2f2f2;
        cursor: pointer;
    }
`

const StyledCaption = styled.caption`
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 10px;
`

const TbodyStyled = styled.tbody`

`

const TheadStyled = styled.thead`
`


function List(){
    const { data: listCategory, isLoading } = useGetCategoryListQuery()
    const navigate = useNavigate()

    const handleClick = (articleId) => {
        navigate(`/workspace/article/${articleId}`)
    }

    return (
        <ListContainer>
            <StyledTable>
                <StyledCaption>
                    Voci la liste de vos articles
                    {
                    isLoading && (
                        <Loading />
                    )
                }

                </StyledCaption>
                <TheadStyled>
                    <StyledTh>Article</StyledTh>
                    <StyledTh>Variant</StyledTh>
                    <StyledTh>Produit</StyledTh>
                    <StyledTh>Category</StyledTh>
                    <StyledTh>Price</StyledTh>
                </TheadStyled>
                <TbodyStyled>
                {
                    isLoading ? (
                        <Loading />
                    ) : (
                        listCategory.results.map(categoryItem => (
                            categoryItem.products.map(product => (
                                product.articles.map(article => (
                                    !Array.isArray(article.variants) || article.variants.length === 0 ? (
                                        <StyledTr key={`${article.id}-${article.name}`} onClick={() => handleClick(article.id)}>
                                            <StyledTd>{article.name}</StyledTd>
                                            <StyledTd></StyledTd>
                                            <StyledTd>{product.name}</StyledTd>
                                            <StyledTd>{categoryItem.name}</StyledTd>
                                            <StyledTd>{article.price}</StyledTd>
                                        </StyledTr>
                                    ) : (
                                        article.variants.map(variant => (
                                            <StyledTr key={variant.id} onClick={() => handleClick(article.id)}>
                                                <StyledTd>{article.name}</StyledTd>
                                                <StyledTd>{variant.type} {variant.color} {variant.size}</StyledTd>
                                                <StyledTd>{product.name}</StyledTd>
                                                <StyledTd>{categoryItem.name}</StyledTd>
                                                <StyledTd>{variant.price} Ar</StyledTd>
                                            </StyledTr>
                                        ))
                                    )
                                ))
                            ))
                        ))    
                    )
                }
                </TbodyStyled>
            </StyledTable>

        </ListContainer>
    )
}

export default List