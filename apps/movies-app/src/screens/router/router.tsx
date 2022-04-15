import { lazy } from 'solid-js';
import { Route, Routes, Router as _Router } from 'solid-app-router';
import Layout from '../../components/layout/layout';

const HomeScreen = lazy(() => import('../home/home.screen'));

const Router = () => {
  return (
    <_Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
        </Routes>
      </Layout>
    </_Router>
  );
};

export default Router;
