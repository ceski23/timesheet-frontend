import React, { FC } from 'react';
import { guestRoutes } from 'routes';
import { renderRoutes } from 'react-router-config';

export const GuestContent: FC = () => (
  <>
    {renderRoutes(guestRoutes)}
  </>
);
