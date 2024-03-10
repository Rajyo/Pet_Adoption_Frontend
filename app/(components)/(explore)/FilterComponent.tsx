import { Icon } from '@/app/(main)/explore'
import { View, Text, useThemeColor } from '@/components/Themed'
import { filterTypeData, nonBreedfilterTypeData } from '@/lib/filterTypeData'
import { finalFilteredData } from '@/lib/finalFilteredData'
import { FontAwesome } from '@expo/vector-icons'
import { Link } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Dimensions, TouchableOpacity } from 'react-native'


const FilterComponent = () => {
    const [filterSelect, setFilterSelect] = useState<string>('Pet Type')
    const [filterOptions, setFilterOptions] = useState<string[]>([])

    const [finalOption, setFinalOption] = useState<string>('All')
    const [finalFilter, setFinalFilter] = useState<filterType | undefined>()

    const [petType, setPetType] = useState<string | undefined>('All')
    const [gender, setGender] = useState<string | undefined>('')
    const [age, setAge] = useState<string | undefined>('')
    const [breed, setBreed] = useState<string | undefined>('')

    useEffect(() => {
        petType == 'All' && setBreed('')
    }, [petType])

    useEffect(() => {
        finalFilteredData.map((item) => {
            if (item.filterType == filterSelect) {
                setFilterOptions(item.options)
            }
        })
    }, [filterSelect])


    useEffect(() => {
        if (finalFilter?.filterSelect == 'Pet Type') {
            setPetType(finalFilter.item)
        }
        if (finalFilter?.filterSelect == 'Gender') {
            setGender(finalFilter.item)
        }
        if (finalFilter?.filterSelect == 'Age') {
            setAge(finalFilter.item)
        }
        if (finalFilter?.filterSelect == 'Breed') {
            setBreed(finalFilter.item)
        }
    }, [finalOption])

    const color1 = useThemeColor({ light: 'white', dark: 'black' }, 'text')
    const color2 = useThemeColor({ light: '#cccccc', dark: 'rgb(50,50,50)' }, 'text')

    return (
        <View style={{ minHeight: "100%", display: "flex", flexDirection: "row", position: "relative" }}>

            <View style={{ width: Dimensions.get('window').width * 0.35, height: Dimensions.get('window').height * 0.9, backgroundColor: color2 }}>
                {petType != 'All' ?
                    filterTypeData.map((item) => (
                        <TouchableOpacity key={item.id} style={{ paddingVertical: 15, alignItems: "center", backgroundColor: filterSelect == item.filterName ? color1 : color2 }} onPress={() => setFilterSelect(item.filterName)}>
                            <Text style={{ opacity: 0.7, fontWeight: "500", }}>{item.filterName}</Text>
                        </TouchableOpacity>
                    ))
                    :
                    nonBreedfilterTypeData.map((item) => (
                        <TouchableOpacity key={item.id} style={{ paddingVertical: 15, alignItems: "center", backgroundColor: filterSelect == item.filterName ? color1 : color2 }} onPress={() => setFilterSelect(item.filterName)}>
                            <Text style={{ opacity: 0.7, fontWeight: "500", }}>{item.filterName}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>

            <View style={{ width: Dimensions.get('window').width * 0.65, height: Dimensions.get('window').height * 0.9, borderLeftColor: "#cccccc", borderLeftWidth: 1 }}>
                {
                    filterOptions.map((item: string) => (
                        <TouchableOpacity key={item} style={{ paddingVertical: 15, paddingHorizontal: 30, borderBottomWidth: 1, borderBlockColor: "#cccccc", display: "flex", flexDirection: "row", justifyContent: "space-between" }} onPress={() => { setFinalOption(item); setFinalFilter({ filterSelect, item }) }} >
                            <Text style={{ opacity: 0.7, fontWeight: "500" }}>{item}</Text>
                            <Icon color='gray' name={(item == finalOption || item == petType || item == gender || item == age || item == breed) ? "dot-circle-o" : 'circle-thin'} size={16} />
                        </TouchableOpacity>
                    ))
                }
            </View>


            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", width: Dimensions.get('window').width, height: Dimensions.get('window').height * 0.063, position: "absolute", bottom: 0, borderTopWidth: 1, borderColor: "gray", justifyContent: "space-around", zIndex:10 }}>

                <Link href={'/(main)/explore'}>
                    <Text style={{ fontWeight: "bold", fontSize: 15, width: Dimensions.get('window').width * 0.5, height: Dimensions.get('window').height * 0.063, display: "flex", flex: 0.5, justifyContent: "center", alignItems: "center", borderRightColor: "gray", borderRightWidth: 1, }}>CANCEL</Text>
                </Link>

                <Link href={{ pathname: '/(components)/(explore)/FilterResult', params: { petType: petType ?? "", gender: gender ?? "", age: age ?? "", breed: breed ?? "" } }}>
                    {/* <Link href={{ pathname: '/(components)/(explore)/FilterResult', params: {petType: petType!, gender: gender!, age: age!, breed: breed! } }}> */}
                    {/* <Link href={{ pathname: '/(components)/(explore)/FilterResult', params: {petType: petType || '', gender: gender || '', age: age || '', breed: breed || '' } }}> */}
                    {/* <Link href={{ pathname: '/(components)/(explore)/FilterResult', params: {petType: petType as string, gender: gender as string, age: age as string, breed: breed as string } }}> */}
                    <Text style={{ fontWeight: "bold", fontSize: 15, width: Dimensions.get('window').width * 0.5, height: Dimensions.get('window').height * 0.063, display: "flex", flex: 0.5, justifyContent: "center", alignItems: "center", color: "#fd6100" }}>APPLY</Text>
                </Link>

            </View>

        </View>
    )
}

export default FilterComponent