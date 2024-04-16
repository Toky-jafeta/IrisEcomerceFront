import { useForm } from "react-hook-form"
import { useUpdateArticleMutation } from "../../../../services/api.service"

function Price({isEdit=false, closeModal=null}){
    const {register, handleSubmit} = useForm()

    const [ updateArticleMutation ] = useUpdateArticleMutation()

    const onSubmit = async (data) => {
        console.log(data)
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
            <label htmlFor="">Prix : </label>
            <input type="number" {...register('price')} defaultValue={ isEdit ? (isEdit.price) : (0)}/>
            <input type="submit" value="Submit"/>
        </form>
    )
}

export default Price