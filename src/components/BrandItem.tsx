import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native'

export interface Brand {
  id: number
  name: string
  imagePath: ImageSourcePropType
}

interface BrandItemProps extends TouchableOpacityProps {
  item: Brand
  brandSelected?: string
}

export function BrandItem({ item, brandSelected, ...rest }: BrandItemProps) {
  const isBrandSelectedStyle =
    brandSelected === item.name
      ? 'bg-slate-200 shadow-md'
      : 'bg-slate-50 shadow-sm'

  return (
    <TouchableOpacity className="items-center p-2" {...rest}>
      <View
        className={`justify-center items-center h-20 p-4 rounded-xl ${isBrandSelectedStyle}`}
      >
        <Image source={item.imagePath} alt={item.name} />
      </View>
      <Text className="text-black text-base mt-2">{item.name}</Text>
    </TouchableOpacity>
  )
}
