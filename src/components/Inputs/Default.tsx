import { Text, TextInput, TextInputProps, View } from 'react-native'

interface InputProps extends TextInputProps {
  title: string
}

export function Input({ title, ...rest }: InputProps) {
  return (
    <View className="my-5">
      <Text className="text-gray-700 font-semibold mb-2">{title}</Text>

      <TextInput
        {...rest}
        className="w-full border border-gray-400 rounded-md p-3"
      />
    </View>
  )
}
