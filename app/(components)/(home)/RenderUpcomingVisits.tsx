import { Icon } from '@/app/(main)/explore';
import { View, Text } from '@/components/Themed'
import { FontAwesome } from '@expo/vector-icons';
import React from 'react'
import { Image, ImageSourcePropType } from 'react-native';



const RenderUpcomingVisits = ({ data }: renderUpcomingVisitsProps) => {

    return (
        <View style={{ marginVertical: 10, marginRight: 12, display: "flex", width: 280, flexDirection: "row", borderRadius: 5, justifyContent: "space-between", padding: 9, shadowColor: 'gray', elevation: 10, shadowOffset: { width: 5, height: 5 }, shadowOpacity: 0.8, shadowRadius: 5, borderColor: "gray", borderWidth: 1, }}>
            <View style={{ gap: 10, marginVertical: 5 }}>
                <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
                    <Icon name='calendar' color='gray' size={18} />
                    <Text style={{ opacity: 0.8, fontSize: 13, alignSelf: "center" }}>{data.dateTime}</Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
                    <Icon name='location-arrow' color='gray' size={18} />
                    <Text style={{ opacity: 0.8, fontSize: 13, alignSelf: "center" }}>{data.location}</Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row", marginTop: 8 }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>{data.name}, </Text>
                    <Text style={{ fontSize: 13, fontWeight: "bold", alignSelf: "flex-end", paddingBottom: 2 }}>{data.ageInWeeks}w</Text>
                </View>
            </View>
            <Image source={{uri:data.pic}} style={{ width: 100, height: 100, objectFit:"cover" }} />
        </View>
    )
}

export default RenderUpcomingVisits