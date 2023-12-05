import {
  GestureResponderEvent,
  Keyboard,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

import { Container } from '../components/Container'
import { Logo } from '../components/Logo'
import { Input } from '../components/Inputs/Default'
import { PasswordInput } from '../components/Inputs/Password'
import { ButtonLoading } from '../components/Buttons/Loading'
import { useNavigation } from '@react-navigation/native'

export function SignIn() {
  function handleContentPress(e: GestureResponderEvent) {
    Keyboard.dismiss()
    e.stopPropagation()
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigate = useNavigation<any>().navigate

  function handleNavigateToSignOut() {
    navigate('SignOut')
  }

  return (
    <TouchableWithoutFeedback onPress={handleContentPress}>
      <Container>
        <View className="flex-1 relative justify-center items-center">
          <Logo />
          <Text className="text-lg text-center">
            Entre para ter acesso aos melhores anúncios.
          </Text>

          <View className="mt-4 w-full justify-center">
            <Input title="E-mail" />
            <PasswordInput title="Senha" />

            <View className="mt-5" />
            <ButtonLoading text="Entrar" isLoading={false} />
          </View>

          <View className="absolute bottom-0 flex-row">
            <Text>Não é registrado?</Text>
            <Text className="ml-1 font-bold" onPress={handleNavigateToSignOut}>
              Crie uma conta
            </Text>
          </View>
        </View>
      </Container>
    </TouchableWithoutFeedback>
  )
}
