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
  error?: string | null
}

export function PasswordInput({ title, error, ...rest }: InputProps) {
  const [isVisiblePassword, setVisiblePassword] = useState<boolean>(false)
  const borderWithErrorStyle = error ? 'border-red-400' : 'border-gray-400'

  function toggleVisiblePassword() {
    setVisiblePassword((prevState) => !prevState)
  }

  return (
    <View className="my-5">
      <View className="flex-row justify-between">
        <Text className="text-gray-700 font-semibold mb-2">{title}</Text>
        <Text
          numberOfLines={2}
          className="text-sm w-52 text-right text-red-500 font-light mr-1"
        >
          {error}
        </Text>
      </View>

      <View className="flex flex-row relative">
        <TextInput
          {...rest}
          secureTextEntry={!isVisiblePassword}
          className={`w-full border rounded-md p-3 ${borderWithErrorStyle}`}
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
