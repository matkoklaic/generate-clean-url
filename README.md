# generate-clean-url

generate-clean-url is a single method package for constructing a URL from component parts and getting the constructed string. This package is ideal for safely fail-safe constricting of URLs in back-end environment.

## Features

- Special characters encoding.
- Skipping undefined or empty query parameter strings.

## Installation

To install the package, run the following command:

```bash
npm install generate-clean-url
```

## Usage

```javascript
const generateUrl = require('generate-clean-url');

const params = {
    width: 360,
    height: 300,
    locale: 'en',
    toolbar_bg: '',
    interval: '3h',
    pair: 'BTC_USD'
};

const url = generateUrl(params);
```