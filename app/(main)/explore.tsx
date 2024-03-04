import { Text, useThemeColor } from '@/components/Themed'
import { newlyWelcomedData } from '@/lib/newlyWelcomedData'
import React, { useEffect, useState } from 'react'
import { Dimensions, Image, ImageSourcePropType, ScrollView, TouchableOpacity, View } from 'react-native'


const filters = [
  {
    id: 1,
    name: "All"
  },
  {
    id: 2,
    name: "Dog"
  },
  {
    id: 3,
    name: "Cat"
  },
]

type itemsType = {
  id: number
  name: string
  week: string
  breed: string
  type: string
  pic: ImageSourcePropType | undefined
}

const Explore = () => {
  const [filter, setFilter] = useState<string>('All')
  const [clicked, setClicked] = useState<boolean>(false)
  const [items, setItems] = useState<itemsType[]>([])


  useEffect(() => {
    setClicked(true)

    const items = newlyWelcomedData.filter((item) => {
      if (item.type == filter)
        return item
    })
    setItems(items)

    if (items.length == 0) {
      const allItems = newlyWelcomedData.map((item) => {
        return item
      })
      setItems(allItems)
    }

  }, [filter])

  // console.log(items);

  return (
    <ScrollView style={{ minHeight: "100%", backgroundColor: useThemeColor({ light: "white", dark: "black" }, 'background') }} contentContainerStyle={{ width: Dimensions.get('window').width * 0.9, alignSelf: "center" }}>
      <Text style={{ marginTop: 10, marginBottom: 20, fontSize: 25, fontWeight: "bold" }}>Categories</Text>

      <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
        {
          filters.map((item) => (
            <TouchableOpacity key={item.id} >
              <Text onPress={() => setFilter(item.name)} style={{ backgroundColor: clicked && item.name == filter ? "#fd6100" : "#cccccc", color: clicked && item.name == filter ? "white" : "black", paddingVertical: 8, paddingHorizontal: 18, borderRadius: 10, fontSize: 16, fontWeight: "600" }}>{item.name}</Text>
            </TouchableOpacity>
          ))
        }
      </View>

      <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 35, marginVertical: 30 }}>
        {
          items.map((data) => (
            
            <View key={data.id} style={{ width: 140, height: 125, borderRadius: 5, shadowColor: 'gray', elevation: 10, shadowOffset: { width: 5, height: 5 }, shadowOpacity: 0.8, shadowRadius: 5, borderColor: "gray", borderWidth: 1, position: "relative", }}>

              <Image source={data.pic} style={{ width: 140, height: 125, opacity: 0.9, objectFit: "cover" }} />
              <View style={{ position: "absolute", zIndex: 50, backgroundColor: "transparent", bottom: 0, paddingLeft: 5 }}>

                <View style={{ backgroundColor: "transparent", display: "flex", flexDirection: "row", justifyContent: "space-between", width: 130, alignItems: "center", }}>
                  <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>{data.name}</Text>
                  <Text style={{ color: "white", fontSize: 13, fontWeight: "bold" }}>{data.week}</Text>
                </View>

                <Text style={{ color: "white", fontSize: 13, fontWeight: "bold" }}>{data.breed}</Text>
              </View>

            </View>
          ))
        }
      </View>


    </ScrollView>
  )
}

export default Explore
