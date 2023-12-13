import { View, Image, Text } from 'react-native'
import { formatPrice } from '../utils/format-price'

export interface CarItemProps {
  item: {
    id: number
    model: string
    image: string
    brand: string
    value: number
    year: number
    city: string
  }
}

export function CarItem({ item }: CarItemProps) {
  return (
    <View className="w-full my-2 justify-between bg-slate-50 rounded-2xl overflow-hidden">
      <View className="w-full h-44 relative">
        <Image
          className="w-full h-full"
          source={{
            uri: item.image,
          }}
          alt={item.model}
        />
      </View>

      <View className="flex-1 justify-between p-4">
        <Text className="font-bold text-black text-xl">
          {item.brand} {item.model}
        </Text>

        <Text className="text-base text-gray-500">{item.year}</Text>

        <View className="flex-row justify-between items-center mt-2">
          <Text className="font-semibold text-base text-black">
            {formatPrice(item.value)}
          </Text>
          <Text className="text-blue-400 font-semibold">Detalhes</Text>
        </View>
      </View>
    </View>
  )
}
