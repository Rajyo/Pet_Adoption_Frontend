import { Text, View, useThemeColor } from '@/components/Themed'
import { FontAwesome } from '@expo/vector-icons';
import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Image, ImageSourcePropType, RefreshControl, ScrollView } from 'react-native';
import RenderUpcomingVisits from '../(components)/(home)/RenderUpcomingVisits';
import RenderNewlyWelcomed from '../(components)/(home)/RenderNewlyWelcomed';
import VideoComponent from '../(components)/(home)/VideoComponent';
import axios from 'axios';
import idToken from '@/components/getIdToken';
import { MyContext } from '@/providers/storageProvider';
import { Link } from 'expo-router';


function Icon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  size: number
}) {
  return <FontAwesome style={{ marginBottom: -3, }} {...props} />;
}

type HomeDataType = {
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

const Main = () => {
  const { storeToken, storeId } = useContext(MyContext);
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<HomeDataType[]>([])

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


  return (
    <ScrollView style={{ minHeight: "100%", paddingHorizontal: 20, backgroundColor: useThemeColor({ light: "white", dark: "black" }, 'background') }} >

      <View style={{ display: "flex", flexDirection: "row", gap: 20, marginVertical: 15 }} >
        <Icon name='location-arrow' color='gray' size={22}></Icon>
        <Text style={{ fontSize: 15 }}>Maharashtra, INDIA</Text>
      </View>

      <View style={{ marginTop: 15 }}>
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>Upcoming Visits</Text>
          <Text style={{ fontSize: 15, color: "orange", fontWeight: "bold", alignSelf: "center", }} >Scroll</Text>
        </View>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginTop: 5 }}>
          {
            data && data?.map((item: HomeDataType) => (
              <RenderUpcomingVisits key={item._id} data={item} />
            ))
          }
        </ScrollView>
      </View>


      <View style={{ marginTop: 25 }}>
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>Newly Welcomed</Text>
          <Link href={'/(main)/explore'}>
            <Text style={{ fontSize: 15, color: "orange", fontWeight: "bold" }} >See All</Text>
          </Link>
        </View>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginTop: 5 }} contentContainerStyle={{ gap: 20 }}>
          {
            data && data?.map((item: HomeDataType) => (
              <RenderNewlyWelcomed key={item._id} data={item} />
            ))
          }
        </ScrollView>
      </View>


      <ScrollView style={{ marginTop: 15, marginBottom: 30 }}>
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginVertical: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>Story of the Day</Text>
        </View>

        <VideoComponent />
      </ScrollView>

    </ScrollView>
  )
}

export default Main

