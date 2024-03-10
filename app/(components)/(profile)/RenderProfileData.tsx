import AsyncStorage from "@react-native-async-storage/async-storage"
import { Link, useRouter } from "expo-router"
import { Pressable, useColorScheme } from "react-native"
import { Text, View } from "../../../components/Themed"
import { FontAwesome } from "@expo/vector-icons"
import { Icon } from "@/app/(main)/explore"



const RenderProfileData = ({ data }: renderProfileDataProps) => {
    const router = useRouter()

    const logout = async () => {
        if (data.link == "logout") {
            await AsyncStorage.clear();
            router.replace('/(auth)/sign-in')
        } else {
            router.navigate(`/${data.link}`)
        }
    }

    return (
        <>
            <Pressable onPress={logout}>
                <View style={{ display: "flex", flexDirection: "row", gap: 20, alignItems:"center" }}>
                    <View style={{ width: 40, height: 30, justifyContent: "center", alignItems: "center" }}>
                        <Icon name={data.icon} color="#fdaa48" size={22} />
                    </View>
                    <Text style={{ opacity: 0.7, fontSize: 17, fontWeight: "500"}}>{data.title}</Text>
                </View>
            </Pressable>
        </>
    )
}

export default RenderProfileData