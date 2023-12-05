import { useState } from 'react'
import {
  TextInput,
  View,
  Text,
  TextInputProps,
  TouchableOpacity,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface InputProps extends TextInputProps {
  title: string
}

export function PasswordInput({ title, ...rest }: InputProps) {
  const [isVisiblePassword, setVisiblePassword] = useState<boolean>(false)

  function toggleVisiblePassword() {
    setVisiblePassword((prevState) => !prevState)
  }

  return (
    <View className="my-5">
      <Text className="text-gray-500 font-semibold mb-2">{title}</Text>
      <View className="flex flex-row relative">
        <TextInput
          {...rest}
          secureTextEntry={!isVisiblePassword}
          className="w-full border border-gray-400 rounded-md p-3"
        />

        <TouchableOpacity
          className="absolute top-1/4 right-2"
          onPress={toggleVisiblePassword}
        >
          <Ionicons
            name={isVisiblePassword ? 'eye-off-outline' : 'eye-outline'}
            size={20}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}
