import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Home } from '../pages/Home'
import { MoreDetails } from '../pages/MoreDetails'
import { ICar } from '../types/car'

export type AppStackParamList = {
  Home: undefined
  MoreDetails: ICar
}

const { Navigator, Screen } = createNativeStackNavigator<AppStackParamList>()

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Home" component={Home} />
      <Screen name="MoreDetails" component={MoreDetails} />
    </Navigator>
  )
}
