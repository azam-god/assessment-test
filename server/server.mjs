import path from 'path';
import fs from 'fs';

import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import App from '../src/App';

const PORT = 8080;
const app = express();

const router = express.Router();

const serverRender = (req, res, next) => {
  fs.readFile(path.resolve('./build/index.html'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('An error occurred');
    }

    const context = {};
    const appHtml = ReactDOMServer.renderToString(
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    );

    if (context.url) {
      // Handle redirection if the StaticRouter sets a redirection URL
      res.writeHead(302, {
        Location: context.url,
      });
      res.end();
      return;
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
    );
  });
};

router.use('^/$', serverRender);

router.use(
  express.static(path.resolve(__dirname, '..', 'build'), { maxAge: '30d' })
);
app.use(router);
app.listen(PORT, () => {
  console.log(`SSR running on port ${PORT}`);
});
