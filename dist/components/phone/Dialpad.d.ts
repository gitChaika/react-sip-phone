import * as React from 'react';
import { Session } from 'sip.js';
interface Props {
    open: boolean;
    session?: Session;
    deviceId?: string;
    onButtonClick?(value: string): void;
}
declare class Dialpad extends React.Component<Props> {
    topRow: any;
    middleRow: any;
    bottomRow: any;
    constructor(props: Props);
    getButton(value: string): JSX.Element;
    handleClick(value: string): void;
    sendDTMF(value: string): void;
    render(): JSX.Element;
}
declare const _default: import("react-redux").ConnectedComponent<typeof Dialpad, Pick<React.ClassAttributes<Dialpad> & Props, "ref" | "key" | "session" | "open" | "onButtonClick">>;
export default _default;
export type { Props as DialpadProps };
export { Dialpad as DialpadComponent };
