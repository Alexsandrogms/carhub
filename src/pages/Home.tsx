import { useEffect, useState } from 'react'
import { FlatList, Text, View, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { CarItem } from '../components/CarItem'
import { Container } from '../components/Container'
import { brands } from '../constants/brands'
import { BrandItem } from '../components/BrandItem'
import { CreateAnnouncementModal } from '../components/CreateAnnouncementModal'

const adverts = [
  {
    id: 1,
    model: 'Gol',
    image:
      'https://quatrorodas.abril.com.br/wp-content/uploads/2020/08/chevrolet-onix-auto-deportivo-exterior-luces-traseras-1-e1597773829329.jpg?quality=70&strip=info',
    brand: 'Chevrolet',
    value: 82490,
    year: 2023,
    city: '',
  },
  {
    id: 2,
    model: 'Gol',
    image:
      'https://quatrorodas.abril.com.br/wp-content/uploads/2020/08/chevrolet-onix-auto-deportivo-exterior-luces-traseras-1-e1597773829329.jpg?quality=70&strip=info',
    brand: 'Chevrolet',
    value: 82490,
    year: 2023,
    city: '',
  },
  {
    id: 3,
    model: 'Gol',
    image:
      'https://quatrorodas.abril.com.br/wp-content/uploads/2020/08/chevrolet-onix-auto-deportivo-exterior-luces-traseras-1-e1597773829329.jpg?quality=70&strip=info',
    brand: 'Chevrolet',
    value: 82490,
    year: 2023,
    city: '',
  },
]

export function Home() {
  const [isOpenAnnouncementModal, setIsOpenAnnouncementModal] = useState(false)
  const [brandSelected, setBrandSelected] = useState<string>('')
  const [carsAdverts, setCarsAdverts] = useState(adverts)

  function handleSelectBrand(brandValue: string) {
    setBrandSelected((prevState) =>
      prevState !== brandValue ? brandValue : '',
    )
  }

  useEffect(() => {
    if (brandSelected) {
      const advertsFiltered = adverts.filter(
        (state) => state.brand.toUpperCase() === brandSelected.toUpperCase(),
      )

      setCarsAdverts(advertsFiltered)
    }
  }, [brandSelected])

  return (
    <>
      <Container>
        <View className="flex w-full flex-row justify-between items-center">
          <View>
            <Ionicons name="person-circle-outline" size={54} />
          </View>
          <View className="flex-1 px-4">
            <Text className="text-gray-400 text-base">Alexsandro Gomes</Text>
            <Text className="text-black font-semibold text-xl">
              Bem vindo de volta
            </Text>
          </View>
          <View>
            <Ionicons name="notifications" size={24} color="black" />
          </View>
        </View>

        <View className="flex-1 w-full h-full mt-5">
          <View>
            <Text className="text-lg text-black font-semibold mb-2">
              Filtro por Marcas
            </Text>

            <FlatList
              horizontal
              data={brands}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <BrandItem
                  item={item}
                  brandSelected={brandSelected}
                  onPress={() => handleSelectBrand(item.name)}
                />
              )}
            />
          </View>

          <View className="flex-row justify-between items-center my-5">
            <Text className="text-lg text-black font-semibold">
              Anúncios disponíveis
            </Text>

            <TouchableOpacity
              className="bg-blue-500 flex justify-center items-center rounded-lg p-1"
              onPress={() => setIsOpenAnnouncementModal(true)}
            >
              <Ionicons name="add" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>

          <FlatList
            contentContainerStyle={{
              paddingBottom: 50,
            }}
            data={carsAdverts}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <CarItem item={item} />}
          />
        </View>
      </Container>

      <CreateAnnouncementModal
        isOpen={isOpenAnnouncementModal}
        closeModal={() => setIsOpenAnnouncementModal(false)}
      />
    </>
  )
}
