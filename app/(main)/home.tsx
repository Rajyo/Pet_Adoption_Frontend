import { Text, View, useThemeColor } from '@/components/Themed'
import { upcomingVisitsData } from '@/lib/upcomingVisitsData';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react'
import { Image, ScrollView } from 'react-native';
import RenderUpcomingVisits from '../(components)/(home)/RenderUpcomingVisits';
import { newlyWelcomedData } from '@/lib/newlyWelcomedData';
import RenderNewlyWelcomed from '../(components)/(home)/RenderNewlyWelcomed';
import VideoComponent from '../(components)/(home)/VideoComponent';


function Icon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  size: number
}) {
  return <FontAwesome style={{ marginBottom: -3, }} {...props} />;
}

const Main = () => {

  return (
    <ScrollView style={{ minHeight: "100%", paddingHorizontal: 20, backgroundColor: useThemeColor({ light: "white", dark: "black" }, 'background')}}>

      <View style={{ display: "flex", flexDirection: "row", gap: 20, marginVertical: 15 }}>
        <Icon name='location-arrow' color='gray' size={22}></Icon>
        <Text style={{ fontSize: 15 }}>Maharashtra, INDIA</Text>
      </View>

      <View style={{ marginTop: 15 }}>
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>Upcoming Visits</Text>
          <Text style={{ fontSize: 15, color: "orange", fontWeight: "bold" }}>See All</Text>
        </View>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginTop: -5}}>
          {
            upcomingVisitsData.map((item) => (
              <RenderUpcomingVisits key={item.id} data={item}/>
            ))
          }
        </ScrollView>
      </View>


      <View style={{ marginTop: 20 }}>
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>Newly Welcomed</Text>
          <Text style={{ fontSize: 15, color: "orange", fontWeight: "bold" }}>See All</Text>
        </View>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginTop: -5}}>
          {
            newlyWelcomedData.map((item) => (
              <RenderNewlyWelcomed key={item.id} data={item}/>
            ))
          }
        </ScrollView>
      </View>
      
      
      <ScrollView style={{ marginTop: 10, marginBottom: 30 }}>
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginVertical: 10}}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>Story of the Day</Text>
        </View>

        <VideoComponent />
      </ScrollView>

    </ScrollView>
  )
}

export default Main

