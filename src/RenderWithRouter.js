import React from 'react';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { Router } from 'react-router';

const RenderWithRouter = (component) => {
  const history = createMemoryHistory();
  return({
    ...render(<Router history={history}>{component}</Router>), history,
  })
}

export default RenderWithRouter;
