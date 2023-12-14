# react-native-chainway-rfid 📡

> [!CAUTION]
> This library is current unmaintained. If you are interested in maintaining this library, please contact me.

This library is a native module for the Chainway C72 RFID Reader Lib.

## Installation

```sh
npm install react-native-chainway-rfid
```

## Usage

```js
useEffect(() => {
  const scanner = C72RfidScanner;
  scanner.initializeReader();
  // write your code here
  scanner.powerListener(powerListener);
  scanner.tagListener(tagListener);
}, []);
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

## Contact

If you have any questions, please [contact me](mailto:ryangst.hire@gmail.com)
