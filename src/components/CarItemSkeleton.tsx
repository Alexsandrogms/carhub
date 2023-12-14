import { View } from 'react-native'
import {
  Fade,
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
} from 'rn-placeholder'

export function CartItemSkeleton() {
  return (
    <Placeholder Animation={Fade} className="bg-slate-50 rounded-2xl my-2">
      <PlaceholderMedia className="w-full h-44 rounded-2xl mb-3" />

      <View className="p-4">
        <PlaceholderLine width={40} />
        <PlaceholderLine width={20} />
        <View className="flex-row justify-between items-center">
          <PlaceholderLine width={30} />
          <PlaceholderLine width={20} />
        </View>
      </View>
    </Placeholder>
  )
}
