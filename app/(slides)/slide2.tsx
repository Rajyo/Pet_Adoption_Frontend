import { View, Text } from '@/components/Themed'
import { Link } from 'expo-router'
import React from 'react'

const Slide2 = () => {
  return (
    <View>
      <Text>Slide2</Text>
      <Link style={{margin: 100}} href={'/(slides)/slide3'}>
        <Text>Final</Text>
      </Link>
    </View>
  )
}

export default Slide2