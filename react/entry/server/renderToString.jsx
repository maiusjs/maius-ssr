import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from '../../App.jsx';

export default ({ ctx, store, context }) => renderToString((
  <StaticRouter location={ctx.url} context={context}>
    <Provider store={store}>
      <App/>
    </Provider>
  </StaticRouter>
));
