import { NavigationContainer } from '@react-navigation/native'

import { AppRoutes } from './app.routes'

export type RootStackParamList = {
  GetStarted: undefined
}

export function Routes() {
  return (
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>
  )
}
