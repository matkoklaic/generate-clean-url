# Table of Contents

- [Question 1](#q1)
- [Question 2](#q2)
- [Question 3](#q3)

## Q1 - Describe the process, in a react/redux project, to fetch a set of data from a remote API endpoint, then to store that data into redux and then to present it on the screen.

- create a new slice e.g. `remoteDatasetSlice` and combine it into the global Redux state/store for the sake of the separation of concerns principle for easier maintenance

- use `createAsyncThunk` from `@reduxjs/toolkit` to create an async thunk i.e. `fetchDataFromRemoteApi` with will have a call to the remote API and will dispatch async operation actions to the Redux store i.e. `fetchDataFromRemoteApi.pending`, `fetchDataFromRemoteApi.fulfilled`, `fetchDataFromRemoteApi.rejected`
 * create case reducer for `fetchDataFromRemoteApi.pending` to signify the data loading in progress state
 * create case reducer for `fetchDataFromRemoteApi.fulfilled` to signify completion of the API call
 * create case reducer for `fetchDataFromRemoteApi.rejected` to signify failure of the API call

- use `useSelector` hook in React component that is meant to use the data

```React
const MyComponent = () => {
    const loading = useSelector(state => state.remoteDatasetSlice.loading);
    const data = useSelector(state => state.remoteDatasetSlice.data);

    return (<></>);
}
```

- implement JSX conditional rendering to show loading indicator when `loading` is true or show the data when `loading` is fulfilled or show error message when `loading` is rejected

```JSX
{loading === 'pending' && <LoadingIndicator />}
{loading === 'fulfilled' && <Data data={data} />}
{loading === 'rejected' && <ErrorMessage />}
```


## Q2 - Create a function `generateUrl` to generate a URL from given parameters

I have crated an npm package `generate-clean-url` to generate a clean URL from given parameters. The package is available at https://www.npmjs.com/package/generate-clean-url and the source code is available at https://github.com/matkoklaic/generate-clean-url

## Q3 - Apply some refactoring to improve code of the following function. Explain the reason behind your changes and which benefits they bring into the code.


### Initial code

```javascript
var volumeSetup = function () {
// setup volume unit interface
var volumeUnit = window.APP.util.getSettings('ticker_vol_unit').toUpperCase();
var element = null;
if (volumeUnit === 'FIRSTCCY') {
element = $('#tickervolccy_0');
} else if (volumeUnit === 'USD') {
element = $('#tickervolccy_USD');
} else if (volumeUnit === 'BTC') {
element = $('#tickervolccy_BTC');
} else if (volumeUnit === 'ETH') {
element = $('#tickervolccy_ETH');
}
if (element) {
element.prop("checked", true);
}
// override currencies list
var result = window.APP.util.initCurrenciesList()
return result
}
```

### Step 1
- Actions: apply consistent line indentation
- Reasoning: improve code readability

### Step 2
- Actions: replace `var` with `const` or `let`
- Reasoning:
  - use `const` for variables that don't change
  - avoid polluting the global scope
    - the scope of a variable declared with `var` is enclosing function or the global scope if the variable is declared outside of any function like `volumeSetup`
    - `const` and `let` are block scoped - it is a good practice to avoid accidental reassignment of variables
    - `let` is used for variables that are meant to be changed
  

### Step 2
  - Actions: replace hardcoded string mapping into object
  - Reasoning:
    - improve readability

```javascript

const volumeSetup = function () {
  const mapping = {
    FIRSTCCY: "#tickervolccy_0",
    USD: "#tickervolccy_USD",
    BTC: "#tickervolccy_BTC",
    ETH: "#tickervolccy_ETH",
  };

  // setup volume unit interface
  let volumeUnit = window.APP.util.getSettings("ticker_vol_unit").toUpperCase();

  const element = Object.keys(mapping).find(key => volumeUnit === mapping[key]);
  if (element) {
    element.prop("checked", true);
  }
  // override currencies list
  let result = window.APP.util.initCurrenciesList();
  return result;
};
```

### Step 3
  - Actions:
    - separate client code and method implementation into separate modules
    - parametrize method with `mapping` object
  - Reasoning:
    - make method implementation more generic and reusable i.e. closed for change but open for extension
    - improve readability
    - improve testability

Client module

```javascript
  import volumeSetup from "./volumeSetup";

  const mapping = {
    FIRSTCCY: "#tickervolccy_0",
    USD: "#tickervolccy_USD",
    BTC: "#tickervolccy_BTC",
    ETH: "#tickervolccy_ETH",
  };

  volumeSetup(mapping);
```

Method implementation module

```javascript
const volumeSetup = function (mapping) {

  // setup volume unit interface
  let volumeUnit = window.APP.util.getSettings("ticker_vol_unit").toUpperCase();

  const element = Object.keys(mapping).find(key => volumeUnit === mapping[key]);
  if (element) {
    element.prop("checked", true);
  }
  // override currencies list
  let result = window.APP.util.initCurrenciesList();
  return result;
};

export default volumeSetup;
```

### Step 4
  - Actions:
    - extract and export method `getVolumeUnit`
    - export methods with named exports approach
      - use arrow function syntax for both methods
      - export `volumeSetup` with named export instead of the default export
  - Reasoning:
    - make module closed for change but open for extension
    - improve testability
    - improve readability
    - improve reusability

Client module

```javascript
  import { getVolumeUnit, volumeSetup } from "./volumeSetup";

  const volumeUnit = getVolumeUnit("ticker_vol_unit");

  const mapping = {
    FIRSTCCY: "#tickervolccy_0",
    USD: "#tickervolccy_USD",
    BTC: "#tickervolccy_BTC",
    ETH: "#tickervolccy_ETH",
  };

  volumeSetup(volumeUnit, mapping);
```

Method implementation module

```javascript
export const volumeSetup = (mapping) => {

  // setup volume unit interface
  let volumeUnit = window.APP.util.getSettings("ticker_vol_unit").toUpperCase();

  const element = Object.keys(mapping).find(key => volumeUnit === mapping[key]);
  if (element) {
    element.prop("checked", true);
  }
  // override currencies list
  let result = window.APP.util.initCurrenciesList();

  return result;
};

export const getVolumeUnit = (settingKey) => {
  return window.APP.util.getSettings(settingKey).toUpperCase();
};
```


