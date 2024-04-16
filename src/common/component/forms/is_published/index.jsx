import { useForm } from "react-hook-form"
import { useUpdateArticleMutation } from "../../../../services/api.service"

function IsPublished({isEdit=false, closeModal=null}){
    const {register, handleSubmit} = useForm()

    const [ updateArticleMutation ] = useUpdateArticleMutation()

    const onSubmit = async (data) => {
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
            <label htmlFor="">Publié</label>
            <input type="checkbox" {...register('is_active')} />
            <input type="submit" value="Submit"/>
        </form>
    )
}

export default IsPublished