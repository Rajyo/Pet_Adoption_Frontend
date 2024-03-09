import { Icon } from '@/app/(main)/explore'
import { View, Text, useThemeColor } from '@/components/Themed'
import { petCare } from '@/lib/petCare'
import React from 'react'
import { ScrollView } from 'react-native'

const PetCare = () => {
  return (
    <ScrollView style={{ minHeight: "100%", paddingHorizontal: 20, paddingVertical: 10, backgroundColor: useThemeColor({ light: "white", dark: "black" }, 'background') }}>
      {
        petCare.map((item) => (
          <View key={item.id} style={{ marginVertical: 15}}>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>{item.id}. {item.title}</Text>
            <View style={{ gap: 5, paddingTop:5,}}>
              {
                item.info.map((it) => (
                  <View key={it} style={{display:"flex", flexDirection:"row", paddingLeft:5, }}>
                    <View style={{paddingTop:5, paddingRight:8}}>
                    <Icon color={useThemeColor({light: "rgb(120,120,120)", dark: "rgb(120,120,120)"}, 'text')} name='minus' size={8}></Icon>
                    </View>
                    <Text style={{color:"rgb(120,120,120)", fontSize:13}}>{it}</Text>
                  </View>
                ))
              }
            </View>
          </View>
        ))
      }
    </ScrollView>
  )
}

export default PetCare