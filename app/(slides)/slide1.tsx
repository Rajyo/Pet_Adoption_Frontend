import { View, Text } from '@/components/Themed'
import { Link, useRouter } from 'expo-router'
import React from 'react'
import { Button, Dimensions, Image, TouchableOpacity } from 'react-native'

const Slide1 = () => {

  const router = useRouter()

  return (
    <View style={{ minHeight: Dimensions.get('window').height }}>

      <Image source={require('../../assets/images/slide1.jpg')} style={{
        width: (Dimensions.get('window').width),
        height: (Dimensions.get('window').width),
      }} />

      <View style={{ gap: 20, marginTop: 30 }}>
        <Text style={{ fontSize: 19, opacity: 0.9, textAlign: "center", fontWeight: "700" }}>Adopt a life and get a friend</Text>
        <Text style={{ fontSize: 14, textAlign: "center", paddingHorizontal: 30, opacity: 0.6, fontWeight: "600" }}>Find a new member for your family amongst different pets in the nearby pet shelter homes.</Text>
      </View>

      {/* <Link style={{textAlign: "right", marginRight: 20, marginTop: 100}} href={'/(slides)/slide2'}>
        <Text style={{backgroundColor:"blue", color: "white", paddingVertical: 8, paddingHorizontal: 20, borderRadius: 10, fontSize:18, fontWeight:"600"}}>Next</Text>
      </Link> */}

      <TouchableOpacity style={{ marginRight: 20, marginTop: 100, width: 80, alignItems: "center", position: "relative", display: "flex", flexDirection: "row", justifyContent: "space-between", alignSelf: "flex-end" }} onPress={() => router.push('/(slides)/slide2')}>
        <Text style={{ backgroundColor: "#fd6100", color: "white", paddingVertical: 8, paddingHorizontal: 20, borderRadius: 10, fontSize: 18, fontWeight: "600" }}>Next</Text>
      </TouchableOpacity>

    </View>
  )
}

export default Slide1