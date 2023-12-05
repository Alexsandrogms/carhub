import { Image, Text, View } from 'react-native'

import CarImg from '../assets/car.png'
import { Button } from '../components/Buttons/Default'
import { Container } from '../components/Container'
import { useNavigation } from '@react-navigation/native'
import { Logo } from '../components/Logo'

export function GetStarted() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigate = useNavigation<any>().navigate

  function handleNavigateToLogin() {
    navigate('SignIn')
  }

  return (
    <Container>
      <View className="flex-1 pt-10">
        <Logo />
        <Text className="text-center text-base ">
          Conecte-se ao seu próximo carro com facilidade
        </Text>
      </View>

      <View className="flex-1 h-full">
        <Image source={CarImg} alt="Carro branco" />
      </View>

      <Button title="Get Started" onPress={handleNavigateToLogin} />
    </Container>
  )
}
