import React, { useEffect, useState } from 'react'
import {
  Alert,
  GestureResponderEvent,
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
import { z } from 'zod'
import { api } from '../services/api'

type CustomModalProps = {
  isOpen: boolean
  closeModal: () => void
}

type InputErrors = {
  [x: string]: string
}

const createAnnouncementSchema = z.object({
  image: z.string().url(),
  brand: z.string().min(4, 'Marca é obrigatória!'),
  model: z.string().min(4, 'Modelo é obrigatório!'),
  year: z.string().min(4, 'Ano é obrigatório!').max(4, 'Ano invalido!'),
  price: z.coerce.number().min(4, 'Valor é obrigatório!'),
  km: z.coerce.number().min(4, 'Quilometragem é obrigatória!'),
  city: z.string().min(4, 'Cidade é obrigatória!'),
})

export function CreateAnnouncementModal({
  isOpen,
  closeModal,
}: CustomModalProps) {
  const [status, requestPermission] = ImagePicker.useCameraPermissions()

  const [image, setImage] = useState<string>('')
  const [model, setModel] = useState<string>('')
  const [brand, setBrand] = useState<string>('')
  const [year, setYear] = useState<string>('')
  const [price, setPrice] = useState<string>('')
  const [km, setKm] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [isLoading, setLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<InputErrors | null>(null)

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

  const removeError = (input: string) => {
    if (!errors) return

    const newObject = { ...errors }
    newObject[input] = ''

    setErrors(newObject)
  }

  const handleCreateAnnouncement = async () => {
    setLoading(true)

    try {
      const payload = createAnnouncementSchema.safeParse({
        image,
        brand,
        year,
        price,
        km,
        city,
      })

      if (!payload.success) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        Object.entries(payload.error.issues).forEach(([_, issue]) => {
          setErrors((prevState) => ({
            ...prevState,
            [issue.path[0]]: issue.message,
          }))
        })
        return
      }

      await api.post('/cars', payload.data)

      Alert.alert(
        'Anuncio criado com sucesso!',
        'Agora visualize seu anuncio com os demais.',
        [{ text: 'OK', onPress: () => closeModal() }],
      )
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
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

                <View className="flex-row justify-between items-center">
                  <View className="flex-1 mr-4">
                    <Input
                      title="Modelo"
                      value={model}
                      placeholder="Exp: Gol"
                      onChangeText={(text) => {
                        setModel(text)
                        removeError('model')
                      }}
                      error={errors?.model}
                    />
                  </View>
                  <View className="flex-1">
                    <Input
                      title="Marca"
                      value={brand}
                      placeholder="Exp: Chevrolet"
                      onChangeText={(text) => {
                        setBrand(text)
                        removeError('brand')
                      }}
                      error={errors?.brand}
                    />
                  </View>
                </View>
                <Input
                  title="Ano do veiculo"
                  value={year}
                  placeholder="Exp: 2023"
                  keyboardType="number-pad"
                  onChangeText={(text) => {
                    setYear(text)
                    removeError('year')
                  }}
                  error={errors?.year}
                />
                <Input
                  title="Valor"
                  value={price}
                  keyboardType="number-pad"
                  placeholder="Exp: 14000"
                  onChangeText={(text) => {
                    setPrice(text)
                    removeError('price')
                  }}
                  error={errors?.price}
                />
                <Input
                  value={km}
                  title="Quilometragem"
                  placeholder="Exp: 50000"
                  keyboardType="number-pad"
                  onChangeText={(text) => {
                    setKm(text)
                    removeError('km')
                  }}
                  error={errors?.km}
                />
                <Input
                  title="Cidade"
                  value={city}
                  placeholder="Exp: Brasilia, Distrito Federal"
                  onChangeText={(text) => {
                    setCity(text)
                    removeError('city')
                  }}
                  error={errors?.city}
                />

                <View className="my-4">
                  <ButtonLoading
                    text="Criar"
                    isLoading={isLoading}
                    onPress={handleCreateAnnouncement}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}
