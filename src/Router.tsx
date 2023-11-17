import React, { useEffect } from 'react';

import { AppShell, Header, Navbar } from '@mantine/core';
import ErrorBoundary from 'components/ErrorBoundary';
import Loading from 'pages/shared/Loading';
import { refreshAccessToken } from 'service/authApi';
import { storage } from 'utils/storage';

import { useUser } from './query/auth';
import Authenticated from './routes/Authenticated';
import Unauthenticated from './routes/Unauthenticated';

const Router = (): JSX.Element => {
  const user = useUser();
  useEffect(() => {
    const refreshTokenAndGetUser = async (): Promise<void> => {
      try {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { refresh } = storage.getToken();
        const response = await refreshAccessToken(refresh);

        storage.setToken(response);
      } catch (e) {
        storage.clearToken();
      }
    };

    refreshTokenAndGetUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ErrorBoundary errorMessage={<div>Error</div>}>
      <React.Suspense fallback={<Loading />}>
        {user ? <Authenticated /> : <Unauthenticated />}
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default Router;
