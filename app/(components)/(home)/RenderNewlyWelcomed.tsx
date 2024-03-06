import { Text } from '@/components/Themed'
import { Link } from 'expo-router';
import React from 'react'
import { Image, ImageSourcePropType, View } from 'react-native';



type renderNewlyWelcomedProps = {
    data: {
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
    }
}

const RenderNewlyWelcomed = ({ data }: renderNewlyWelcomedProps) => {

    return (
        <Link key={data._id} href={{ pathname: '/(components)/(explore)/PetProfile', params: { _id: data._id, ageInWeeks: data.ageInWeeks, petBehaviour: data.petBehaviour, breed: data.breed, gender: data.gender, petInfo: data.petInfo, location: data.location, pic: data.pic as any, name: data.name } }} >
            <View style={{ marginVertical: 10, marginRight: 20, display: "flex", width: 135, height: 125, flexDirection: "row", borderRadius: 5, justifyContent: "space-between", shadowColor: 'gray', elevation: 10, shadowOffset: { width: 5, height: 5 }, shadowOpacity: 0.8, shadowRadius: 5, borderColor: "gray", borderWidth: 1, position: "relative" }}>

                <Image source={data.pic} style={{ width: 135, height: 125, opacity: 0.9, objectFit: "cover" }} />
                <View style={{ position: "absolute", zIndex: 50, backgroundColor: "transparent", bottom: 0, paddingLeft: 5 }}>

                    <View style={{ backgroundColor: "transparent", display: "flex", flexDirection: "row", justifyContent: "space-between", width: 125, alignItems: "center", }}>
                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>{data.name}</Text>
                        <Text style={{ color: "white", fontSize: 13, fontWeight: "bold" }}>{data.ageInWeeks}w</Text>
                    </View>

                    <Text style={{ color: "white", fontSize: 12, fontWeight: "bold", marginTop: 2 }}>{data.breed}</Text>
                </View>

            </View>
        </Link>
    )
}

export default RenderNewlyWelcomed