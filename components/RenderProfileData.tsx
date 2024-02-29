import AsyncStorage from "@react-native-async-storage/async-storage"
import { Link, useRouter } from "expo-router"
import { Pressable, useColorScheme } from "react-native"
import { Text, View } from "./Themed"
import Colors from "@/constants/Colors"
import { FontAwesome } from "@expo/vector-icons"

function Icon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
    size: number
}) {
    return <FontAwesome style={{ marginBottom: -3, }} {...props} />;
}

type renderProfileDataProps = {
    data: {
        id: number
        title: string
        icon: any
        link?: string
    }
}

const RenderProfileData = ({ data }: renderProfileDataProps) => {
    const colorScheme = useColorScheme()
    const router = useRouter()

    const logout = async () => {
        if (data.link == "logout") {
            await AsyncStorage.clear();
            router.replace('/(auth)/sign-in')
        }else{
            router.navigate(`/${data.link}`)
        }
    }

    return (
        <>
            <Pressable onPress={logout}>
                <View style={{ display: "flex", flexDirection: "row", gap: 20 }}>
                    <View style={{ width: 40, height: 30, justifyContent: "center", alignItems: "center" }}>
                        <Icon name={data.icon} color={Colors[colorScheme ?? 'light'].icon} size={25} />
                    </View>
                    <Text style={{ marginTop: 3, color: "gray", fontSize: 17, fontWeight: "500" }}>{data.title}</Text>
                </View>
            </Pressable>
        </>
    )
}

export default RenderProfileData