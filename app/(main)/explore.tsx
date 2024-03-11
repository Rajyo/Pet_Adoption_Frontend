import { Text, useThemeColor } from '@/components/Themed'
import idToken from '@/components/getIdToken'
import { MyContext } from '@/providers/storageProvider'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, FlatList, GestureResponderEvent, Image, ImageSourcePropType, ScrollView, TextInput, TouchableOpacity, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import RenderNewlyWelcomed from '../(components)/(home)/RenderNewlyWelcomed'
import {BACKEND_URL} from '@env'


export function Icon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  size: number
}) {
  return <FontAwesome style={{ marginBottom: -3, }} {...props} />;
}

const Explore = () => {
  const { storeToken, storeId } = useContext(MyContext);
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<PetType[]>([])
  const [items, setItems] = useState<PetType[]>([])
  const [searchByName, setSearchByName] = useState<string>('')
  const [refreshing, setRefreshing] = useState<boolean>(false)

  const token = storeToken == 'No Token' ? idToken().storeToken : storeToken

  const petProfile = async () => {
    await axios.get(`${BACKEND_URL}/petProfile/`, {
      headers: {
        Authorization: token
          ? "Bearer " + token
          : null,
        "Content-Type": "application/json",
        accept: "application/json",
      },
    })
      .then(res => {
        // console.log(res.data);
        setData(res.data)
        setItems(res.data)
        setLoading(false)
      })
      .catch((error: any) => {
        console.log(error)
        setLoading(false)
      })
  }
  
  useEffect(() => {
    setLoading(true)
    petProfile()

  }, [token])
  

  loading && <ActivityIndicator />


  useEffect(() => {
    const filteredItems: any[] = []

    const reverseString = (str: string) => {
      return str.split("").reverse().join("");
    }
    const reverseSearchName = reverseString(searchByName)

    data.length > 0 && data.map((item: PetType) => {

      if (item.name.toLowerCase().includes(searchByName.toLowerCase()) || item.name.toLowerCase().includes(reverseSearchName.toLowerCase())) {
        filteredItems.push(item)
      }
    })
    setItems(filteredItems)

  }, [searchByName])

  const handleRefresh = () => {
    setRefreshing(true)
    setSearchByName('')
    petProfile()
    setRefreshing(false)
  }

  return (
    <ScrollView style={{ minHeight: "100%", backgroundColor: useThemeColor({ light: "white", dark: "black" }, 'background') }} contentContainerStyle={{ width: Dimensions.get('window').width * 0.9, alignSelf: "center" }}>

      <View style={{ marginVertical: 20, position: "relative", display:"flex", flexDirection:"row", alignItems:"center", }}>
        <View style={{ position:"absolute", zIndex:10, left:15}}>
          <Icon color='gray' name='search' size={18} />
        </View>
        <TextInput
          value={searchByName}
          onChangeText={setSearchByName}
          placeholder='search pet by name...'
          placeholderTextColor={'gray'}
          style={{ borderWidth: 1, borderColor: 'gray', padding: 8, marginTop: 5, backgroundColor: 'white', borderRadius: 20, textAlign: "center", width: Dimensions.get('window').width * 0.9, color:"gray" }}
        />
      </View>

      {/* <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly", marginVertical: 20, gap: 30 }} >
        {
          items.length > 0 && items.map((data: PetType) => (
            <RenderNewlyWelcomed key={data._id} data={data} />
          ))
        }
      </View> */}
      {
       items.length > 0 && (
        <FlatList 
          data={items}
          renderItem={({ item }) => <RenderNewlyWelcomed data={item} />}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly", marginVertical: 20, gap: 30 }}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
       ) 
      }

      <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 35, marginVertical: 30 }}>
        {
          (items.length == 0 && searchByName.length != 0) && <View style={{ display: "flex", alignItems: "center", width: "100%", gap: 50, paddingVertical: 40, }}>
            <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold", textTransform: 'uppercase', color: "red" }}>There are no matches for your searched name.</Text>
            <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold", textTransform: 'uppercase', color: "red" }}>Please consider providing valid pet names.</Text>
          </View>
        }
      </View>


    </ScrollView>
  )
}

export default Explore
