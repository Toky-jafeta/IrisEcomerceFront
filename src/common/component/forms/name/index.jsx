import { useForm } from "react-hook-form"
import { useUpdateArticleMutation } from "../../../../services/api.service"

function Name({isEdit=false, closeModal=null}){
    const {register, handleSubmit} = useForm()

    const [updateArticleMutation] = useUpdateArticleMutation()

    const onSubmit = async (data) => {
        await updateArticleMutation({
            articleId: isEdit.id,
            data: data
        })
        closeModal()
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="">Nom de l'article : </label>
            <input type="text" {...register('name')} defaultValue={isEdit.Name}/>
            <input type="submit" value="Enregistrer" />
        </form>
    )
}

export default Name