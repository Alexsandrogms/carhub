import React, { ReactNode } from 'react'
import { SafeAreaView, View, ViewProps } from 'react-native'

interface ContainerProps extends ViewProps {
  children: ReactNode
}

export function Container({ children, ...rest }: ContainerProps) {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View
        {...rest}
        className="flex-1 relative items-center justify-start p-6"
      >
        {children}
      </View>
    </SafeAreaView>
  )
}
