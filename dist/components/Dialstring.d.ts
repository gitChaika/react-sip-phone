import * as React from 'react';
import SIPAccount from '../lib/SipAccount';
import { PhoneConfig, SipConfig, AppConfig } from '../models';
interface Props {
    sipAccount: SIPAccount;
    phoneConfig: PhoneConfig;
    sipConfig: SipConfig;
    appConfig: AppConfig;
    sessions: Object;
    started: Boolean;
    sessionsLimitReached: Function;
    attendedTransfersList: Array<string>;
    currentDialString?: string;
    onDialStringChange?(e: React.ChangeEvent<HTMLInputElement>): void;
}
declare class Dialstring extends React.Component<Props> {
    state: {
        currentDialString: string;
    };
    get currentDialString(): string;
    handleDial(): void;
    checkDialstring(): boolean;
    render(): JSX.Element | null;
}
declare const D: import("react-redux").ConnectedComponent<typeof Dialstring, Pick<React.ClassAttributes<Dialstring> & Props, "sipConfig" | "phoneConfig" | "appConfig" | "ref" | "key" | "currentDialString" | "onDialStringChange">>;
export default D;
