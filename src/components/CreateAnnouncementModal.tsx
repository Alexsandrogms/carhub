import React, { useEffect, useState } from 'react'
import {
  Button,
  GestureResponderEvent,
  Image,
  Keyboard,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Ionicons } from '@expo/vector-icons'

import { Input } from './Inputs/Default'
import { ButtonLoading } from './Buttons/Loading'

type CustomModalProps = {
  isOpen: boolean
  closeModal: () => void
}

export function CreateAnnouncementModal({
  isOpen,
  closeModal,
}: CustomModalProps) {
  const [status, requestPermission] = ImagePicker.useCameraPermissions()

  const [image, setImage] = useState<string>('')
  const [brand, setBrand] = useState<string>('')
  const [year, setYear] = useState<string>('')
  const [price, setPrice] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [isLoading, setLoading] = useState<boolean>(false)

  const handleContentPress = (e: GestureResponderEvent) => {
    Keyboard.dismiss()
    e.stopPropagation()
  }

  const pickImage = async () => {
    if (!status?.granted) return

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  useEffect(() => {
    requestPermission()
  }, [requestPermission])

  return (
    <Modal
      transparent
      statusBarTranslucent
      animationType="slide"
      visible={isOpen}
    >
      <TouchableWithoutFeedback onPress={closeModal}>
        <View
          className="flex-1 bg-overlay justify-center items-center px-5"
          style={{
            backgroundColor: 'rgba(0,0,0,0.7)',
          }}
        >
          <View className="w-full h-[650px] bg-white rounded-md px-2">
            <TouchableWithoutFeedback onPress={handleContentPress}>
              <View className="flex-1 flex justify-around p-4">
                <Text className="font-bold text-2xl text-center my-4">
                  Adicionar anúncio
                </Text>

                <TouchableOpacity
                  className="flex-row items-center justify-center my-6 mx-2"
                  onPress={pickImage}
                >
                  <Ionicons name="image" size={50} color="black" />
                  {image ? (
                    <Text className="text-base font-light ml-4 text-cyan-600">
                      Imagem selecionada, clique novamente caso queira
                      altera-la.
                    </Text>
                  ) : (
                    <Text className="text-base font-light ml-4">
                      Clique para adicionar uma {'\n'}imagem do veiculo.
                    </Text>
                  )}
                </TouchableOpacity>

                <Input
                  title="Marca"
                  value={brand}
                  onChangeText={(e) => setBrand(e)}
                />
                <Input
                  title="Ano do veiculo"
                  value={year}
                  onChangeText={(e) => setYear(e)}
                />
                <Input
                  title="Valor"
                  value={price}
                  onChangeText={(e) => setPrice(e)}
                />
                <Input
                  title="Quilometragem"
                  value={city}
                  onChangeText={(e) => setCity(e)}
                />
                <Input
                  title="Cidade"
                  value={city}
                  onChangeText={(e) => setCity(e)}
                />

                <View className="my-4">
                  <ButtonLoading text="Criar" isLoading={isLoading} />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}
