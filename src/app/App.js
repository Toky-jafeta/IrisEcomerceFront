import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux';
import Home from '../features/home/home';
import Login from '../features/workspace/login/login';
import WorkSpace from '../features/workspace/workspace/workspace';
import Signup from '../features/workspace/signup/signup';
import Error from '../features/error/error';
import { store } from './store';
import ProtectRoutes from '../common/component/protectroutes';
import List from '../features/workspace/workspace/list/list';
import DashBoard from '../features/workspace/workspace/dashboard/dashboard';
import GetArticle from '../features/workspace/workspace/articles/get/getarticle';
import ArticleHeader from '../features/workspace/workspace/articles/article';
import ArticleCreate from '../features/workspace/workspace/articles/post';
import ShoppingCard from '../features/shoppingCard';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/shopping-card' element={<ShoppingCard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/workspace' element={<ProtectRoutes><WorkSpace /></ProtectRoutes>}>
              <Route path='article' element={<ArticleHeader />}>
                <Route path='list' element={<List />} />
                <Route path='create' element={<ArticleCreate />} />
              </Route>
              <Route path='dashboard' element={<DashBoard />} />
              <Route path='article/:articleId' element={<GetArticle />}>
              </Route>
            </Route>
            <Route path="*" element={<Error />}/>
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;