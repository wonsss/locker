import Layout from 'Layout';
import { Route, Routes as ReactRouterRoutes, Navigate } from 'react-router-dom';

import { HomePage, LockerPage, NamePage, ResultPage } from 'pages';

const Routes = () => {
  return (
    <ReactRouterRoutes>
      <Route element={<Layout />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/name" element={<NamePage />} />
        <Route path="/locker" element={<LockerPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="*" element={<Navigate replace to="/home" />} />
      </Route>
    </ReactRouterRoutes>
  );
};

export default Routes;
