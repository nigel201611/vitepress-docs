# Frontend Testing

## Jest Testing Study Outline

<br/>
<img src="/images/jestTest.png" alt="Jest testing study outline">

### Basic API

* Matchers in Jest
```js
  // Truthiness
  test('null', () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});
// Numbers
test('two plus two', () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);
  expect(value).toBe(4);
  expect(value).toEqual(4);
});
// Strings
test('there is no I in team', () => {
  expect('team').not.toMatch(/I/);
});

test('but there is a "stop" in Christoph', () => {
  expect('Christoph').toMatch(/stop/);
});
// Arrays and iterables
const shoppingList = [
  'diapers',
  'kleenex',
  'trash bags',
  'paper towels',
  'milk',
];
test('the shopping list has milk on it', () => {
  expect(shoppingList).toContain('milk');
  expect(new Set(shoppingList)).toContain('milk');
});

// Exceptions
function compileAndroidCode() {
  throw new Error('you are using the wrong JDK');
}
test('compiling android goes as expected', () => {
  expect(() => compileAndroidCode()).toThrow();
  expect(() => compileAndroidCode()).toThrow(Error);
  // You can also use the exact error message or a regexp
  expect(() => compileAndroidCode()).toThrow('you are using the wrong JDK');
  expect(() => compileAndroidCode()).toThrow(/JDK/);
});


```
* Hook functions in Jest
```js
// Repeating Setup For Many Tests
beforeEach(() => {
  initializeCityDatabase();
});
afterEach(() => {
  clearCityDatabase();
});
test('city database has Vienna', () => {
  expect(isCity('Vienna')).toBeTruthy();
});
test('city database has San Juan', () => {
  expect(isCity('San Juan')).toBeTruthy();
});
// One-Time Setup
beforeAll(() => {
  return initializeCityDatabase();
});
afterAll(() => {
  return clearCityDatabase();
});

```
### Async Testing

```js
// Callbacks use done
// The most common asynchronous pattern is callbacks.
test('the data is peanut butter', done => {
  function callback(data) {
    try {
      expect(data).toBe('peanut butter');
      done();
    } catch (error) {
      done(error);
    }
  }
  fetchData(callback);
});
// Promises
// return promise
test('the data is peanut butter', () => {
  return fetchData().then(data => {
    expect(data).toBe('peanut butter');
  });
});
// if you expect a promise to be rejected, use the .catch method.
// Make sure to add expect.assertions to verify that a certain number of assertions are called. Otherwise, a fulfilled promise would not fail the test.
test('the fetch fails with an error', () => {
  // expect should be called at least once, otherwise a resolved promise would still pass the test
  expect.assertions(1);
  return fetchData().catch(e => expect(e).toMatch('error'));
});
test('the data is peanut butter', () => {
  return expect(fetchData()).resolves.toBe('peanut butter');
});
test('the fetch fails with an error', () => {
  return expect(fetchData()).rejects.toMatch('error');
});
// Async/Await
test('the data is peanut butter', async () => {
  const data = await fetchData();
  expect(data).toBe('peanut butter');
});
test('the fetch fails with an error', async () => {
  expect.assertions(1);
  try {
    await fetchData();
  } catch (e) {
    expect(e).toMatch('error');
  }
});
// we can combine async and await with .resolves or .rejects.
test('the data is peanut butter', async () => {
  await expect(fetchData()).resolves.toBe('peanut butter');
});
test('the fetch fails with an error', async () => {
  await expect(fetchData()).rejects.toMatch('error');
});
```

### Mock Techniques

```js
// # Mock Functions
const mockCallback = jest.fn(x => 42 + x);
forEach([0, 1], mockCallback);
// The mock function is called twice
expect(mockCallback.mock.calls.length).toBe(2);
// The first argument of the first call to the function was 0
expect(mockCallback.mock.calls[0][0]).toBe(0);
// The first argument of the second call to the function was 1
expect(mockCallback.mock.calls[1][0]).toBe(1);
// The return value of the first call to the function was 42
expect(mockCallback.mock.results[0].value).toBe(42);

// # Mock Return Values
const myMock = jest.fn();
console.log(myMock());
// > undefined
myMock.mockReturnValueOnce(10).mockReturnValueOnce('x').mockReturnValue(true);
console.log(myMock(), myMock(), myMock(), myMock());
// > 10, 'x', true, true

// # Mocking Modules
// file users.js
import axios from 'axios';
class Users {
  static all() {
    return axios.get('/users.json').then(resp => resp.data);
  }
}
export default Users;
// file users.test.js
import axios from 'axios';
import Users from './users';
jest.mock('axios');
test('should fetch users', () => {
  const users = [{name: 'Bob'}];
  const resp = {data: users};
  axios.get.mockResolvedValue(resp);
  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))
  return Users.all().then(data => expect(data).toEqual(users));
});

// # Mocking Partials
// file foo-bar-baz.js
export const foo = 'foo';
export const bar = () => 'bar';
export default () => 'baz';

// file foo-bar-baz.test.js
import defaultExport, {bar, foo} from '../foo-bar-baz';
jest.mock('../foo-bar-baz', () => {
  const originalModule = jest.requireActual('../foo-bar-baz');
  //Mock the default export and named export 'foo'
  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn(() => 'mocked baz'),
    foo: 'mocked foo',
  };
});
test('should do a partial mock', () => {
  const defaultExportResult = defaultExport();
  expect(defaultExportResult).toBe('mocked baz');
  expect(defaultExport).toHaveBeenCalled();
  expect(foo).toBe('mocked foo');
  expect(bar()).toBe('bar');
});

// # Mock Implementations
const myMockFn = jest.fn(cb => cb(null, true));
myMockFn((err, val) => console.log(val));
// file foo.js
module.exports = function () {
  // some implementation;
};
// file foo.test.js
jest.mock('../foo'); // this happens automatically with automocking
const foo = require('../foo');
// foo is a mock function
foo.mockImplementation(() => 42);
foo();
// > 42
const myMockFn = jest
  .fn(() => 'default')
  .mockImplementationOnce(() => 'first call')
  .mockImplementationOnce(() => 'second call');
console.log(myMockFn(), myMockFn(), myMockFn(), myMockFn());
// > 'first call', 'second call', 'default', 'default'

// # Custom Matchers
// The mock function was called at least once
expect(mockFunc).toHaveBeenCalled();
// The mock function was called at least once with the specified args
expect(mockFunc).toHaveBeenCalledWith(arg1, arg2);
// The last call to the mock function was called with the specified args
expect(mockFunc).toHaveBeenLastCalledWith(arg1, arg2);
// All calls and the name of the mock is written as a snapshot
expect(mockFunc).toMatchSnapshot();
// The mock function was called at least once
expect(mockFunc.mock.calls.length).toBeGreaterThan(0);
expect(mockFunc.getMockName()).toBe('a mock name');

```

### Timer Testing

```js
// file timerGame.js
'use strict';
function timerGame(callback) {
  console.log('Ready....go!');
  setTimeout(() => {
    console.log("Time's up -- stop!");
    callback && callback();
  }, 1000);
}
module.exports = timerGame;
// file __tests__/timerGame-test.js
'use strict';
jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');
test('waits 1 second before ending the game', () => {
  const timerGame = require('../timerGame');
  timerGame();
  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
});

// # useFakeTimers
afterEach(() => {
  jest.useRealTimers();
});
test('do something with fake timers', () => {
  jest.useFakeTimers();
  // ...
});
test('do something with real timers', () => {
  // ...
});

// # Run All Timers
test('calls the callback after 1 second', () => {
  const timerGame = require('../timerGame');
  const callback = jest.fn();
  timerGame(callback);
  // At this point in time, the callback should not have been called yet
  expect(callback).not.toBeCalled();
  // Fast-forward until all timers have been executed
  jest.runAllTimers();
  // Now our callback should have been called!
  expect(callback).toBeCalled();
  expect(callback).toHaveBeenCalledTimes(1);
});

// # Run Pending Timers
// Fast forward and exhaust only currently pending timers
// (but not any new timers that get created during that process)
jest.runOnlyPendingTimers();

// # Advance Timers by Time
jest.advanceTimersByTime(1000);

```

### Snapshot Testing

```js
// # Snapshot Testing with Jest
import React from 'react';
import renderer from 'react-test-renderer';
import Link from '../Link';
it('renders correctly', () => {
  const tree = renderer
    .create(<Link page="http://www.facebook.com">Facebook</Link>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
// he first time this test is run, Jest creates a snapshot file that looks like this:
exports[`renders correctly 1`] = `
<a
  className="normal"
  href="http://www.facebook.com"
  onMouseEnter={[Function]}
  onMouseLeave={[Function]}
>
  Facebook
</a>
`;

// # Inline Snapshots
it('renders correctly', () => {
  const tree = renderer
    .create(<Link page="https://example.com">Example Site</Link>)
    .toJSON();
  expect(tree).toMatchInlineSnapshot();
});
// The next time you run Jest, tree will be evaluated, and a snapshot will be written as an argument to toMatchInlineSnapshot:
it('renders correctly', () => {
  const tree = renderer
    .create(<Link page="https://example.com">Example Site</Link>)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
<a
  className="normal"
  href="https://example.com"
  onMouseEnter={[Function]}
  onMouseLeave={[Function]}
>
  Example Site
</a>
`);
});
// # Property Matchers
// Often there are fields in the object you want to snapshot which are generated (like IDs and Dates). If you try to snapshot these objects, they will force the snapshot to fail on every run:
it('will check the matchers and pass', () => {
  const user = {
    createdAt: new Date(),
    id: Math.floor(Math.random() * 20),
    name: 'LeBron James',
  };
  expect(user).toMatchSnapshot({
    createdAt: expect.any(Date),
    id: expect.any(Number),
  });
});

```

### DOM Testing

Jest simulates DOM APIs, i.e., jsdom
So you can set up the jsdom environment to operate DOM APIs normally

## Common Vue Jest Test Configuration

```javascript
module.exports = {
  // Module resolution extensions, can omit the following suffixes when importing modules for testing
  moduleFileExtensions: [ 'js', 'jsx', 'json', 'vue' ],
  // Use corresponding modules to transform files with the given extensions
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest'
  },
  // Files or directories matching these patterns do not need transformation
  transformIgnorePatterns: [
    '/node_modules/'
  ],
  // Module alias mapping
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  // Snapshot serialization processor
  snapshotSerializers: [
    'jest-serializer-vue'
  ],
  // Files matching these path patterns will be automatically tested
  testMatch: [
    '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
  ],
  // Files matching these path patterns will be ignored for testing
  testPathIgnorePatterns: [
    '.eslintrc.js'
  ],
  // Mock browser environment URL
  testURL: 'http://localhost/',
  // Jest -w p mode interactive experience optimization plugins
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ]
}

```

## Common React Jest Test Configuration

```js
module.exports = {
  "collectCoverageFrom": [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts"
  ],
  "setupFiles": [
    "react-app-polyfill/jsdom"
  ],
  "setupFilesAfterEnv": [
    './node_modules/jest-enzyme/lib/index.js',
    '<rootDir>/src/utils/testSetup.js',
  ],
  "testMatch": [
    "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}"
  ],
  "testEnvironment": "jest-environment-jsdom-fourteen",
  "transform": {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
    "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
    "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)": "<rootDir>/config/jest/fileTransform.js"
  },
  "transformIgnorePatterns": [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$",
    "^.+\\.module\\.(css|sass|scss)$"
  ],
  "modulePaths": [],
  "moduleNameMapper": {
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy"
  },
  "moduleFileExtensions": [
    "js",
    "ts",
    "tsx",
    "json",
    "jsx",
  ],
  "watchPlugins": [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname"
  ]
}
```