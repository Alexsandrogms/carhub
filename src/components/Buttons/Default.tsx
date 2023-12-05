import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface ButtonProps extends TouchableOpacityProps {
  title: string
  isIcon?: boolean
}

export function Button({ title, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      {...rest}
      activeOpacity={0.8}
      className="bg-black w-full flex justify-center items-center rounded-full p-4 flex-row"
    >
      <Text className="text-white text-lg font-semibold mr-4">{title}</Text>

      <Ionicons name="arrow-forward-outline" color="white" size={24} />
    </TouchableOpacity>
  )
}
