import { View, Text } from '@/components/Themed'
import { Link } from 'expo-router'
import React from 'react'

const Slide3 = () => {
  return (
    <View>
      <Text>Slide3</Text>
      <Link style={{margin: 100}} href={'/(auth)/sign-in'}>
        <Text>Sign-in</Text>
      </Link>
    </View>
  )
}

export default Slide3