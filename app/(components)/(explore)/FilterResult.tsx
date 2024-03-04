import { View, Text, useThemeColor } from '@/components/Themed'
import { PetProfile } from '@/lib/petProfile'
import { FontAwesome } from '@expo/vector-icons'
import { Link, Stack, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Dimensions, Image, ImageSourcePropType, ScrollView, TouchableOpacity } from 'react-native'

type finalResultType = {
    petType: string,
    gender: string,
    age: string,
    breed: string
}


function Icon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
    size: number
}) {
    return <FontAwesome style={{ marginBottom: -3, }} {...props} />;
}

const FilterResult = () => {
    const { petType, gender, age, breed }: finalResultType = useLocalSearchParams()

    const filterData = [
        {
            id: 1,
            filterType: petType
        },
        {
            id: 2,
            filterType: breed
        },
        {
            id: 3,
            filterType: gender
        },
        {
            id: 4,
            filterType: age
        },
    ]

    return (
        <ScrollView contentContainerStyle={{ width: Dimensions.get('window').width * 0.9, alignSelf: "center" }} style={{ minHeight: "100%", backgroundColor: useThemeColor({ light: "white", dark: "black" }, 'background') }}>

            <View style={{ display: "flex", flexDirection: "row", gap: 20, flexWrap: "wrap", marginVertical: 20, }}>
                {
                    filterData.map((filter) => (
                        <TouchableOpacity key={filter.id} style={{ display: 'flex', flexDirection: "row", backgroundColor: '#cccccc', paddingHorizontal: 10, paddingVertical: 10, gap: 15, borderRadius: 5, alignItems: "center" }}>
                            <Text style={{ fontSize: 16 }}>{filter.filterType}</Text>
                            <Icon color='gray' size={19} name='trash' />
                        </TouchableOpacity>
                    ))
                }
            </View>

            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 35, marginVertical: 30 }}>
                {
                    PetProfile.map((data) => (
                        <Link key={data.id} href={{ pathname: '/(components)/(explore)/PetProfile', params: { id: data.id, age: data.age, behaviour: data.behaviour, breed: data.breed, gender: data.gender, info: data.info, location: data.location, pic: data.pic, name: data.name } }} >
                            <View style={{ width: 140, height: 125, borderRadius: 5, shadowColor: 'gray', elevation: 10, shadowOffset: { width: 5, height: 5 }, shadowOpacity: 0.8, shadowRadius: 5, borderColor: "gray", borderWidth: 1, position: "relative", }}>

                                <Image source={data.pic} style={{ width: 140, height: 125, opacity: 0.9, objectFit: "cover" }} />
                                <View style={{ position: "absolute", zIndex: 50, backgroundColor: "transparent", bottom: 0, paddingLeft: 5 }}>

                                    <View style={{ backgroundColor: "transparent", display: "flex", flexDirection: "row", justifyContent: "space-between", width: 130, alignItems: "center", }}>
                                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>{data.name}</Text>
                                        <Text style={{ color: "white", fontSize: 13, fontWeight: "bold" }}>2w</Text>
                                    </View>

                                    <Text style={{ color: "white", fontSize: 13, fontWeight: "bold" }}>{data.breed}</Text>
                                </View>

                            </View>
                        </Link>
                    ))
                }
            </View>

        </ScrollView>
    )
}

export default FilterResult