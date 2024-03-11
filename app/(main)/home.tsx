import { Text, View, useThemeColor } from '@/components/Themed'
import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, ImageSourcePropType, RefreshControl, ScrollView } from 'react-native';
import RenderUpcomingVisits from '../(components)/(home)/RenderUpcomingVisits';
import RenderNewlyWelcomed from '../(components)/(home)/RenderNewlyWelcomed';
import VideoComponent from '../(components)/(home)/VideoComponent';
import axios from 'axios';
import idToken from '@/components/getIdToken';
import { MyContext } from '@/providers/storageProvider';
import { Link } from 'expo-router';
import { BACKEND_URL } from '@env'
import { Icon } from './explore';


const Main = () => {
  const { storeToken, storeId } = useContext(MyContext);
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<PetType[]>([])
  const [refreshing, setRefreshing] = React.useState(false);

  const token = storeToken == 'No Token' ? idToken().storeToken : storeToken

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    petProfile()
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

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


  return (
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} style={{ minHeight: "100%", paddingHorizontal: 10, backgroundColor: useThemeColor({ light: "white", dark: "black" }, 'background') }} >

      <View style={{ display: "flex", flexDirection: "row", gap: 20, marginVertical: 15 }} >
        <Icon name='location-arrow' color='gray' size={22}></Icon>
        <Text style={{ fontSize: 15 }}>Maharashtra, INDIA</Text>
      </View>

      <View style={{ marginTop: 15 }}>
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>Upcoming Visits</Text>
          <Text style={{ fontSize: 15, color: "orange", fontWeight: "bold", alignSelf: "center", }} >Scroll</Text>
        </View>
        {
          data && (
            <FlatList
              data={data}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={RenderUpcomingVisits}
              keyExtractor={(item) => item._id}
            />
          )
        }
      </View>


      <View style={{ marginTop: 25 }}>
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>Newly Welcomed</Text>
          <Link href={'/(main)/explore'}>
            <Text style={{ fontSize: 15, color: "orange", fontWeight: "bold" }} >See All</Text>
          </Link>
        </View>
        {
          data && (
            <FlatList
              data={data}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => <RenderNewlyWelcomed data={item} />}
              keyExtractor={(item) => item._id}
              contentContainerStyle={{ gap: 20 }}
              extraData={refreshing}
            />
          )
        }
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

