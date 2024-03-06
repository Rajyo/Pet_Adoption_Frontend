import { Text, useThemeColor } from '@/components/Themed'
import idToken from '@/components/getIdToken'
import { MyContext } from '@/providers/storageProvider'
import axios from 'axios'
import { Link } from 'expo-router'
import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, GestureResponderEvent, Image, ImageSourcePropType, ScrollView, TextInput, TouchableOpacity, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import RenderNewlyWelcomed from '../(components)/(home)/RenderNewlyWelcomed'

type ExploreDataType = {
  _id: string
  ageInWeeks: number
  breed: string
  gender: string
  location: string
  name: string
  petBehaviour: string
  pic: ImageSourcePropType | undefined
  typeOfPet: string
  dateTime: string
  petInfo: string[]
  likes?: string[] | null
}

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
  const [data, setData] = useState<ExploreDataType[]>([])
  const [dataa, setDataa] = useState<ExploreDataType>()
  const [items, setItems] = useState<ExploreDataType[]>([])
  const [searchByName, setSearchByName] = useState<string>('')


  const token = storeToken == 'No Token' ? idToken().storeToken : storeToken

  useEffect(() => {
    setLoading(true)
    const petProfile = async () => {
      await axios.get('http://10.0.0.58:8000/api/petProfile/', {
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
    petProfile()

  }, [token])

  loading && <ActivityIndicator />


  useEffect(() => {
    const filteredItems: any[] = []

    const reverseString = (str: string) => {
      return str.split("").reverse().join("");
    }
    const reverseSearchName = reverseString(searchByName)

    data.length > 0 && data.map((item: ExploreDataType) => {

      if (item.name.toLowerCase().includes(searchByName.toLowerCase()) || item.name.toLowerCase().includes(reverseSearchName.toLowerCase())) {
        filteredItems.push(item)
      }
    })
    setItems(filteredItems)

  }, [searchByName])


  return (
    <ScrollView style={{ minHeight: "100%", backgroundColor: useThemeColor({ light: "white", dark: "black" }, 'background') }} contentContainerStyle={{ width: Dimensions.get('window').width * 0.9, alignSelf: "center" }}>

      <View style={{ marginVertical: 20, position: "relative" }}>
        <View style={{ position: "absolute", top: 14, left: 15, opacity: 0.8 }}>
          <Icon color='gray' name='search' size={18} />
        </View>
        <TextInput
          value={searchByName}
          onChangeText={setSearchByName}
          placeholder='search pet by name...'
          placeholderTextColor={'gray'}
          style={{ borderWidth: 1, borderColor: 'gray', padding: 8, marginTop: 5, backgroundColor: 'white', borderRadius: 20, textAlign: "center" }}
        />
      </View>

      <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent:"space-around", marginVertical:20}} >
        {
          items.length > 0 && items.map((data: ExploreDataType) => (
            <RenderNewlyWelcomed key={data._id} data={data} />
          ))
        }
      </View>

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
