import { Text, View } from 'react-native'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

interface CarItemDetailsProps {
  item: {
    year: string
    km: number
    brand: string
  }
}

export function CarItemDetails({ item }: CarItemDetailsProps) {
  return (
    <View className="flex-row justify-between mt-8">
      <View className="flex-1 justify-center p-3 bg-ice rounded-lg shadow-sm  ml-1">
        <Ionicons name="calendar" size={26} color="black" />
        <Text className="text-sm font-medium text-slate-700 mt-2">Ano</Text>
        <Text className="text-base text-black font-semibold">{item.year}</Text>
      </View>

      <View className="flex-1 justify-center p-3 bg-ice rounded-lg shadow-sm mx-3">
        <MaterialCommunityIcons
          name="car-traction-control"
          size={26}
          color="black"
        />
        <Text className="text-sm font-medium text-slate-700 mt-2">
          Quilômetros
        </Text>
        <Text className="text-base text-black font-semibold">{item.km} km</Text>
      </View>

      <View className="flex-1 justify-center p-3 bg-ice rounded-lg shadow-sm ">
        <Ionicons name="ios-car-sport" size={26} color="black" />
        <Text className="text-sm font-medium text-slate-700 mt-2">Marca</Text>
        <Text className="text-base text-black font-semibold">{item.brand}</Text>
      </View>
    </View>
  )
}
