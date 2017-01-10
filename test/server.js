import React from 'react';
import ReactDOMServer from 'react-dom/server';
import RenderConfig from './utils/renderConfig';

const express = require('express');

const app = express();

app.use(express.static('views'));

app.get('/__ping', (req, res) => res.send(''));

app.get('/:name', (req, res) => {
  const componentName = req.params.name || 'ClassicGrid';
  const {
    Component,
    styles = '',
    props: extra = {},
  } = RenderConfig[componentName];

  const props = { ...extra, ...req.query };
  const serverHtml = ReactDOMServer.renderToString(<Component {...props} />);
  const renderProps = JSON.stringify(props);
  const data = { componentName, styles, serverHtml, renderProps };
  res.render('index.ejs', data);
});

app.listen(3000, () => {
    // console.log('Example app listening on port 3000!');
});
