# generate-clean-url

generate-clean-url is a single method package for constructing a URL from component parts and getting the constructed string. This package is ideal for safely fail-safe constricting of URLs in back-end environment.

## Features

- Special characters encoding.
- Skipping undefined or empty query parameter strings.

## Installing

Using npm:

```bash
npm install generate-clean-url
```

Using yarn:

```bash
yarn add generate-clean-url
```

## Importing

CJS:

```javascript
const generateUrl = require('generate-clean-url');
```

EMS:

```javascript
import generateUrl from 'generate-clean-url';
```

## Using

```javascript
const baseUrl = "http://testurl.bitfinx.com/";

const params = {
    width: 360,
    height: 300,
    locale: 'en',
    toolbar_bg: '',
    interval: '3h',
    pair: 'BTC_USD'
};

const url = generateUrl(baseUrl, params);
```