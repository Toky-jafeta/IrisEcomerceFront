import { useForm } from "react-hook-form"
import { useCreateArticleMutation, useGetCategoryListQuery } from "../../../../../services/api.service"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 20px auto;
    padding-bottom: 40px;
    padding-left: 40px;
    padding-right: 40px;
    width: 50%;
    height: 60vh;
    background-color: #d3d3d3;
    border-radius: 10px;
`

const FormLabel = styled.label`
    font-size: 20px;
    margin: 5px;
    text-align: left;
`

const FormInput = styled.input`
    font-size: 18px;
    height: 50px;
`

const FormSelect = styled.select`
    font-size: 18px;
    height: 50px;
    background-color: white;
    border: none;
`

const FormSelectOption = styled.option`
    border: none;
`

const FormSubmit = styled.input`
    font-size: 18px;
    height: 50px;
    margin-top: 20px;
`


const FormTitle = styled.h1`
    font-size: 24px;

`

function ArticleCreate(){
    const { register, handleSubmit, setValue } = useForm()
    const navigate = useNavigate()
    const { data: categoryList } = useGetCategoryListQuery()
    const [filteredProduct, setFilteredProduct] = useState([])

    const [ creationArticleMutation ] = useCreateArticleMutation()

    const onSubmit = async (data) => {
        data.product = Number(data.product)
        const response = await creationArticleMutation({
            data:data
        })
        navigate(`/workspace/article/${response.data.id}`)
    }

    const handleOnChangeCategory = (e) => {
        const categoryId = e.target.value
        const category = categoryList.results.find(category => category.id === Number(categoryId))
        setFilteredProduct(category.products)
    }

    useEffect(() => {
        if (categoryList.results.length > 0) {
            const categoryId = categoryList.results[0].id
            const category = categoryList.results.find(category => category.id === Number(categoryId))
            setFilteredProduct(category.products)
            setValue('product', category.products.length > 0 ? category.products[0].id : null)
        }
    }, [categoryList, setValue])

    return (
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <FormTitle>Créer une article</FormTitle>
            <FormLabel htmlFor="">Nom</FormLabel>
            <FormInput type="text" {...register('name')} placeholder="Nom" required/>
            <FormLabel htmlFor="">Categorie</FormLabel>
            <FormSelect {...register('category')} onChange={handleOnChangeCategory}>
                {
                    categoryList.results.map((category) => (
                        <FormSelectOption key={category.id} value={category.id}>{category.name}</FormSelectOption>
                    ))
                }
            </FormSelect>
            <FormLabel htmlFor="">Produit</FormLabel>
            <FormSelect {...register('product')}>
                {
                    filteredProduct.length === 0 ? (
                        <FormSelectOption value={null}>Aucune produit</FormSelectOption>
                    ) : (
                        filteredProduct.map((product) => (
                            <FormSelectOption key={product.id} value={product.id}>
                                {product.name}
                            </FormSelectOption>
                        ))
                    )
                }
            </FormSelect>
            <FormSubmit type="submit" value="Enregistrer"/>
        </FormContainer>
    )
}

export default ArticleCreate