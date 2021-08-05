import * as React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import styles from './styles.scss'
import SipWrapper from './SipWrapper'
import Status from './components/Status'
import PhoneSessions from './components/PhoneSessions'
import Dialstring from './components/Dialstring'
// eslint-disable-next-line no-unused-vars
import { SipConfig, SipCredentials, PhoneConfig, AppConfig } from './models'
import { DialpadComponent, DialpadProps } from './components/phone/Dialpad'
import { defaultStore, persistor } from './store/configureStore'

interface Props {
  width: number
  height: number
  name: string
  currentDialString?: string
  phoneConfig: PhoneConfig
  sipCredentials: SipCredentials
  sipConfig: SipConfig
  appConfig: AppConfig
  containerStyle: any
onDialStringChange?(e: React.ChangeEvent<HTMLInputElement>): void
}

export const phoneStore = defaultStore

export const Dialpad = DialpadComponent

export type { DialpadProps }

export const ReactSipPhone = ({
  name,
  phoneConfig,
  sipConfig,
  appConfig,
  sipCredentials,
  currentDialString,
  onDialStringChange,
  containerStyle = {}
}: Props) => {
  // If no store is passed into component, default store is used
  return (
    <Provider store={phoneStore}>
      <PersistGate loading={null} persistor={persistor}>
        <SipWrapper
          sipConfig={sipConfig}
          sipCredentials={sipCredentials}
          phoneConfig={phoneConfig}
          appConfig={appConfig}
        >
          <div
            className={styles.container}
            style={{
              ...containerStyle,
            }}
          >
            <Status
              phoneConfig={phoneConfig}
              appConfig={appConfig}
              name={name}
            />
            {phoneConfig.disabledFeatures.includes('dialstring') ? null : (
              <Dialstring
                currentDialString={currentDialString}
                onDialStringChange={onDialStringChange}
                sipConfig={sipConfig}
                phoneConfig={phoneConfig}
                appConfig={appConfig}
              />
            )}

            <PhoneSessions phoneConfig={phoneConfig} />
            <audio id='tone' autoPlay />
          </div>
        </SipWrapper>
      </PersistGate>
    </Provider>
  )
}
