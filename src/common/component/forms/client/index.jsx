import { useForm } from "react-hook-form"
import { useDispatch, useSelector, useStore } from "react-redux"
import styled from "styled-components"
import { ClientSlice, clientSelectors } from "../../../../features/client/clientSlice"
import { useCreateCartMutation, useCreateClientMutation } from "../../../../services/api.service"
import { CartSlice } from "../../../../features/shoppingCard/cartSlice"
import { getTotalOrder } from "../../../../app/selectors"
import edit from "../../../../assets/edit.png"

const SectionClient = styled.section`
    position: relative;
    width: 100%;
    background: #fff;
    padding: 25px;
    border-radius: 8px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
    height:80vh;
`

const SectionClientForm = styled.form`
    margin-top: 30px;
`

const SectionClientFormHeader = styled.header`
    font-size: 1.5rem;
    color: #333;
    font-weight: 500;
    text-align: center;
`

const FormGroup = styled.div`
    width: 100%;
    margin-top: 20px;
`

const Label = styled.label`
    color: #333;
`

const Input = styled.input`
    position: relative;
    height: 50px;
    width: 100%;
    outline: none;
    font-size: 1rem;
    color: #707070;
    margin-top: 8px;
    border: 1px solid #ddd;
    border-radius: 6px;

    &:focus{
        box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
    }
`

const Textarea = styled.textarea`
    margin-top: 15px;
    width: 100%;
    height: 150px;
    resize: none;
`

const Button = styled.button`
    height: 55px;
    width: 100%;
    color: #fff;
    font-size: 1rem;
    font-weight: 400;
    margin-top: 30px;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    background: rgb(130, 106, 251);
    &:hover{
        background: rgb(88, 56, 250);
    }
`

const GroupFormGroup = styled.div`
    display: flex;
    column-gap: 15px;
`

const DivClientInformation = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
`
const ImgEdit = styled.img`
    height: 2vh;
`

function ClientForm() {
    const store = useStore()

    const client = useSelector((state) => {
        const clientId = clientSelectors.selectIds(state)[0]
        return clientSelectors.selectById(state, clientId)
    })

    const tota_price = useSelector(getTotalOrder)

    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()

    const [createClient] = useCreateClientMutation()
    const [createCart] = useCreateCartMutation()

    const onSubmit = async (data) => {
        try {
            const response = await createClient({
                data: data
            })

            dispatch(ClientSlice.actions.addClient({
                content: data,
                id: response.data.id
            }))

            const updatedClient = clientSelectors.selectById(store.getState(), response.data.id)
            const response_create_cart = await createCart({
                data: {
                    client: updatedClient.id,
                    total_price: tota_price
                }
            })

            dispatch(CartSlice.actions.addCart({
                id: response_create_cart.data.id 
            }))
        } catch {
            throw new Error('Une erreur s\'est produite lors de la création du client')
        }
    }

    return (
        <SectionClient>
            {
                client ? (
                    <DivClientInformation>
                        <h1>INFORMATIONS <ImgEdit src={edit} alt="edit" /></h1>
                        <h3>Envoyé le courier à : {client.content.lastname} {client.content.firstname} à l'adresse: {client.content.address}</h3>
                        <p>Numero téléphone: {client.content.phone_number}</p>
                        {
                            client.content.mail && <p>Email: {client.content.mail}</p>
                        }
                        {
                            client.content.localization && <p>Localisation: {client.content.localization}</p>

                        }
                        <Button>Validé ma commande</Button>
                    </DivClientInformation>
                ) : (
                    <div>
                        <SectionClientFormHeader>Enregistrer vos données clients</SectionClientFormHeader>
                        <SectionClientForm onSubmit={handleSubmit(onSubmit)}>
                            <FormGroup>
                                <Label htmlFor="lastname">Nom</Label>
                                <Input type="text" {...register('lastname')} required />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="firstname">Prénom</Label>
                                <Input type="text" {...register('firstname')} required />
                            </FormGroup>
                            <GroupFormGroup>
                                <FormGroup>
                                    <Label htmlFor="phone_number">Numero télephone</Label>
                                    <Input type="number" {...register('phone_number')} required />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="mail">Email</Label>
                                    <Input type="email" {...register('mail')} />
                                </FormGroup>
                            </GroupFormGroup>
                            <FormGroup>
                                <Label htmlFor="address">Adresse</Label>
                                <Textarea cols="30" rows="10" {...register('address')} required></Textarea>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="localization">Localisation</Label>
                                <Textarea cols="30" rows="10" {...register('localization')}></Textarea>
                            </FormGroup>
                            <Button>Créer données client</Button>
                        </SectionClientForm>
                    </div>
                )
            }
        </SectionClient>
    )
}

export default ClientForm
