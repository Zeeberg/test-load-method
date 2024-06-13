/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';
require('dotenv').config();
const autocannon = require('autocannon');
const { URL } = require('url');

async function test() {
  const port = process.env.APP_PORT;
  const indexed = process.argv.includes('indexed');
  const exampleSearch = 'test';

  const url = new URL(`http://localhost:${port}/documents/search`);
  url.searchParams.set('search', exampleSearch);
  url.searchParams.set('indexed', indexed);

  const instance = autocannon({
    url: url.href,
  });

  autocannon.track(instance);
}

test();
