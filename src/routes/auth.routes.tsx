import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { GetStarted } from '../pages/GetStarted'
import { SignIn } from '../pages/SignIn'

export type RootStackParamList = {
  GetStarted: undefined
  SignIn: undefined
}

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>()

export function AuthRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="GetStarted" component={GetStarted} />
      <Screen name="SignIn" component={SignIn} />
    </Navigator>
  )
}
