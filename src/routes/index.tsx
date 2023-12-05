import { NavigationContainer } from '@react-navigation/native'

import { AuthRoutes } from './auth.routes'

export type RootStackParamList = {
  GetStarted: undefined
}

export function Routes() {
  return (
    <NavigationContainer>
      <AuthRoutes />
    </NavigationContainer>
  )
}
