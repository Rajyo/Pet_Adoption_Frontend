import { Text } from '@/components/Themed'
import React from 'react'
import { Image, ImageSourcePropType, View } from 'react-native';



type renderNewlyWelcomedProps = {
    data: {
        id: number
        name: string
        week: string
        breed: string
        pic: ImageSourcePropType | undefined
    }
}

const RenderNewlyWelcomed = ({ data }: renderNewlyWelcomedProps) => {

    return (
        <View style={{ marginVertical: 20, marginRight: 20, display: "flex", width: 135, height: 125, flexDirection: "row", borderRadius: 5, justifyContent: "space-between", shadowColor: 'gray', elevation: 10, shadowOffset: { width: 5, height: 5 }, shadowOpacity: 0.8, shadowRadius: 5, borderColor: "gray", borderWidth: 1, position: "relative" }}>

            <Image source={data.pic} style={{ width: 135, height: 125, opacity: 0.9, objectFit:"cover" }} />
            <View style={{ position: "absolute", zIndex: 50, paddingHorizontal:2, }}>
                <Text style={{ top: 80, left: 4, color: "white", fontWeight: "bold", fontSize: 15 }}>{data.name}</Text>
                <Text style={{ top: 62, left: 108, color: "white", fontSize: 13, fontWeight: "bold" }}>{data.week}</Text>
                <Text style={{ top: 65, left: 4,color: "white", fontSize: 12, fontWeight: "bold", marginTop: 2 }}>{data.breed}</Text>
            </View>

        </View>
    )
}

export default RenderNewlyWelcomed