import { Text, View } from '@/components/Themed'
import idToken from '@/components/getIdToken'
import { MyContext } from '@/providers/storageProvider';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Icon } from './explore';
import { Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const Favourites = () => {
  const [petLiked, setPetLiked] = useState<string[] | null>(null)
  const { storeToken, storeId } = useContext(MyContext);
  const token = storeToken == 'No Token' ? idToken().storeToken : storeToken

  useEffect(() => {
    const petProfile = async () => {
      await axios.get('http://10.0.0.58:8000/api/user/', {
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
          setPetLiked(res.data.petLikedId);

        })
        .catch((error: any) => {
          console.log(error)
        })
    }
    petProfile()

  }, [token])

  const router = useRouter()

  return (
    <View style={{ minHeight: "100%", padding: 20 }}>
      {
        (petLiked && petLiked.length > 0)
          ? petLiked?.map((item: any) => (

              <TouchableOpacity onPress={() => router.push({pathname: '/(components)/(explore)/PetProfile', params: { _id: item._id, ageInWeeks: item.ageInWeeks, petBehaviour: item.petBehaviour, breed: item.breed, gender: item.gender, petInfo: item.petInfo, location: item.location, pic: item.pic as any, name: item.name, likes: item.likes as any, typeOfPet: item.typeOfPet } })} style={{ padding: 10, marginVertical: 15, borderColor: "#cccccc", borderWidth: 1, borderRadius: 10, shadowColor: "#cccccc", shadowOffset: { width: 5, height: 5 }, shadowRadius: 5, shadowOpacity: 0.8, gap: 10, }}>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, }}>
                  <View style={{ display: "flex", justifyContent: "space-between" }}>
                    <Text style={{ fontSize: 22, fontWeight: "bold" }}>{item.name}</Text>
                    <Text style={{ color: "gray", fontWeight: "600", fontSize: 14 }}>{item.breed}</Text>
                    <View style={{ display: "flex", flexDirection: "row", gap: 10, alignItems: "center" }}>
                      <Text style={{ color: "gray", fontWeight: "600", fontSize: 14 }}>{item.gender}</Text>
                      <Icon name='circle' color='gray' size={5}></Icon>
                      <Text style={{ color: "gray", fontWeight: "600", fontSize: 14 }}>{Number(item.ageInWeeks)} weeks old</Text>
                    </View>
                  </View>
                  <Image source={{ uri: item.pic }} style={{ width: 80, height: 80, borderRadius: 10 }} />
                </View>
              </TouchableOpacity>

          ))
          : <View style={{ display: "flex", alignItems: "center", width: "100%", gap: 50, paddingVertical: 40, }}>
            <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold", textTransform: 'uppercase', color: "red" }}>You are yet to add a Pet to favourites.</Text>
            <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold", textTransform: 'uppercase', color: "red" }}>Please choose a pet.</Text>
          </View>
      }
    </View>
  )
}

export default Favourites

