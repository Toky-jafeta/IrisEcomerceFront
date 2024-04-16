import styled from "styled-components"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import see from "../../../../assets/see.png"
import { useGetMinimalPriceQuery } from "../../../../services/api.service";
import { useStore } from "react-redux";
import { CardSlice } from "../../../../features/home/cartSlice";
import ReactModal from "react-modal";
import { useState } from "react";


const SectionProduct = styled.section`
    display: flex;
    width:90%;
    margin-left: 100px;
    margin-top: 50px;
    margin-bottom: 50px;
    padding: 2.5em 0;
    min-width: 600px;
    background-color: #d3d3d3;
    border-radius: 5px;
`

const ProductImg = styled.img`
    max-height: 70px;;
    filter: drop-shadow(1px 1px 3px $color-secondary);
`

const ProductH3 = styled.h3`
    font-size: 0.7em;
    letter-spacing: 1.2px;
`

const ProductPhotoContainer = styled.div`
    
    width:50%;
    height:100%;
    position: relative;
    left: -2.5em;
    border-radius: 6px;
    box-shadow: 4px 4px 25px -2px rgba(0, 0, 0, 0.3);
    
`

const ProductInfo = styled.div`
    padding: 0.8em 0;
    width:50%;
    align-items: center;
`

const ProductInfoTitle = styled.div`
    h1 {
        margin-bottom: 0.1em;
        color: $color-primary;
        font-size: 1.5em;
        font-weight: 900;
    }
`

const ProductInfoPrice = styled.div`
    margin: 1.5em 0;
    color: $color-highlight;
    font-size: 1.2em;

    span {
        padding-left: 0.15em;
        font-size: 2.9em;
    }
`

const ProductInfoVariant = styled.div`
    overflow: auto;
`

const ProductInfoDescription = styled.div`
    clear: left;
    margin: 2em 0;

    h3 {
        margin-bottom: 1em;
    }

    p {
        font-size: 0.8em;
        list-style: disc;
        margin-left: 1em;
    }
`

const ProductCartButton = styled.button`
    padding: 1.5em 3.1em;
    border: none;
    border-radius: 10px 0px 0px 10px;
    font-size: 0.8em;
    font-weight: 700;
    letter-spacing: 1.3px;
    color: #fff;
    background-color: #fb5043;
    box-shadow: 2px 2px 25px -7px black;
    cursor: pointer;

    &:active {
        transform: scale(0.97);
    }
`

const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    adaptiveHeight: false,
}


const ImageSlide = styled.img`
    object-fit : cover;
    width : 100%;
    height : 650px;
    border-radius: 10px;
`

const DivButton = styled.div`
    display: flex;
    justify-content: center;
    height: 10%;
`

const SeeButton = styled.button`
    width: 55px;
    border:none;
    border-radius: 0px 10px 10px 0px;
    box-shadow: 2px 2px 25px -7px black;
    cursor: pointer;
`

const SeeImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`

const ParagraphNoneImage = styled.p`
`

const LuListeVariante = styled.ul`
    list-style-type: none;
    display: flex;
    justify-content: center;
`

const LiVariante = styled.li`
    cursor: pointer;
`

const DivPicturesModal = styled.div`
    width:100%;
    height:50%;
`

const SlideModal = styled(Slider)`
    width: 100%;
    height: 50%;
    object-fit: contain;
`

function CustomSlide(props) {
    const {picture , ...otherProps  } = props;

    return (
        <div style={{ height : "100%" , ...otherProps.styles}}>
            {
                picture && (
                    <ImageSlide src={`data:image/${picture.extension};base64,${picture.content}`} alt={picture.name} />
                )
            }
        </div>
    )
}

function ProductCart({article}){
    const {data: minimalPrice} = useGetMinimalPriceQuery({ article_id: article.id }, {skip: article.variants.length === 0})
    const store = useStore()


    const addProduct = async (article) =>{
        try{
            store.dispatch(
                CardSlice.actions.addProduct(article)
            )
        } catch{

        }
    }

    const [isModalOpen, setIsModalOpen] = useState(false);

    
    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    return (
        <SectionProduct>
            <ProductPhotoContainer>
                <Slider {...settings}>
                    {
                        article.article_pictures.length !== 0 ? (
                            article.article_pictures.map((picture ,index) => (
                                <CustomSlide key={index} picture={picture}/>
                            ))
                        ) : (
                            <ParagraphNoneImage>Aucune image</ParagraphNoneImage>
                        )
                    }
                </Slider>
            </ProductPhotoContainer>
            <ProductInfo>
                <ProductInfoTitle>
                    <h1>{article.name}</h1>
                </ProductInfoTitle>
                <ProductInfoPrice>
                    <p>
                        {
                            article.variants.length !== 0 && (
                                'à partir de '
                            )
                        } Ar <span>{article.variants.length === 0 ? article.price : (minimalPrice && minimalPrice.minimal_price)}</span>
                    </p>
                </ProductInfoPrice>
                {
                    (article.variants.length !== 0 && article.variants.some(variant => variant.price)) && (
                        <>
                            <ProductInfoVariant>
                                <ProductH3>Selectionné une variante pour cette article</ProductH3>
                                <LuListeVariante>
                                    {
                                        article.variants.map((variant, index) => (
                                            variant.price && (
                                                <LiVariante key={index}>
                                                    <ProductImg src="https://res.cloudinary.com/john-mantas/image/upload/v1537302064/codepen/delicious-apples/green-apple2.png" alt="green apple" />
                                                </LiVariante>
                                            )
                                        ))
                                    }
                                </LuListeVariante>
                            </ProductInfoVariant>
                        </>
                    )
                }
                <ProductInfoDescription>
                    <ProductH3>DESCRIPTION</ProductH3>
                    <p>
                        {article.description ? article.description : 'Aucune description laissé par le vendeur'}
                    </p>
                </ProductInfoDescription>
                {
                    article.variants.length === 0 && (
                        <DivButton>
                            <ProductCartButton onClick={() => addProduct(article)}>AJOUTER AU PANIER</ProductCartButton>
                            <SeeButton onClick={openModal}><SeeImg src={see} alt="voir" /></SeeButton>
                        </DivButton>
                    )
                }
            </ProductInfo>
            <ReactModal isOpen={isModalOpen} onRequestClose={closeModal} style={{ overlay: { zIndex: 1000}, content: { width: '35%', height: '85%', margin: 'auto', top:'90%', transform: 'translateY(-50%)' } }}>
                <DivPicturesModal>
                    <SlideModal {...settings}>
                        {
                            article.article_pictures.length !== 0 ? (
                                article.article_pictures.map((picture ,index) => (
                                    <CustomSlide key={index} picture={picture}/>
                                ))
                            ) : (
                                <ParagraphNoneImage>Aucune image</ParagraphNoneImage>
                            )
                        }
                    </SlideModal>
                </DivPicturesModal>
            </ReactModal>
        </SectionProduct>

    )
}

export default ProductCart