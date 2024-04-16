import { NavLink, Outlet } from "react-router-dom"
import styled from "styled-components"

const ArticleHeaderContainer = styled.div`

`

const ArticleHeaderLink = styled.div`
    display: flex;
    justify-content: center;
    width: 30%;
    margin: 0 auto;

    & > * {
        margin-right: 20px;
        text-decoration: none;
        color: white;
    }
`

const LinkStyled = styled(NavLink)`
    padding: 21px;
    margin: 0 auto;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    color: black;
    border: solid #2c1541 1px;

    &:first-child {
        border-top-left-radius: 30px;
        border-bottom-left-radius: 30px;
    }

    &:last-child {
        border-top-right-radius: 30px;
        border-bottom-right-radius: 30px;
    }
    &.active {
        background-color: #2c1541;
        color: white;
    }
`

function ArticleHeader(){
    return (
        <ArticleHeaderContainer>
            <ArticleHeaderLink>
                <LinkStyled to="/workspace/article/list">Liste des articles</LinkStyled>
                <LinkStyled to="/workspace/article/create">Créer une articles à vendre</LinkStyled>
            </ArticleHeaderLink>
            <Outlet />
        </ArticleHeaderContainer>
    )
}


export default ArticleHeader