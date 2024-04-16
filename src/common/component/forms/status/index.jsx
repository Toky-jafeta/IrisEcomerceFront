import { useForm } from "react-hook-form"
import { useUpdateArticleMutation } from "../../../../services/api.service"

function Status({isEdit=false, closeModal=null}){
    const { register, handleSubmit} = useForm()

    const [updateArticleMutation] = useUpdateArticleMutation()

    const onSubmit = async (data) => {
        data.is_sold = data.is_sold === "true"
        if (isEdit){
            await updateArticleMutation({
                articleId: isEdit.id,
                data: data
            })
            closeModal()
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="">Vendu</label>
            <input {...register('is_sold')} type="radio" value="false" defaultChecked={isEdit && !isEdit.is_sold}/>
            <label htmlFor="">Disponible</label>
            <input {...register('is_sold')} type="radio" value="true" defaultChecked={isEdit && isEdit.is_sold}/>
            <input type="submit" value="Validé"/>
        </form>
    )
}

export default Status