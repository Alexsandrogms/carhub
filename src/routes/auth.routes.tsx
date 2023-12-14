import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { GetStarted } from '../pages/GetStarted'
import { SignIn } from '../pages/SignIn'
import { SignOut } from '../pages/SignOut'

export type AuthStackParamList = {
  GetStarted: undefined
  SignIn: undefined
  SignOut: undefined
}

const { Navigator, Screen } = createNativeStackNavigator<AuthStackParamList>()

export function AuthRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="GetStarted" component={GetStarted} />
      <Screen name="SignIn" component={SignIn} />
      <Screen name="SignOut" component={SignOut} />
    </Navigator>
  )
}
