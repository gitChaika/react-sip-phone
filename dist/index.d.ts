import * as React from 'react';
import { SipConfig, SipCredentials, PhoneConfig, AppConfig } from './models';
import { DialpadComponent, DialpadProps } from './components/phone/Dialpad';
interface Props {
    width: number;
    height: number;
    name: string;
    currentDialString?: string;
    phoneConfig: PhoneConfig;
    sipCredentials: SipCredentials;
    sipConfig: SipConfig;
    appConfig: AppConfig;
    containerStyle: any;
    onDialStringChange?(e: React.ChangeEvent<HTMLInputElement>): void;
}
export declare const phoneStore: import("redux").Store<import("redux-persist/es/persistReducer").PersistPartial, import("redux").Action<any>> & {
    dispatch: unknown;
};
export declare const Dialpad: typeof DialpadComponent;
export type { DialpadProps };
export declare const ReactSipPhone: ({ name, phoneConfig, sipConfig, appConfig, sipCredentials, currentDialString, onDialStringChange, containerStyle }: Props) => JSX.Element;
