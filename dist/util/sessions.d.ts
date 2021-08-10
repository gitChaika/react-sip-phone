import { SessionState, Session, UserAgent } from 'sip.js';
export interface SessionStateHandlerParams {
    onSessionEstablishing?(): void;
    onSessionEstablished?(): void;
    onSessionTerminating?(): void;
    onSessionTerminated?(): void;
}
export declare class SessionStateHandler {
    private session;
    private ua;
    private onSessionEstablishing;
    private onSessionEstablished;
    private onSessionTerminating;
    private onSessionTerminated;
    constructor(session: Session, ua: UserAgent, params?: SessionStateHandlerParams);
    stateChange: (newState: SessionState) => void;
}
export declare const getFullNumber: (number: string) => string;
export declare const statusMask: (status: string) => string;
export declare const getDurationDisplay: (duration: number) => string;
