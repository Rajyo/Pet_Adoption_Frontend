import { Text, View } from '@/components/Themed'
import { upcomingVisitsData } from '@/lib/upcomingVisitsData';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react'
import { Image, ScrollView } from 'react-native';
import RenderUpcomingVisits from '../(components)/RenderUpcomingVisits';

function Icon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  size: number
}) {
  return <FontAwesome style={{ marginBottom: -3, }} {...props} />;
}

const home = () => {

  return (
    <View style={{ minHeight: "100%", paddingHorizontal: 20 }}>

      <View style={{ display: "flex", flexDirection: "row", gap: 20, marginVertical: 10 }}>
        <Icon name='location-arrow' color='gray' size={22}></Icon>
        <Text style={{ fontSize: 15 }}>Maharashtra, INDIA</Text>
      </View>

      <View style={{ marginTop: 20 }}>
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>Upcoming Visits</Text>
          <Text style={{ fontSize: 15, color: "orange", fontWeight: "bold" }}>See All</Text>
        </View>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {
            upcomingVisitsData.map((item) => (
              <RenderUpcomingVisits key={item.id} data={item}/>
            ))
          }
        </ScrollView>
      </View>
      
      

    </View>
  )
}

export default home

