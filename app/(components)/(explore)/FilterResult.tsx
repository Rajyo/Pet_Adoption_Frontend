import { View, Text, useThemeColor } from '@/components/Themed'
import idToken from '@/components/getIdToken'
import { MyContext } from '@/providers/storageProvider'
import { FontAwesome } from '@expo/vector-icons'
import axios from 'axios'
import { Link, Stack, useLocalSearchParams } from 'expo-router'
import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, Image, ImageSourcePropType, ScrollView, TouchableOpacity } from 'react-native'
import RenderNewlyWelcomed from '../(home)/RenderNewlyWelcomed'

type finalResultType = {
    petType: string,
    gender: string,
    age: string,
    breed: string
}

type finalDataType = {
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

function Icon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
    size: number
}) {
    return <FontAwesome style={{ marginBottom: -3, }} {...props} />;
}


var filteredArray: finalDataType[];

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

    const { storeToken, storeId } = useContext(MyContext);
    const [data, setData] = useState<finalDataType[]>([])
    const [loading, setLoading] = useState<boolean>(false)

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

    var finalFilteedItems = new Set<finalDataType>()
    const filterFunc = () => {

        const petFilteredItems = new Set<finalDataType>()
        petType.length > 0 && data.map((item: finalDataType) => {
            if (item.typeOfPet == petType) {
                petFilteredItems.add(item)
                finalFilteedItems.add(item)
            }
        })
        petFilteredItems.size == 0 && data.map((item: finalDataType) => {
            petFilteredItems.add(item)
            finalFilteedItems.add(item)
        })


        const genderFilteredItems = new Set<finalDataType>()
        gender.length > 0 && data.map((item: finalDataType) => {
            if (item.gender == gender) {
                genderFilteredItems.add(item)
            }
        })
        //genderFilteredItems.size > 0 && (finalFilteedItems = finalFilteedItems.intersection(genderFilteredItems))
        genderFilteredItems.size > 0 && (finalFilteedItems = new Set([...finalFilteedItems].filter(x => genderFilteredItems.has(x))))


        const ageFilteredItems = new Set<finalDataType>()
        age.length > 0 && data.map((item: finalDataType) => {
            if (item.ageInWeeks == Number(age[0])) {
                ageFilteredItems.add(item)
            }
        })
        age.length > 0 && ageFilteredItems.size == 0 && (finalFilteedItems = new Set([...finalFilteedItems].filter(x => ageFilteredItems.has(x))))
        ageFilteredItems.size > 0 && (finalFilteedItems = new Set([...finalFilteedItems].filter(x => ageFilteredItems.has(x))))


        const breedFilteredItems = new Set<finalDataType>()
        breed.length > 0 && data.map((item: finalDataType) => {
            if (item.breed == breed) {
                breedFilteredItems.add(item)
            }
        })
        breedFilteredItems.size > 0 && (finalFilteedItems = new Set([...finalFilteedItems].filter(x => breedFilteredItems.has(x))))


        filteredArray = Array.from(finalFilteedItems)

    }

    data && filterFunc()
    // console.log(filteredArray);


    return (
        <ScrollView contentContainerStyle={{ width: Dimensions.get('window').width * 0.9, alignSelf: "center" }} style={{ minHeight: "100%", backgroundColor: useThemeColor({ light: "white", dark: "black" }, 'background') }}>

            <Stack.Screen options={{ title: `Search Results (${filteredArray.length})`, headerTitleStyle: { fontWeight: "600", fontSize: 19 }, headerTitleAlign: "center" }} />

            <View style={{ display: "flex", flexDirection: "row", gap: 20, flexWrap: "wrap", marginVertical: 20, }}>
                {
                    filterData.map((filter) => {
                        return filter.filterType.length > 0 &&
                            <TouchableOpacity key={filter.id} style={{ display: 'flex', flexDirection: "row", backgroundColor: 'rgb(235, 235, 235)', paddingHorizontal: 10, paddingVertical: 8, gap: 15, borderRadius: 5, alignItems: "center" }}>
                                <Text style={{ fontSize: 16, fontWeight: "600", opacity: 0.8, color:"black" }}>{filter.filterType}</Text>
                                <Icon color='gray' size={16} name='check' />
                            </TouchableOpacity>

                    })
                }
            </View>

            {
                filteredArray?.length == 0
                    ? <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 35, marginVertical: 30 }}>
                        {
                            <View style={{ display: "flex", alignItems: "center", width: "100%", gap: 50, paddingVertical: 40, }}>
                                <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold", textTransform: 'uppercase', color: "red" }}>There are no matches for your search criteria.</Text>
                                <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold", textTransform: 'uppercase', color: "red" }}>Please consider adjusting your filters.</Text>
                            </View>
                        }
                    </View>
                    : <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around", marginVertical: 20, gap: 30 }} >
                        {
                            filteredArray?.map((data: finalDataType) => (
                                <RenderNewlyWelcomed key={data._id} data={data} />
                            ))
                        }
                    </View>
            }

        </ScrollView>
    )
}

export default FilterResult