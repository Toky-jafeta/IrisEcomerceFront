    import { useRef, useState } from "react"
    import { useForm } from "react-hook-form"
    import styled from "styled-components"
import { useUpdateArticleMutation } from "../../../../services/api.service"

    const ArticleVariantImage = styled.img`
        max-height: 100px;
        margin: 5px;
    `

    const AddArticleButtonImage = styled.button`
        min-height: 100px;
        min-width:100px;
        margin: 5px;
    `

    function Pictures({isEdit=false, closeModal=null}){
        const {handleSubmit} = useForm()
        const fileInputRef = useRef(null);
        const [images, setImages] = useState(isEdit.article_pictures ? isEdit.article_pictures.map((image, index) => ({
            key: index,
            id: image.id,
            name: image.name,
            content: `data:image/${image.extension};base64,${image.content}`,
            extension: image.extension
        })) : [])

        const [updateArticle] = useUpdateArticleMutation()

        const handleAddImageClick = () => {
            fileInputRef.current.click()
        }

        const handleFileChange = (event) => {
            const fileList = event.target.files
            const imageArray = [...fileList].map(file => ({
                name: file.name,
                content: URL.createObjectURL(file),
                blob: file,
                extension: file.name.split('.').pop()
            }));
            setImages(prevImages => [...prevImages, ...imageArray])
        }

        const onSubmit = async () => {
            const data = images.map((index) => (
                index.id ? (index.id) : (index.blob)
            ))

            await updateArticle ({
                articleId:isEdit.id,
                data:{
                    article_pictures: data
                }
            })
            closeModal()
        }

        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                {
                    images.length !==0 && (
                        images.map((image, index) => (
                            <div key={index}>
                                <ArticleVariantImage src={image.content} alt={image.name} />
                                <button type="button" onClick={() => setImages(prevImages => prevImages.filter((_, i) => i !== index))}>X</button>
                            </div>
                        ))
                    )
                }
                <AddArticleButtonImage onClick={handleAddImageClick} type='button'>+</AddArticleButtonImage>
                <input type="file" style={{display: "none"}} ref={fileInputRef} onChange={handleFileChange} multiple/>
                <input type="submit" value="Enregistrer"/>
            </form>
        )
    }
    export default Pictures