import * as Linking from 'expo-linking'
import { Ionicons } from '@expo/vector-icons'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Image, Platform, Text, TouchableOpacity, View } from 'react-native'

import { ButtonGoBack } from '../components/Buttons/GoBack'
import { CarItemDetails } from '../components/CarItemDetails'
import { Container } from '../components/Container'
import { AppStackParamList } from '../routes/app.routes'
import { formatPrice } from '../utils/format-price'

type MoreDetailsProps = NativeStackScreenProps<AppStackParamList, 'MoreDetails'>

export function MoreDetails({ route }: MoreDetailsProps) {
  const car = route.params

  function redirectToWhatsApp() {
    const phoneNumber = '5561994020778'
    const phonePrefix = Platform.OS === 'ios' ? '' : '+'
    const message = `Ola! Estou entrando em contato, para falar sobre o anuncio do veiculo ${car.brand} ${car.model}.`

    const url = `whatsapp://send?phone=${phonePrefix}${phoneNumber}&text=${message}`

    try {
      Linking.openURL(url)
    } catch (err) {
      console.log(err)
    }
  }

  console.log(car)

  return (
    <Container>
      <View className="flex-1 justify-between px-4">
        <View className="flex-row items-center">
          <ButtonGoBack />

          <Text className="flex-1 text-2xl text-center text-black font-bold">
            {car.brand} {car.model}
          </Text>
        </View>

        <View className="flex-1">
          <View className="overflow-hidden rounded-2xl mt-8">
            <Image
              source={{
                uri: car.image,
              }}
              alt={car.model}
              width={350}
              height={200}
            />
          </View>

          <CarItemDetails item={car} />

          <View className="flex-row p-4 rounded-md border border-slate-100 items-center justify-center mt-8">
            <Ionicons name="location-sharp" size={30} color="red" />
            <Text className="text-lg text-black font-bold mx-2">
              {car.city}
            </Text>
          </View>
        </View>

        <View className="flex-row justify-between items-center mt-8">
          <View>
            <Text className="text-base text-black">Preço total</Text>
            <Text className="text-lg text-green-500 font-semibold">
              {formatPrice(car.value)}
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            className="bg-dark-green flex-row justify-center items-center rounded-xl p-2"
            onPress={redirectToWhatsApp}
          >
            <Text className="text-white text-base font-semibold mr-2 p-1">
              Entrar em contato
            </Text>

            <Ionicons name="call" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  )
}
