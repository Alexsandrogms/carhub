import { useState } from 'react'
import {
  Alert,
  GestureResponderEvent,
  Keyboard,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { z } from 'zod'

import { ButtonLoading } from '../components/Buttons/Loading'
import { Container } from '../components/Container'
import { Input } from '../components/Inputs/Default'
import { PasswordInput } from '../components/Inputs/Password'
import { Logo } from '../components/Logo'
import { ButtonGoBack } from '../components/Buttons/GoBack'
import { useAuth } from '../hooks/use-auth'
import { useNavigation } from '@react-navigation/native'

type InputErrors = {
  [x: string]: string
}

const signUpSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Nome invalido!',
      required_error: 'Nome é obrigatório!',
    })
    .min(4, 'Nome é obrigatório!'),
  email: z.string().email({
    message: 'E-mail invalido!',
  }),
  password: z.string().min(8, 'A senha deve conter pelo menos 8 caracteres'),
})

export function SignUp() {
  const navigate = useNavigation()
  const { signUp } = useAuth()

  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<InputErrors | null>(null)

  function handleContentPress(e: GestureResponderEvent) {
    Keyboard.dismiss()
    e.stopPropagation()
  }

  async function handleCreateAccount() {
    setLoading(true)
    try {
      const payload = signUpSchema.safeParse({ name, email, password })

      if (!payload.success) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        Object.entries(payload.error.issues).forEach(([_, issue]) => {
          setErrors((prevState) => ({
            ...prevState,
            [issue.path[0]]: issue.message,
          }))
        })
        return
      }

      await signUp(payload.data)

      Alert.alert(
        'Usuário criado com sucesso!',
        'Realize o login, e tenha acesso a todos os anúncios',
        [{ text: 'OK', onPress: () => navigate.goBack() }],
      )
    } catch {
      Alert.alert('Ocorreu um erro ao tentar criar usuário.')
    } finally {
      setLoading(false)
    }
  }

  function removeError(input: string) {
    if (!errors) return

    const newObject = { ...errors }
    newObject[input] = ''

    setErrors(newObject)
  }

  return (
    <TouchableWithoutFeedback onPress={handleContentPress}>
      <Container>
        <View className="w-full">
          <ButtonGoBack />
        </View>
        <View className="flex-1 justify-center items-center">
          <Logo />
          <Text className="text-md text-center">
            Desbrave o mundo dos carros conosco! {'\n'}Registre-se em instantes
            para começar sua jornada
          </Text>

          <View className="mt-5 w-full justify-center">
            <Input
              title="Nome"
              value={name}
              placeholder="Exp: John Doe"
              onChangeText={(text) => {
                setName(text)
                removeError('name')
              }}
              error={errors?.name}
            />
            <Input
              title="E-mail"
              value={email}
              placeholder="Exp: joh-doe@contato.com"
              onChangeText={(text) => {
                setEmail(text)
                removeError('email')
              }}
              error={errors?.email}
            />
            <PasswordInput
              title="Password"
              value={password}
              placeholder="*********"
              onChangeText={(text) => {
                setPassword(text)
                removeError('password')
              }}
              error={errors?.password}
            />

            <View className="mt-5" />
            <ButtonLoading
              text="Registrar"
              isLoading={loading}
              onPress={handleCreateAccount}
            />
          </View>
        </View>
      </Container>
    </TouchableWithoutFeedback>
  )
}
