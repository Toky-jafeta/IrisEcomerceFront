import { Link, useNavigate } from "react-router-dom"
import { loginSlice } from "./loginSlice"
import { useSelector, useStore } from "react-redux"
import { getIsAuthenticated } from "../../../app/selectors"
import { useEffect } from "react"
import styled from "styled-components"


const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
`

const LoginTitle = styled.h1`
    text-align: center;
    font-size: 32px;
`

const LoginForm = styled.form`
    width: 300px;
    background-color: #1e213a;
    padding: 20px;
    border-radius: 10px;
    border-top: 4px solid #19d4ca;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    gap: 10px;
    @media (max-width: 768px) {
        width: 100%;
    }
`

const LoginFormInput = styled.input`
    padding: 10px;
    border: none;
    background-color: transparent;
    border-bottom: 1px solid #ccc;
    color: #fff;
    transition: box-shadow 0.3s;

    &:focus{
        box-shadow: 0 0 10px #19d4ca;
    }

    @media (max-width: 768px) {
        width: 75%;
        margin: 0 auto;
    }

`

const LoginFormButton = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
    @media (max-width: 768px) {
        width: 75%;
        margin-right: 25%;
    }

`

const LoginFormSubmitButton = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s, box-shadow 0.3s, color 0.3s;
    text-decoration: none;
    background-color: transparent;
    color: #19d4ca;
    &:hover{
        background-color: #19d4ca;
        color: #fff;
        box-shadow: none;
    }
    &:active{
        box-shadow: 0 0 10px #19d4ca;
    }
`
const LoginFormSignupButton = styled(Link)`
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s, box-shadow 0.3s, color 0.3s;
    text-decoration: none;
    color: #ccc;
    background-color: transparent;
    &:hover{
        color: #fff;
    }
    &:active{
        box-shadow: 0 0 10px #ccc;
    }
`



function Login(){
    const store = useStore()
    const navigate = useNavigate()
    const isAuthenticated = useSelector(getIsAuthenticated)

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (event.target.username.value && event.target.password.value) {
            try {
                const response = await fetch('http://127.0.0.1:8000/v1/user/login/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ "username": event.target.username.value, "password":  event.target.password.value }),
                })
                const userData = await response.json()
                if (userData.error){
                    store.dispatch(loginSlice.actions.loginError(userData))
                } else {
                    store.dispatch(loginSlice.actions.loginSuccess(userData))
                    navigate("/workspace/dashboard")
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
    useEffect(() => {
        if (isAuthenticated) {
          navigate("/workspace/dashboard");
        }
      }, [isAuthenticated, navigate]);

    return (
        <LoginContainer>
            <LoginTitle>Connexion</LoginTitle>
            <LoginForm onSubmit={handleSubmit}>
                <LoginFormInput type="text" id="username" name="username" placeholder="username"/> <br/>
                <LoginFormInput type="password" id="password" name="password" placeholder="password"/><br/>
                <LoginFormButton>
                    <LoginFormSignupButton to="/signup">S'inscrire</LoginFormSignupButton>
                    <LoginFormSubmitButton type="submit">Se connecter</LoginFormSubmitButton>
                </LoginFormButton>
            </LoginForm>
        </LoginContainer>
    )
}

export default Login
