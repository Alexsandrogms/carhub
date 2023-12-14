import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

type ButtonGoBackProps = TouchableOpacityProps

export function ButtonGoBack({ ...rest }: ButtonGoBackProps) {
  const navigate = useNavigation()

  return (
    <TouchableOpacity {...rest} onPress={() => navigate.goBack()}>
      <Ionicons name="chevron-back" size={26} color="black" />
    </TouchableOpacity>
  )
}
