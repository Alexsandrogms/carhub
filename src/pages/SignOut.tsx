import {
  GestureResponderEvent,
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import { Container } from '../components/Container'
import { Logo } from '../components/Logo'
import { Input } from '../components/Inputs/Default'
import { PasswordInput } from '../components/Inputs/Password'
import { ButtonLoading } from '../components/Buttons/Loading'

export function SignOut() {
  const navigate = useNavigation()

  function handleContentPress(e: GestureResponderEvent) {
    Keyboard.dismiss()
    e.stopPropagation()
  }

  function handleGoBack() {
    navigate.goBack()
  }

  return (
    <TouchableWithoutFeedback onPress={handleContentPress}>
      <Container>
        <View className="flex-1 justify-center items-center">
          <TouchableOpacity
            className="absolute top-0 left-0"
            onPress={handleGoBack}
          >
            <Ionicons name="arrow-back-outline" color="black" size={26} />
          </TouchableOpacity>

          <Logo />
          <Text className="text-md text-center">
            Desbrave o mundo dos carros conosco! {'\n'}Registre-se em instantes
            para começar sua jornada
          </Text>

          <View className="mt-5 w-full justify-center">
            <Input title="Nome" />
            <Input title="E-mail" />
            <PasswordInput title="Password" />

            <View className="mt-5" />
            <ButtonLoading text="Registrar" isLoading={false} />
          </View>
        </View>
      </Container>
    </TouchableWithoutFeedback>
  )
}
