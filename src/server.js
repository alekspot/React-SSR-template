import React from 'react';
import { renderToString } from 'react-dom/server'; //рендерит элементы в строку,а не в DOM
import { StaticRouter } from 'react-router-dom'; //статичный роутер для сервера
import { matchRoutes, renderRoutes } from 'react-router-config';
import express from 'express';
import { Provider } from 'react-redux';
import serialize from 'serialize-javascript';
import '@babel/polyfill';

import Routes from './Routes';
import { store } from './store';
//статистика билдов и хэши скриптов(бандлов),которые вставляюся в html
import { assetsByChunkName } from '../dist/stats.json'; 

const app = express();

app.use(express.static('dist'));  //указываем раздачу папки dist

const renderer = (req, store, context) => { //выдает html-файлы

    // express передает location, когда пользователь переходит по пути
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={context}> 
        <div>{renderRoutes(Routes)}</div>
      </StaticRouter>
    </Provider>
  );

  return `<!DOCTYPE html>
  <html lang="ru">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <link rel="stylesheet" type="text/css" href="/${
        assetsByChunkName.main[0]
      }" />
      <title>React SSR</title>
    </head>
    <body>
      <div id="root">${content}</div>
      <script>
      window.__PRELOADED_STATE__ = ${serialize(store.getState()).replace( 
        /</g,
        '\\u003c'
      )}
      </script>
      <script src="/${assetsByChunkName.main[1]}"></script>
    </body>
  </html>`;
};

app.get('*', (req, res) => {
  const params = req.params[0].split('/');
  const id = params[2];

  const routes = matchRoutes(Routes, req.path);
    //для выполнения асинхронных запросов для заполнения разметки в html, после чего разметка отправляется клиенту
  const promises = routes
    .map(({ route }) => {
      return route.loadData ? route.loadData(store, id) : null; //в роутах ищем функции loadData которые передали через компонент и выполняем их
    })//в результате выполнения функций получается массив с промисами(возвращаемыми результаты асинхронных функций) или другими значениями
    .map(promise => {
      if (promise) {
        // eslint-disable-next-line no-unused-vars
        return new Promise((resolve, reject) => {
          promise.then(resolve).catch(resolve);
        });
      }
      return null;
    });

  Promise.all(promises).then(() => {
    const context = {};
    const content = renderer(req, store, context);

    if (context.notFound) {
      res.status(404);
    }

    res.send(content);
  });
});

app.listen(3000, () => {
  console.log('Server on port 3000');
});