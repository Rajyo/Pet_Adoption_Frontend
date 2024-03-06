import { Icon } from '@/app/(main)/explore';
import { Text } from '@/components/Themed'
import idToken from '@/components/getIdToken';
import { MyContext } from '@/providers/storageProvider';
import axios from 'axios';
import { Link } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react'
import { GestureResponderEvent, Image, ImageSourcePropType, TouchableOpacity, View } from 'react-native';

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
        likes?: string[] | null
    }
}


const RenderNewlyWelcomed = ({ data }: renderNewlyWelcomedProps) => {
    const [dataa, setDataa] = useState(data)
    const { storeToken, storeId } = useContext(MyContext);
    const token = storeToken == 'No Token' ? idToken().storeToken : storeToken

    useEffect(() => {

    }, [dataa])

    const handlePetLiking = async (e: GestureResponderEvent, id: string) => {
        e.preventDefault();

        await axios.put('http://10.0.0.58:8000/api/petProfile/like', {
            petProfileId: id
        }, {
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
                setDataa(res.data)
            })
            .catch((error: any) => {
                console.log(error)
            })
    }

    return (
        <Link key={dataa._id} href={{ pathname: '/(components)/(explore)/PetProfile', params: { _id: dataa._id, ageInWeeks: dataa.ageInWeeks, petBehaviour: dataa.petBehaviour, breed: dataa.breed, gender: dataa.gender, petInfo: dataa.petInfo, location: dataa.location, pic: dataa.pic as any, name: dataa.name } }} >
            <View style={{ marginVertical: 10, display: "flex", width: 135, height: 125, flexDirection: "row", borderRadius: 5, justifyContent: "space-between", shadowColor: 'gray', elevation: 10, shadowOffset: { width: 5, height: 5 }, shadowOpacity: 0.8, shadowRadius: 5, borderColor: "gray", borderWidth: 1, position: "relative" }}>

                <Image source={dataa.pic} style={{ width: 135, height: 125, opacity: 0.9, objectFit: "cover" }} />

                <TouchableOpacity style={{ position: "absolute", right: 0, padding: 5 }} onPress={(e) => handlePetLiking(e, dataa._id)} >
                    {
                        (dataa.likes != undefined && dataa.likes?.length > 0)
                            ? dataa.likes.map((like) => (
                                <Icon key={like} color={like == storeId ? 'red' : 'white'} size={16} name='heart' />
                            ))
                            : <Icon color='white' size={16} name='heart-o' />
                    }
                </TouchableOpacity>

                <View style={{ position: "absolute", zIndex: 50, backgroundColor: "transparent", bottom: 0, paddingLeft: 5 }}>

                    <View style={{ backgroundColor: "transparent", display: "flex", flexDirection: "row", justifyContent: "space-between", width: 125, alignItems: "center", }}>
                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>{dataa.name}</Text>
                        <Text style={{ color: "white", fontSize: 13, fontWeight: "bold" }}>{dataa.ageInWeeks}w</Text>
                    </View>

                    <Text style={{ color: "white", fontSize: 12, fontWeight: "bold", marginTop: 2 }}>{dataa.breed}</Text>
                </View>

            </View>
        </Link>
    )
}

export default RenderNewlyWelcomed