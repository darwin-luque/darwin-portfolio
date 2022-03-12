import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Layout from '../components/layout/layout';
import Home from '../screens/home/home.screen';
import Library from '../screens/library/library.screen';

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route component={Library} path="/library" />
          <Route component={Home} path="/" exact />
          <Redirect to="/" />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
