import { Text, TextInput, TextInputProps, View } from 'react-native'

interface InputProps extends TextInputProps {
  title: string
  error?: string | null
}

export function Input({ title, error, ...rest }: InputProps) {
  const borderWithErrorStyle = error ? 'border-red-400' : 'border-gray-400'

  return (
    <View className="my-5">
      <View className="flex-row justify-between">
        <Text className="text-gray-700 font-semibold mb-2">{title}</Text>
        <Text className="text-sm text-red-500 font-light mr-1">{error}</Text>
      </View>

      <TextInput
        {...rest}
        className={`w-full border rounded-md p-3 ${borderWithErrorStyle}`}
      />
    </View>
  )
}
