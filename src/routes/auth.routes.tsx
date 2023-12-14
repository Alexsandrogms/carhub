import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { GetStarted } from '../pages/GetStarted'
import { SignIn } from '../pages/SignIn'
import { SignUp } from '../pages/SignUp'

export type AuthStackParamList = {
  GetStarted: undefined
  SignIn: undefined
  SignUp: undefined
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
      <Screen name="SignUp" component={SignUp} />
    </Navigator>
  )
}
