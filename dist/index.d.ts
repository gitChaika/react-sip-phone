/// <reference types="react" />
import { SipConfig, SipCredentials, PhoneConfig, AppConfig } from './models';
import { DialpadComponent, DialpadProps } from './components/phone/Dialpad';
interface Props {
    width: number;
    height: number;
    name: string;
    phoneConfig: PhoneConfig;
    sipCredentials: SipCredentials;
    sipConfig: SipConfig;
    appConfig: AppConfig;
    containerStyle: any;
}
export declare const phoneStore: import("redux").Store<import("redux-persist/es/persistReducer").PersistPartial, import("redux").Action<any>> & {
    dispatch: unknown;
};
export declare const Dialpad: typeof DialpadComponent;
export type { DialpadProps };
export declare const ReactSipPhone: ({ name, phoneConfig, sipConfig, appConfig, sipCredentials, containerStyle }: Props) => JSX.Element;
