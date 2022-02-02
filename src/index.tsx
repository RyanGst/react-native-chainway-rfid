import { NativeEventEmitter, NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-chainway-rfid' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const ChainwayRfid = NativeModules.ChainwayRfid
  ? NativeModules.ChainwayRfid
  : new Proxy(
    {},
    {
      get() {
        throw new Error(LINKING_ERROR);
      },
    }
  );

type changePower = (powerValue: number) => Promise<any>;
type AddListener = (cb: (args: any[]) => void) => void;

const eventEmitter = new NativeEventEmitter(ChainwayRfid);

export function initializeReader(): void {
  return ChainwayRfid.initializeReader();
}

export function deInitializeReader(): void {
  return ChainwayRfid.deInitializeReader();
}

export function readSingleTag(): Promise<string[]> {
  return ChainwayRfid.readSingleTag();
}

export function startReadingTags(callback: any) {
  return ChainwayRfid.startReadingTags(callback);
}

export function stopReadingTags(callback: any) {
  return ChainwayRfid.stopReadingTags(callback);
}

export function findTag(epc: string, callback: any) {
  return ChainwayRfid.findTag(epc, callback);
}

export function writeTag(epc: string): Promise<any> {
  return ChainwayRfid.writeDataIntoEpc(epc);
}

export const readPower = () => ChainwayRfid.readPower();

export const changePower: changePower = (powerValue: number) => {
  return ChainwayRfid.changePower(powerValue);
};

export const powerListener: AddListener = (listener) =>
  eventEmitter.addListener('UHF_POWER', listener);

export const tagListener: AddListener = (listener) =>
  eventEmitter.addListener('UHF_TAG', listener);


export const searchListener: AddListener = (listener) =>
  eventEmitter.addListener('UHF_SEARCH', listener);

export const clearTags = () => ChainwayRfid.clearAllTags();
