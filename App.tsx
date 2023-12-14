import React from 'react'
import { StatusBar } from 'expo-status-bar'

import { Routes } from './src/routes'
import { AuthProvider } from './src/contexts/AuthContext'

export default function App() {
  return (
    <AuthProvider>
      <Routes />
      <StatusBar style="auto" />
    </AuthProvider>
  )
}
