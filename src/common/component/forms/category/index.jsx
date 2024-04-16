import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useUpdateArticleMutation } from "../../../../services/api.service";

function CategoryForm({ categoryList, isEdit = false, closeModal=null}) {
    const { register, handleSubmit, setValue } = useForm()
    const [filteredProduct, setFilteredProduct] = useState([])

    const [updateArticleMutation] = useUpdateArticleMutation()

    const onSubmit = async data => {
        if (isEdit){
            data.product = Number(data.product)
            delete data.category    
            await updateArticleMutation({
                articleId: isEdit.id,
                data: data
            })
        }
        closeModal()
    }

    useEffect(() => {
        if (categoryList.length > 0) {
            const categoryId = categoryList[0].id;
            const category = categoryList.find(category => category.id === Number(categoryId));
            setFilteredProduct(category.products);
            setValue('product', category.products.length > 0 ? category.products[0].id : null);
        }
    }, [categoryList, setValue])

    const handleOnChangeCategory = (e) => {
        const categoryId = e.target.value
        const category = categoryList.find(category => category.id === Number(categoryId))
        setFilteredProduct(category.products)
    }

    const handleOnChangeProduct = (e) => {
        const productId = e.target.value
        setValue('product', parseInt(productId, 10))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="">Category : </label>
            <select {...register('category')} onChange={handleOnChangeCategory}>
                {
                    categoryList.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))
                }
            </select>
            <label htmlFor="">Produit : </label>
            <select {...register('product')} onChange={handleOnChangeProduct}>
                {
                    filteredProduct.length === 0 ? (
                        <option value={null}>Aucune produit</option>
                    ) : (
                        filteredProduct.map((product) => (
                            <option key={product.id} value={product.id} selected={isEdit && isEdit.product && product.id === isEdit.product.id}>
                                {product.name}
                            </option>
                        ))
                    )
                }
            </select>
            <button type="submit">Submit</button>
        </form>
    )
}

export default CategoryForm