import { useEffect, useState } from 'react'
import { FlatList, Text, View, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { ICar } from '../types/car'
import { api } from '../services/api'
import { useAuth } from '../hooks/use-auth'
import { brands } from '../constants/brands'
import { CarItem } from '../components/CarItem'
import { Container } from '../components/Container'
import { BrandItem } from '../components/BrandItem'
import { CartItemSkeleton } from '../components/CarItemSkeleton'
import { CreateAnnouncementModal } from '../components/CreateAnnouncementModal'

export function Home() {
  const { user, signOut } = useAuth()

  const [fetchLoading, setFetchLoading] = useState<boolean>(false)
  const [carsAdverts, setCarsAdverts] = useState<ICar[]>([])
  const [brandSelected, setBrandSelected] = useState<string>('')
  const [isOpenAnnouncementModal, setIsOpenAnnouncementModal] = useState(false)

  function handleSelectBrand(brandValue: string) {
    setBrandSelected((prevState) =>
      prevState !== brandValue ? brandValue : '',
    )
  }

  async function fetchCarsAdverts() {
    setFetchLoading(true)
    try {
      const { data } = await api.get('/cars')

      setCarsAdverts(data)
    } catch {
    } finally {
      setFetchLoading(false)
    }
  }

  async function fetchCarsAdvertsByBrand(brand: string) {
    setFetchLoading(true)
    try {
      const { data } = await api.get(`/cars?brand=${brand}`)
      setCarsAdverts(data)
    } catch {
    } finally {
      setFetchLoading(false)
    }
  }

  useEffect(() => {
    fetchCarsAdverts()
  }, [])

  useEffect(() => {
    setCarsAdverts([])
    if (brandSelected) {
      fetchCarsAdvertsByBrand(brandSelected)
    } else {
      fetchCarsAdverts()
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
            <Text className="text-gray-500 text-base">{user?.name}</Text>
            <Text className="text-black font-semibold text-xl">
              Bem vindo de volta
            </Text>
          </View>

          <TouchableOpacity onPress={signOut}>
            <Ionicons name="exit-outline" size={30} color="black" />
          </TouchableOpacity>
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

          {!fetchLoading ? (
            <FlatList
              contentContainerStyle={{
                paddingBottom: 50,
              }}
              data={carsAdverts}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <CarItem item={item} />}
            />
          ) : (
            <>
              <CartItemSkeleton />
              <CartItemSkeleton />
            </>
          )}
        </View>
      </Container>

      <CreateAnnouncementModal
        isOpen={isOpenAnnouncementModal}
        closeModal={() => {
          setIsOpenAnnouncementModal(false)
          fetchCarsAdverts()
        }}
      />
    </>
  )
}
