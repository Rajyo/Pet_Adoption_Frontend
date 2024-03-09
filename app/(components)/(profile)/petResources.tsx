import { Icon } from '@/app/(main)/explore'
import { View, Text, useThemeColor } from '@/components/Themed'
import { petResources } from '@/lib/petResources'
import React from 'react'
import { ScrollView } from 'react-native'

const PetResources = () => {
  return (
    <ScrollView style={{ minHeight: "100%", paddingHorizontal: 20, paddingVertical: 10, backgroundColor: useThemeColor({ light: "white", dark: "black" }, 'background') }}>
      {
        petResources.map((item) => (
          <View key={item.id} style={{ marginVertical: 15 }}>
            <View style={{display:"flex", flexDirection:"row"}}>
              <Text style={{ fontSize: 18, fontWeight: "bold", paddingBottom: 5 }}>{item.title}</Text>
              <a href={item.link} style={{paddingLeft:10, alignSelf:"center", textDecoration:"none"}}>
                <Icon color={useThemeColor({ light: "blue", dark: "blue" }, 'background')} size={13} name='link'></Icon>
              </a>
            </View>
            <Text style={{ fontSize: 13, color: "rgb(110,110,110)" }}>{item.info}</Text>
          </View>
        ))
      }
    </ScrollView>
  )
}

export default PetResources