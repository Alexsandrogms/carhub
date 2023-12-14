import { useNavigation } from '@react-navigation/native'
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
import { useAuth } from '../hooks/use-auth'

const signInSchema = z.object({
  email: z.string().email({
    message: 'E-mail invalido',
  }),
  password: z.string().min(8, 'A senha deve conter pelo menos 8 caracteres'),
})

type InputErrors = {
  [x: string]: string
}

export function SignIn() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigate = useNavigation<any>().navigate

  const { signIn } = useAuth()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<InputErrors | null>(null)

  function handleContentPress(e: GestureResponderEvent) {
    Keyboard.dismiss()
    e.stopPropagation()
  }

  async function handleLogin() {
    setLoading(true)
    try {
      const payload = signInSchema.safeParse({ email, password })

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

      await signIn(payload.data)
    } catch (err) {
      console.log(err)

      Alert.alert('E-mail or password incorrect!')
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
              title="Senha"
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
              text="Entrar"
              isLoading={loading}
              onPress={handleLogin}
            />
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
