import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Home from '../screens/home/home';
import Library from '../screens/library/library';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Library} path="/library" />
        <Route component={Home} path="/" exact />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
