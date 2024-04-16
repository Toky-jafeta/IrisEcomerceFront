import { useDeleteArticleMutation, useGetArticleQuery, useGetCategoryListQuery } from "../../../../../services/api.service"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import edit_logo from "../../../../../assets/edit.png"
import delete_logo from "../../../../../assets/delete.png"
import Loading from "../../../../../common/component/loading"
import { useState } from "react"
import ReactModal from "react-modal"
import CategoryForm from "../../../../../common/component/forms/category"
import Status from "../../../../../common/component/forms/status"
import IsPublished from "../../../../../common/component/forms/is_published"
import Price from "../../../../../common/component/forms/price"
import Variants from "../../../../../common/component/forms/variant"
import Name from "../../../../../common/component/forms/name"
import Pictures from "../../../../../common/component/forms/pictures"



const FuturisticContainer = styled.div`
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    width:80%;
    height: 80vh;
    margin: 0 auto;
    overflow: auto;
    background-color: #d3d3d3;
    transition: transform 0.3s ease-in-out;
    text-align: left;
    &:hover {
        transform: translateY(-5px);
    }
`

const GetArticleTitle = styled.h1`
    text-align: center;
    font-size: 32px;
`

const StyledSpan = styled.span`
    display: inline-block;
    text-align: left;
    margin-right: 10px;
    vertical-align: middle;
`

const EditLogo = styled.img`
    max-width: 20px;
    max-height: 20px;
    cursor: pointer;
`

const ArticleVariantImage = styled.img`
    max-height: 100px;
    margin: 5px;
`

const LiArticle = styled.li`
    display: block;
    clear: both;
    counter-increment: list;
    padding-bottom: 4rem;
    font-size: 1.1rem;
    line-height: 1.375;
    position: relative;
    &:before {
        font: bold 2.25rem/1 var(--font-number);
        content: counter(list);
        width: 5rem;
        height: 5rem;
        float: left;
        margin: 0 1.5rem 0.75rem 0;
        color: var(--bg);
        background: var(--highlight1) linear-gradient(to bottom right, var(--highlight1) 25%, var(--highlight2));
        text-shadow: 0 0 2px var(--highlight1);
        border-radius: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        shape-outside: ellipse();
        z-index: 1;
    }
    &:after {
        width: 2.5rem;
        height: 2.5rem;
        position: absolute;
        top: 0;
        left: 0;
        content: "";
        background: var(--highlight1);
        z-index: -1;
        border-top-left-radius: 3px;
    }
`

const LiVariantDetails = styled.li`
    padding: 5px;
    margin-left: 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`

const LiVariant = styled.li`
    margin-bottom: 10px;
`

const LiTitle = styled.h4`
    
`

const ListOl = styled.ol`
    list-style: none;
    width: 600px;
    max-width: 90%;
`

const DeleteLogo = styled.img`
    max-width: 20px;
    max-height: 20px;
    cursor: pointer;
    margin-left: 10px; // Ajout de la marge pour séparer les boutons
`

function GetArticle(){
    const { articleId } = useParams()
    const navigate = useNavigate()
    const {data: articleDetails, isLoading } = useGetArticleQuery({
        "articleId": articleId
    })

    const [deleteArticle] = useDeleteArticleMutation()
    const { data: categoryList } = useGetCategoryListQuery()

    const [editField, setEditField] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    
    const openModal = (field) => {
        setIsModalOpen(true);
        setEditField(field);
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setEditField(null);
    }

    const deleteProduct = async(id) => {
        await deleteArticle({
            articleId: id
        })
        navigate("/workspace/article/list")
    }
    
    return (
        <FuturisticContainer>
            {isLoading ? (
                <Loading />
            ) : (
                <div>
                    <GetArticleTitle>
                        <StyledSpan>{articleDetails.name}</StyledSpan> <EditLogo src={edit_logo} alt="edit_logo" onClick={() => openModal("name")}/>
                        <DeleteLogo src={delete_logo} alt="delete_logo" onClick={() => deleteProduct(articleDetails.id)}/>
                    </GetArticleTitle>

                    <ListOl>
                        <LiArticle><LiTitle>Category</LiTitle><StyledSpan>{articleDetails.product.category.name} <EditLogo src={edit_logo} alt="edit_logo" onClick={() => openModal("category")}/></StyledSpan> </LiArticle>
                        <LiArticle><LiTitle>Produit</LiTitle><StyledSpan>{articleDetails.product.name} <EditLogo src={edit_logo} alt="edit_logo" onClick={() => openModal("product")}/></StyledSpan></LiArticle>
                        {
                            articleDetails.variants.length === 0 && (
                                <>
                                    <LiArticle><LiTitle>Status</LiTitle><StyledSpan>{ !articleDetails.is_sold ? 'Vendu' : 'Disponible' } <EditLogo src={edit_logo} alt="edit_logo" onClick={() => openModal("article_status")}/></StyledSpan></LiArticle>
                                    <LiArticle><LiTitle>Status de publication</LiTitle><StyledSpan>{ articleDetails.is_active ? 'Publié' : 'Non publié' } <EditLogo src={edit_logo} alt="edit_logo" onClick={() => openModal("article_is_active")}/></StyledSpan></LiArticle>
                                    <LiArticle><LiTitle>Prix</LiTitle><StyledSpan>{articleDetails.price ? (articleDetails.price) : ('Aucune prix configuré')} <EditLogo src={edit_logo} alt="edit_logo" onClick={() => openModal("price")}/></StyledSpan></LiArticle>
                                    <LiArticle><LiTitle>Les images <EditLogo src={edit_logo} alt="edit_logo" onClick={() => openModal("pictures")}/></LiTitle>
                                        {
                                            articleDetails.article_pictures.length !==0 ? (
                                                articleDetails.article_pictures.map((image, index) => (
                                                    <ArticleVariantImage key={index} src={`data:image/${image.extention};base64,${image.content}`} alt={image.name} />
                                                ))
                                            ) : (
                                                <StyledSpan>Aucune image configurée</StyledSpan>
                                            )
                                        }
                                    </LiArticle>
                                </>
                            )
                        }
                        {
                            <LiArticle>
                                <LiTitle>Variants</LiTitle><StyledSpan>{ articleDetails.variants.length === 0 && ("Aucune variant n'a été trouvé, vous pouvez en ajouté ")}<EditLogo src={edit_logo} alt="edit_logo" onClick={() => openModal("variants")}/></StyledSpan>
                                <ul>
                                    {
                                        articleDetails.variants.map(variant => (
                                            <LiVariant key={variant.id}>
                                                <ul>
                                                    {
                                                        variant.color && (<LiVariantDetails><StyledSpan>couleur </StyledSpan>: {variant.color}</LiVariantDetails>)
                                                    }
                                                    {
                                                        variant.size && (<LiVariantDetails><StyledSpan>taille </StyledSpan>: {variant.size}</LiVariantDetails>)
                                                    }
                                                    {
                                                        variant.type && (<LiVariantDetails><StyledSpan>type </StyledSpan>: {variant.type}</LiVariantDetails>)
                                                    }
                                                    <LiVariantDetails><StyledSpan>prix </StyledSpan>: {variant.price}</LiVariantDetails>
                                                    <LiVariantDetails><StyledSpan>Status </StyledSpan>: {variant.is_sold ? ('Vendu') : ('Disponible')}</LiVariantDetails>
                                                    <LiVariantDetails><StyledSpan>Status de publication </StyledSpan>: {variant.is_active ? ('Publié') : ('Non publié')}</LiVariantDetails>
                                                </ul>
                                            </LiVariant>
                                        ))
                                    }
                                </ul>
                            </LiArticle>
                        }
                    </ListOl>
                </div>
            )}
        <ReactModal isOpen={isModalOpen} onRequestClose={closeModal} style={{ content: { width: '50%', height: '50%', margin: 'auto', top: '50%', transform: 'translateY(-50%)' } }}>
            <h2>Modifier</h2>
            {
                (editField==='category' || editField==='product') && <CategoryForm categoryList={categoryList.results} isEdit={articleDetails} closeModal={closeModal}/>
            }
            {
                editField==='name' && <Name isEdit={articleDetails} closeModal={closeModal}/>
            }
            {
                editField==='article_status' && <Status isEdit={articleDetails} closeModal={closeModal}/>
            }
            {
                editField==='article_is_active' && <IsPublished isEdit={articleDetails} closeModal={closeModal}/>
            }
            {
                editField==='price' && <Price isEdit={articleDetails} closeModal={closeModal}/>
            }
            {
                editField==='variants' && <Variants isEdit={articleDetails} closeModal={closeModal}/>
            }
            {
                editField==='pictures' && <Pictures isEdit={articleDetails} closeModal={closeModal}/>
            }
        </ReactModal>
        </FuturisticContainer>
    )
}

export default GetArticle