import { useStore } from "react-redux"
import { loginSlice } from "../login/loginSlice"
import { useNavigate } from "react-router-dom"
import { Outlet } from "react-router-dom"
import styled from "styled-components"
import { NavLink } from "react-router-dom"


const BandeDesign = styled.div`
    background-color: #2c1541;
    height: 10vh;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.5);
`

const BandeDesignButton = styled.button`
    background-color: transparent;
    border: none;
    color: white;
    font-size: 16px;
    cursor: pointer;
    margin-right: 20px;
`

const ArrowIcon = styled.span`
    display: inline-block;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 7px solid white;
    margin-left: 5px;
`

const WorkSpaceSection = styled.section`
    display: flex;
`

const WorkSpaceSectionArticleMenu = styled.article`
    width: 15%;
    height: 90vh;
    background-color:#5c3c92;
    color: white;
    border-right: solid;
`

const WorkSpaceSectionArticleMenuListMenu = styled.div`
    display: flex;
    flex-direction: column;
`

const WorkSpaceSectionArticleMenuListMenuNavLink = styled(NavLink)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    padding-left: 15px;
    padding-right: 15px;
    text-decoration: none;
    color: white;
    &.active {
        background-color: #2c1541;
        border-radius: 0px 50px;
    }
`

const WorkSpaceSectionArticleContent = styled.article`
    width: 85%;
    padding-top: 20px;
`


function WorkSpace(){
    const store = useStore()
    const navigate = useNavigate()
    const handleLogout = () => {
        store.dispatch(loginSlice.actions.logout())
        navigate("/login")
    }

    return (
        <div>
            <BandeDesign>
                <BandeDesignButton onClick={handleLogout}>Déconnexion <ArrowIcon /></BandeDesignButton>
            </BandeDesign>
            <WorkSpaceSection>
                <WorkSpaceSectionArticleMenu>
                    <h1>Menu</h1>
                    <WorkSpaceSectionArticleMenuListMenu>
                        <WorkSpaceSectionArticleMenuListMenuNavLink to="dashboard">Dashboard</WorkSpaceSectionArticleMenuListMenuNavLink>
                        <WorkSpaceSectionArticleMenuListMenuNavLink to="article/list">Gestion des articles</WorkSpaceSectionArticleMenuListMenuNavLink>
                    </WorkSpaceSectionArticleMenuListMenu>
                </WorkSpaceSectionArticleMenu>
                <WorkSpaceSectionArticleContent>
                    <Outlet />
                </WorkSpaceSectionArticleContent>
            </WorkSpaceSection>
        </div>
    )
}

export default WorkSpace