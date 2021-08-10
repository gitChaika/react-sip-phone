import { phoneStore } from '../index'
import { SessionState, Session, UserAgent} from 'sip.js'
import { Transport as WebTransport } from "sip.js/lib/platform/web/transport";
import { SIPSESSION_STATECHANGE, CLOSE_SESSION } from '../actions/sipSessions'
import { STRICT_MODE_SHOW_CALL_BUTTON } from '../actions/config'
import { holdAll } from '../util/hold'
import { setLocalAudio, setRemoteAudio, cleanupMedia } from './audio'
import toneManager from './ToneManager'

export interface SessionStateHandlerParams {
  onSessionEstablishing?(): void
  onSessionEstablished?(): void
  onSessionTerminating?(): void
  onSessionTerminated?(): void
}

export class SessionStateHandler {
  private session: Session
  private ua: UserAgent
  private onSessionEstablishing?(): void
  private onSessionEstablished?(): void
  private onSessionTerminating?(): void
  private onSessionTerminated?(): void

  constructor(session: Session, ua: UserAgent, params: SessionStateHandlerParams = {}) {
    this.session = session
    this.ua = ua
    this.onSessionEstablishing = params.onSessionEstablishing
    this.onSessionEstablished = params.onSessionEstablished
    this.onSessionTerminating = params.onSessionTerminating
    this.onSessionTerminated = params.onSessionTerminated
  }

  public stateChange = (newState: SessionState) => {
    switch (newState) {
      case SessionState.Establishing:
        holdAll(this.session.id)
        toneManager.playRing('ringback')
        phoneStore.dispatch({
          type: SIPSESSION_STATECHANGE
        })

        // check if session recieves a BYE message while sessionstate is establishing
        const myTransport = this.ua.transport as WebTransport
        myTransport.on('message', (message: string) => {
          if (message.includes('BYE ') && message.indexOf('BYE ') === 0) {
            if (this.session.state === 'Establishing') {
              console.log(
                `${message} session has recieved a BYE message when the session state is establishing`
              )
              // @ts-ignore
              this.session.cancel()
              this.session.dispose()
              setTimeout(() => {
                phoneStore.dispatch({
                  type: CLOSE_SESSION,
                  payload: this.session.id
                })
                toneManager.stopAll()
                phoneStore.dispatch({
                  type: STRICT_MODE_SHOW_CALL_BUTTON
                })
              }, 5000)
              if (this.onSessionEstablishing) {
                this.onSessionEstablishing()
              }
              return
            } else {
              return
            }
          }
        })
        break
      case SessionState.Established:
        phoneStore.dispatch({
          type: SIPSESSION_STATECHANGE
        })
        toneManager.stopAll()
        setLocalAudio(this.session)
        setRemoteAudio(this.session)
        if (this.onSessionEstablished) {
          this.onSessionEstablished()
        }
        break
      case SessionState.Terminating:
        phoneStore.dispatch({
          type: SIPSESSION_STATECHANGE
        })
        toneManager.stopAll()
        cleanupMedia(this.session.id)
        if (this.onSessionTerminating) {
          this.onSessionTerminating()
        }
        break
      case SessionState.Terminated:
        phoneStore.dispatch({
          type: SIPSESSION_STATECHANGE
        })
        setTimeout(() => {
          phoneStore.dispatch({
            type: CLOSE_SESSION,
            payload: this.session.id
          })
          toneManager.stopAll()
          phoneStore.dispatch({
            type: STRICT_MODE_SHOW_CALL_BUTTON
          })
        }, 5000)
        if (this.onSessionTerminated) {
          this.onSessionTerminated()
        }
        break
      default:
        console.log(`Unknown session state change: ${newState}`)
        break
    }
  }
}

export const getFullNumber = (number: string) => {
  if (number.length < 10) {
    return number
  }

  // @ts-ignore
  const defaultCountryCode = phoneStore.getState().sipAccounts.sipAccount._config.defaultCountryCode;

  let fullNumber = number.startsWith('+') ? number : `+${number}`

  if (number.startsWith(defaultCountryCode)) {
    fullNumber = `+${number}`
  } else if (defaultCountryCode === '7' && number.startsWith('8')) {
    fullNumber = `+${number.replace('8', '7')}`
  } else if (defaultCountryCode) {
    fullNumber = `+${defaultCountryCode}${number}`
  }

  console.log('fullNumber:', fullNumber)
  return fullNumber
}

export const statusMask = (status: string) => {
  switch (status) {
    case 'Established':
      return 'Соединение'
    case 'Establishing':
      return 'Звонок...'
    case 'Initial':
      return 'Инициализирован'
    case 'Terminating':
    case 'Terminated':
      return 'Завершен'
    default:
      return `Неизвестный статус: ${status}`
  }
}

export const getDurationDisplay = (duration: number) => {
  let minutes = Math.floor(duration / 60)
  const hours = Math.floor(minutes / 60)
  minutes = minutes % 60
  const seconds = duration % 60
  let dh, dm, ds
  if (hours && hours < 10) {
    dh = `0${hours}:`
  } else if (hours) {
    dh = `${hours}:`
  } else {
    dh = '00:'
  }
  if (minutes && minutes < 10) {
    dm = `0${minutes}:`
  } else if (minutes) {
    dm = `${minutes}:`
  } else {
    dm = '00:'
  }
  if (seconds && seconds < 10) {
    ds = `0${seconds}`
  } else if (seconds) {
    ds = `${seconds}`
  } else {
    ds = '00'
  }
  return `${hours ? dh : ''}${dm}${ds}`
}
