import { useFieldArray, useForm } from "react-hook-form"
import { useUpdateVariantMutation } from "../../../../services/api.service"


function Variants({isEdit=false, closeModal=null}){
    const { control, register, handleSubmit } = useForm({
        defaultValues: {
            variant: isEdit.variants
        }
    })

    const [updateVariantMutation] = useUpdateVariantMutation()

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'variant'
    })

    const onSubmit = async (data) => {
        const filteredData = data.variant.filter(variant => 
            variant.color.trim() !== '' || variant.type.trim() !== '' || variant.size.trim() !== ''
        )
        if (isEdit){
            await updateVariantMutation({
                articleId: isEdit.id,
                data: filteredData
            })
            closeModal()
        }
    }
    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Variants</h1>
            {
                fields.map((item, index) => (
                    <div key={item.id}>
                        <label htmlFor="">Couleur : </label>
                        <input type="text" {...register(`variant.${index}.color`)} />
                        <label htmlFor="">Taille : </label>
                        <input type="text" {...register(`variant.${index}.size`)} />
                        <label htmlFor="">Type : </label>
                        <input type="text" {...register(`variant.${index}.type`)} />
                        <label htmlFor="">Price : </label>
                        <input type="number" {...register(`variant.${index}.price`)} />
                        <label htmlFor="">Vendue : </label>
                        <input type="checkbox" {...register(`variant.${index}.is_sold`)} />
                        <label htmlFor="">Publié : </label>
                        <input type="checkbox"{...register(`variant.${index}.is_active`)} />
                        <button type="button" onClick={()=>{remove(index)}}>X</button>
                    </div>
                ))
            }
            <button type="button" onClick={() => {
                append({
                    color: '',
                    type:'',
                    size: '',
                    price:0,
                    is_sold: false,
                    is_active: false
                })
            }}>Ajouté</button>
            <input type="submit" value="Enregistré"/>
        </form>
    )   
}

export default Variants