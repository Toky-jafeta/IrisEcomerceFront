import { createSelector } from 'reselect';


export const getIsAuthenticated = (state) => state.auth && state.auth.isAuthenticated ? true : false

export const getTotalNumberItemInCards = (state) => state.list.articles.length !== 0 ? state.list.articles.length : 0

export const getListArticle = (state) => state.list.articles

export const getClientId = (state) => state.clients.ids[0]

export const getUniqueArticles = createSelector(
    (state) => state.list.articles,
    (articles) => {
        if (!Array.isArray(articles)) {
            return [];
        }

        const getTotalQuantity = (articleId) => {
            return articles.filter(({ id }) => id === articleId).length;
        };

        return Array.from(new Set(articles.map(({ id }) => id))).map(articleId => ({
            article: articles.find(({ id }) => id === articleId),
            quantity: getTotalQuantity(articleId)
        }));
    }
)

export const getTotalOrder = (state) => {
    const uniqueArticles = getUniqueArticles(state)

    return uniqueArticles.reduce((acc, { article, quantity }) => {
        return acc + (parseFloat(article.price) * quantity)
    }, 0)
}

export const getClient = (state) => state.clients.ids[0]