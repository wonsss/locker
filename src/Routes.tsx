import { Route, Routes as ReactRouterRoutes } from 'react-router-dom';

import {
  HomePage,
  LockerPage,
  NamePage,
  NotFoundPage,
  ResultPage,
} from 'pages';

const Routes = () => {
  return (
    <ReactRouterRoutes>
      <Route index element={<HomePage />} />
      <Route path="/name" element={<NamePage />} />
      <Route path="/locker" element={<LockerPage />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </ReactRouterRoutes>
  );
};

export default Routes;
