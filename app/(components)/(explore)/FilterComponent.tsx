import { View, Text, useThemeColor } from '@/components/Themed'
import { filterTypeData } from '@/lib/filterTypeData'
import { finalFilteredData } from '@/lib/finalFilteredData'
import { FontAwesome } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { Dimensions, TouchableOpacity } from 'react-native'


function Icon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
    size: number
}) {
    return <FontAwesome style={{ marginBottom: -3, }} {...props} />;
}

const FilterComponent = () => {
    const [filterSelect, setFilterSelect] = useState<string>('Pet Type')
    const [filterOptions, setFilterOptions] = useState<any>([])
    const [finalOption, setFinalOption] = useState<string>('')


    useEffect(() => {
        finalFilteredData.map((item) => {
            if (item.filterType == filterSelect) {
                setFilterOptions(item.options)
            }
        })

    }, [filterSelect])
    // console.log(filterOptions);


    return (
        <View style={{ minHeight: "100%", display: "flex", flexDirection: "row", position: "relative" }}>

            <View style={{ width: Dimensions.get('window').width * 0.35, height: Dimensions.get('window').height * 0.85, backgroundColor: "#cccccc" }}>
                {
                    filterTypeData.map((item) => (
                        <TouchableOpacity key={item.id} style={{ paddingVertical: 15, alignItems: "center", backgroundColor: filterSelect == item.filterName ? "white" : "#cccccc" }} onPress={() => setFilterSelect(item.filterName)}>
                            <Text style={{ opacity: 0.7, fontWeight: "500" }}>{item.filterName}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>

            <View style={{ width: Dimensions.get('window').width * 0.65, height: Dimensions.get('window').height * 0.85, borderLeftColor: "#cccccc", borderLeftWidth: 1 }}>
                {
                    filterOptions.map((item: string) => (
                        <TouchableOpacity key={item} style={{ paddingVertical: 15, paddingHorizontal: 30, borderBottomWidth: 1, borderBlockColor: "#cccccc", display: "flex", flexDirection: "row", justifyContent: "space-between" }} onPress={() => setFinalOption(item)} >
                            <Text style={{ opacity: 0.7, fontWeight: "500" }}>{item}</Text>
                            <Icon color='gray' name={item == finalOption ? "dot-circle-o" : 'circle-thin'} size={16} />
                        </TouchableOpacity>
                    ))
                }
            </View>


            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", width: Dimensions.get('window').width, height: Dimensions.get('window').height * 0.063, position: "absolute", bottom: 0, borderTopWidth: 1, borderColor: "gray" }}>
                <Text style={{ fontWeight: "bold", fontSize: 15, height: Dimensions.get('window').height * 0.063, display: "flex", flex: 0.5, justifyContent: "center", alignItems: "center", borderRightColor: "gray", borderRightWidth: 1 }}>CANCEL</Text>

                <Text style={{ fontWeight: "bold", fontSize: 15, height: Dimensions.get('window').height * 0.063, display: "flex", flex: 0.5, justifyContent: "center", alignItems: "center", borderLeftColor: "gray", borderLeftWidth: 1, color: "#fd6100" }}>APPLY</Text>
            </View>

            {/* <View style={{ display: "flex", flexDirection: "row", alignItems: "center", width: Dimensions.get('window').width, height: Dimensions.get('window').height * 0.063, position: "absolute", bottom: 0, borderTopWidth: 1, borderColor: "gray" }}>
                <Text style={{ fontWeight: "bold", fontSize: 15, width: Dimensions.get('window').width * 0.49, textAlign: "center", }}>CANCEL</Text>
                <Text style={{ backgroundColor: "gray", height: Dimensions.get('window').height * 0.063, color: "gray" }}>.</Text>
                <Text style={{ fontWeight: "bold", fontSize: 15, width: Dimensions.get('window').width * 0.49, textAlign: "center", }}>APPLY</Text>
            </View> */}

        </View>
    )
}

export default FilterComponent