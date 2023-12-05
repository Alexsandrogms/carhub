import {
  Text,
  ActivityIndicator,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'

interface ButtonLoadingProps extends TouchableOpacityProps {
  text: string
  isLoading: boolean
}

export function ButtonLoading({
  isLoading,
  text,
  ...rest
}: ButtonLoadingProps) {
  const className = `
    bg-black flex justify-center items-center rounded-xl p-4
    ${isLoading ? 'opacity-80' : 'opacity-100'}
  `

  return (
    <TouchableOpacity
      {...rest}
      activeOpacity={0.8}
      disabled={isLoading}
      className={className}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="#FFFFFF" />
      ) : (
        <Text className="text-white text-lg font-semibold">{text}</Text>
      )}
    </TouchableOpacity>
  )
}
