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

export function SignIn() {
  function handleContentPress(e: GestureResponderEvent) {
    Keyboard.dismiss()
    e.stopPropagation()
  }

  return (
    <TouchableWithoutFeedback onPress={handleContentPress}>
      <Container>
        <View className="flex-1 justify-center items-center">
          <Logo />
          <Text className="text-lg text-center">
            Entre para ter acesso aos melhores anúncios.
          </Text>

          <View className="mt-4 w-full justify-center">
            <Input title="E-mail" />
            <PasswordInput title="Password" />

            <View className="mt-5" />
            <ButtonLoading text="Sign in" isLoading={false} />
          </View>
        </View>
      </Container>
    </TouchableWithoutFeedback>
  )
}
