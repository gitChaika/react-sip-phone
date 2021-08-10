export interface SipCredentials {
  sipuri: string
  password: string
}

export interface SipConfig {
  websocket: string
  video: boolean
  iceServers: Array<string>
  defaultCountryCode: string
  noAnswerTimeout: number
  onStartNewSession?(): void
  onSessionEstablishing?(): void
  onSessionEstablished?(): void
  onSessionTerminating?(): void
  onSessionTerminated?(): void
}

export interface PhoneConfig {
  disabledButtons: Array<string>
  disabledFeatures: Array<string>
  defaultDial: string
  sessionsLimit: number
  attendedTransferLimit: number
  autoAnswer: boolean
}

export interface AppConfig {
  mode: string
  started: boolean
  appSize: string
}
