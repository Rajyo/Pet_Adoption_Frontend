import { Icon } from '@/app/(main)/explore'
import { View, Text, useThemeColor } from '@/components/Themed'
import { petResources } from '@/lib/petResources'
import { Link } from 'expo-router'
import React from 'react'
import { ScrollView } from 'react-native'

const PetResources = () => {
  return (
    <ScrollView style={{ minHeight: "100%", paddingHorizontal: 20, paddingVertical: 10, backgroundColor: useThemeColor({ light: "white", dark: "black" }, 'background') }}>
      {
        petResources.map((item: PetResourcesType) => (
          <View key={item.id} style={{ marginVertical: 20 }}>
            <View style={{display:"flex", flexDirection:"row"}}>
              <Text style={{ fontSize: 20, fontWeight: "bold", paddingBottom: 5 }}>{item.id}. {item.title}</Text>
              <Link href={item.link as any} style={{paddingLeft:10, alignSelf:"center"}}>
                <Icon color={useThemeColor({ light: "blue", dark: "red" }, 'background')} size={14} name='link'></Icon>
              </Link>
            </View>
            <Text style={{ fontSize: 14, color: "rgb(110,110,110)" }}>{item.info}</Text>
          </View>
        ))
      }
    </ScrollView>
  )
}

export default PetResources