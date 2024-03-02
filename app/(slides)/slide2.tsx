import { View, Text } from '@/components/Themed'
import { Link, useRouter } from 'expo-router'
import React from 'react'
import { Dimensions, Image, TouchableOpacity } from 'react-native'

const Slide2 = () => {
  const router = useRouter()

  return (
    <View style={{ minHeight: Dimensions.get('window').height }}>
      
      <Image source={require('../../assets/images/slide2.jpg')} style={{
        width: (Dimensions.get('window').width),
        height: (Dimensions.get('window').width),
      }} />

      <View style={{gap: 20, marginTop: 30}}>
        <Text style={{fontSize: 19, opacity: 0.9, textAlign:"center", fontWeight:"700"}}>Save a sentient life</Text>
        <Text style={{fontSize: 14, textAlign:"center", paddingHorizontal: 30, opacity: 0.6, fontWeight:"600"}}>You are saving the lofe of a sentinent creature who is in desperate need of living home.</Text>
      </View>

      <TouchableOpacity style={{ marginRight: 20, marginTop: 100, width: 80, alignItems: "center", position: "relative", display: "flex", flexDirection: "row", justifyContent: "space-between", alignSelf: "flex-end" }} onPress={() => router.push('/(slides)/slide3')}>
        <Text style={{ backgroundColor: "#fd6100", color: "white", paddingVertical: 8, paddingHorizontal: 20, borderRadius: 10, fontSize: 18, fontWeight: "600" }}>Next</Text>
      </TouchableOpacity>

    </View>
  )
}

export default Slide2