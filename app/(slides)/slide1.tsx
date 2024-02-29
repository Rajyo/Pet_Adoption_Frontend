import { View, Text } from '@/components/Themed'
import { Link } from 'expo-router'
import React from 'react'

const Slide1 = () => {

  return (
    <View>
      <Text>Index</Text>
      <Link style={{margin: 100}} href={'/(slides)/slide2'}>
        <Text>Slide1</Text>
      </Link>
    </View>
  )
}

export default Slide1