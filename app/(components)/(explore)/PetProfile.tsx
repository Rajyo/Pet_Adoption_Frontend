import { Text, View, useThemeColor } from '@/components/Themed'
import idToken from '@/components/getIdToken'
import { MyContext } from '@/providers/storageProvider'
import { FontAwesome } from '@expo/vector-icons'
import axios from 'axios'
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router'
import React, { useContext, useEffect, useState } from 'react'
import { Dimensions, GestureResponderEvent, Image, ImageSourcePropType, ScrollView, TouchableOpacity, useColorScheme } from 'react-native'

type PetProfileType = {
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
    likes: string[] | null
}

function Icon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
    size: number
}) {
    return <FontAwesome style={{ marginBottom: -3, }} {...props} />;
}


const PetProfile = () => {
    const { _id, pic, name, location, breed, gender, ageInWeeks, petInfo, petBehaviour, likes, typeOfPet }: any = useLocalSearchParams()
    var result = petInfo.split(',')
    // console.log(likes);
    const [like, setLike] = useState(likes)
    const { storeToken, storeId } = useContext(MyContext);
    const token = storeToken == 'No Token' ? idToken().storeToken : storeToken


    useEffect(() => {
        // console.log("like", like)
    }, [like])

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
                // console.log(res.data.likes);
                res.data.likes.length > 0
                    ? res.data.likes.map((item: string) => {
                        item == likes
                            ? setLike(likes)
                            : setLike("no like")
                    })
                    : setLike("no like")
                // setDataa(res.data)
            })
            .catch((error: any) => {
                console.log(error)
            })
    }

    return (
        <View style={{ minHeight: "100%" }}>
            {/* <Stack.Screen options={{ title: "", headerTransparent: true }} /> */}

            <ScrollView style={{ height: Dimensions.get('window').height * 0.915, backgroundColor: useThemeColor({ light: "white", dark: "black" }, 'background') }}>
                <Image source={{ uri: pic }} style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height * 0.3, opacity: 0.9, objectFit: "cover", position: "relative" }} />

                <View style={{ paddingHorizontal: 20 }}>
                    <View style={{ display: "flex", flexDirection: "row", gap: 20, marginVertical: 15 }}>
                        <Icon name='location-arrow' color='gray' size={20}></Icon>
                        <Text style={{ fontSize: 15 }}>{location}</Text>
                        <TouchableOpacity style={{ position: "absolute", right: 5, top: -50 }} onPress={(e) => handlePetLiking(e, _id)} >
                            {
                                like != 'no like' ? <Icon color='red' size={22} name='heart' /> : <Icon color='white' size={20} name='heart-o' />
                            }
                        </TouchableOpacity>
                    </View>

                    <View style={{ gap: 10 }}>
                        <Text style={{ fontSize: 22, fontWeight: "bold" }}>{name}</Text>
                        <Text style={{ color: "gray", fontWeight: "bold", fontSize: 15 }}>{breed}</Text>

                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <View style={{ display: "flex", flexDirection: "row", gap: 10, alignItems: "center" }}>
                                <Text style={{ color: "gray", fontWeight: "600", fontSize: 15 }}>{gender}</Text>
                                <Icon name='circle' color='gray' size={5}></Icon>
                                <Text style={{ color: "gray", fontWeight: "600", fontSize: 15 }}>{ageInWeeks} weeks old</Text>
                            </View>

                            <View style={{ display: "flex", flexDirection: "row", gap: 20, }}>
                                <View>
                                    <Icon name='phone' color='black' size={24}></Icon>
                                </View>
                                <View style={{marginTop:-2}}>
                                    <Icon name='comment-o' color='black' size={24}></Icon>
                                </View>
                            </View>
                        </View>

                    </View>

                    <View style={{ borderBottomColor: "#cccccc", borderBottomWidth: 0.2, marginTop: 25 }} />

                    <View style={{ marginTop: 15 }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>{name} Info</Text>
                        <View style={{ display: "flex", flexDirection: "row", gap: 15, flexWrap: "wrap", marginVertical: 20, }}>
                            {
                                result?.map((item: string) => (
                                    <TouchableOpacity key={item} style={{ display: 'flex', flexDirection: "row", backgroundColor: '#cccccc', paddingHorizontal: 5, paddingVertical: 8, gap: 5, borderRadius: 5, alignItems: "center", opacity: 0.8 }}>
                                        <Icon color='gray' size={19} name='check' />
                                        <Text style={{ fontSize: 15 }}>{item}</Text>
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                    </View>

                    <View style={{ borderBottomColor: "#cccccc", borderBottomWidth: 0.2, marginBottom: 15, marginTop: 10 }} />

                    <View style={{ gap: 10, paddingBottom: 25 }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Behaviour</Text>
                        <Text style={{ opacity: 0.6, fontWeight: "500" }}>{petBehaviour}</Text>
                    </View>

                </View>
            </ScrollView>

            <Link href={{ pathname: '/(components)/(explore)/PetAdopt', params: { name, breed, gender, ageInWeeks, pic, _id, typeOfPet } }} >
                <View style={{ height: Dimensions.get('window').height * 0.085, width: Dimensions.get('window').width, justifyContent: "center", alignItems: "center", borderTopColor: "#cccccc", borderTopWidth: 2 }} >
                    <Text style={{ backgroundColor: "#fd6100", color: "white", paddingVertical: 8, paddingHorizontal: 20, borderRadius: 10, fontSize: 18, fontWeight: "600", textAlign: "center", width: Dimensions.get('window').width * 0.8 }}>ADOPT NOW</Text>
                </View>
            </Link>

        </ View>
    )
}

export default PetProfile

// import { Text, View, useThemeColor } from '@/components/Themed'
// import { filterTypeData } from '@/lib/filterTypeData'
// import { FontAwesome } from '@expo/vector-icons'
// import { useLocalSearchParams, useRouter } from 'expo-router'
// import React from 'react'
// import { Dimensions, Image, ImageSourcePropType, ScrollView, TouchableOpacity, useColorScheme } from 'react-native'

// interface PetProfile {
//     id: number
//     pic: ImageSourcePropType | undefined
//     name: string
//     location: string
//     breed: string
//     gender: string
//     age: string
//     info: string[]
//     behaviour: string
// }

// function Icon(props: {
//     name: React.ComponentProps<typeof FontAwesome>['name'];
//     color: string;
//     size: number
// }) {
//     return <FontAwesome style={{ marginBottom: -3, }} {...props} />;
// }


// const PetProfile = () => {
//     const { id, pic, name, location, breed, gender, age, info, behaviour }: any = useLocalSearchParams()

//     const router = useRouter()

//     return (
//         <ScrollView style={{ minHeight: "100%", backgroundColor: useThemeColor({ light: "white", dark: "black" }, 'background') }}>
//             <Image source={require('../../../assets/images/dog2.jpg')} style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height * 0.3, opacity: 0.9, objectFit: "cover" }} />

//             <View style={{ paddingHorizontal: 20 }}>
//                 <View style={{ display: "flex", flexDirection: "row", gap: 20, marginVertical: 15 }}>
//                     <Icon name='location-arrow' color='gray' size={20}></Icon>
//                     <Text style={{ fontSize: 15 }}>{location}</Text>
//                 </View>

//                 <View style={{ gap: 10 }}>
//                     <Text style={{ fontSize: 22, fontWeight: "bold" }}>{name}</Text>
//                     <Text style={{ color: "gray", fontWeight: "bold", fontSize: 15 }}>{breed}</Text>

//                     <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
//                         <View style={{ display: "flex", flexDirection: "row", gap: 10, alignItems: "center" }}>
//                             <Text style={{ color: "gray", fontWeight: "600", fontSize: 15 }}>{gender}</Text>
//                             <Icon name='circle' color='gray' size={5}></Icon>
//                             <Text style={{ color: "gray", fontWeight: "600", fontSize: 15 }}>{age}</Text>
//                         </View>

//                         <View style={{ display: "flex", flexDirection: "row", gap: 15, alignItems: "baseline" }}>
//                             <Icon name='phone' color='black' size={24}></Icon>
//                             <Icon name='comment-o' color='black' size={24}></Icon>
//                         </View>
//                     </View>

//                 </View>

//                 <View style={{ borderBottomColor: "#cccccc", borderBottomWidth: 0.2, marginTop: 25 }} />

//                 <View style={{ marginTop: 15 }}>
//                     <Text style={{ fontSize: 18, fontWeight: "bold" }}>{name} Info</Text>
//                     <View style={{ display: "flex", flexDirection: "row", gap: 15, flexWrap: "wrap", marginVertical: 20, }}>

//                         <TouchableOpacity style={{ display: 'flex', flexDirection: "row", backgroundColor: '#cccccc', paddingHorizontal: 5, paddingVertical: 8, gap: 5, borderRadius: 5, alignItems: "center", opacity: 0.8 }}>
//                             <Icon color='gray' size={19} name='check' />
//                             <Text style={{ fontSize: 15 }}>Neutered</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity style={{ display: 'flex', flexDirection: "row", backgroundColor: '#cccccc', paddingHorizontal: 5, paddingVertical: 8, gap: 5, borderRadius: 5, alignItems: "center", opacity: 0.8 }}>
//                             <Icon color='gray' size={19} name='check' />
//                             <Text style={{ fontSize: 15 }}>Good with kids</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity style={{ display: 'flex', flexDirection: "row", backgroundColor: '#cccccc', paddingHorizontal: 5, paddingVertical: 8, gap: 5, borderRadius: 5, alignItems: "center", opacity: 0.8 }}>
//                             <Icon color='gray' size={19} name='check' />
//                             <Text style={{ fontSize: 15 }}>House trained</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity style={{ display: 'flex', flexDirection: "row", backgroundColor: '#cccccc', paddingHorizontal: 5, paddingVertical: 8, gap: 5, borderRadius: 5, alignItems: "center", opacity: 0.8 }}>
//                             <Icon color='gray' size={19} name='check' />
//                             <Text style={{ fontSize: 15 }}>Good with dogs</Text>
//                         </TouchableOpacity>

//                     </View>
//                 </View>

//                 <View style={{ borderBottomColor: "#cccccc", borderBottomWidth: 0.2, marginBottom: 15, marginTop: 10 }} />

//                 <View style={{ gap: 10 }}>
//                     <Text style={{ fontSize: 18, fontWeight: "bold" }}>Behaviour</Text>
//                     <Text style={{ color: "black", opacity: 0.6, fontWeight: "500" }}>{behaviour}</Text>
//                 </View>

//                 <TouchableOpacity style={{ marginVertical: 30, width: Dimensions.get('window').width * 0.9, }} onPress={() => router.push('/')}>
//                     <Text style={{ backgroundColor: "#fd6100", color: "white", paddingVertical: 8, paddingHorizontal: 20, borderRadius: 10, fontSize: 18, fontWeight: "600", textAlign: "center" }}>Next</Text>
//                 </TouchableOpacity>

//             </View>
//         </ScrollView>
//     )
// }

// export default PetProfile