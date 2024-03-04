import { View, Text, useThemeColor } from '@/components/Themed'
import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Dimensions, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native'

function Icon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  size: number
}) {
  return <FontAwesome style={{ marginBottom: -3, }} {...props} />;
}


const PetAdopt = () => {
  const { name, breed, gender, age, pic } = useLocalSearchParams()

  const [dateTime, setDateTime] = useState<string>('')
  const [fullName, setFullName] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [address, setAddress] = useState<string>('')

  const router = useRouter()

  return (
    <View style={{ minHeight: "100%", paddingHorizontal: 20 }}>

      <ScrollView style={{ backgroundColor: useThemeColor({ light: "white", dark: "black" }, 'background') }}>

        <View style={{ display: "flex", flexDirection: "row", padding: 10, justifyContent: "space-between", marginVertical: 10, borderColor: "#cccccc", borderWidth: 1, borderRadius: 10, shadowColor: "#cccccc", shadowOffset: { width: 5, height: 5 }, shadowRadius: 10, shadowOpacity: 0.8 }}>
          <View style={{ display: "flex", justifyContent: "space-between", paddingVertical: 5 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>{name}</Text>
            <Text style={{ color: "gray", fontWeight: "600", fontSize: 15 }}>{breed}</Text>
            <View style={{ display: "flex", flexDirection: "row", gap: 10, alignItems: "center" }}>
              <Text style={{ color: "gray", fontWeight: "600", fontSize: 15 }}>{gender}</Text>
              <Icon name='circle' color='gray' size={5}></Icon>
              <Text style={{ color: "gray", fontWeight: "600", fontSize: 15 }}>{age}</Text>
            </View>
          </View>
          <Image source={require('../../../assets/images/dog2.jpg')} style={{ width: 100, height: 100, borderRadius: 10 }} />
        </View>

        <View style={{ borderBottomColor: "#cccccc", borderBottomWidth: 0.2, marginVertical: 25 }} />


        <View style={{ display: "flex", gap: 20 }}>

          <View style={{ display: "flex", flexDirection: "row", borderWidth: 1, borderColor: "#cccccc", marginHorizontal: 20, shadowColor: "#cccccc", shadowOffset: { width: 5, height: 5 }, shadowRadius: 10, shadowOpacity: 0.5 }}>
            <View style={{ paddingHorizontal: 20, paddingVertical: 15, borderRightWidth: 1, borderRightColor: "#cccccc" }}>
              <Icon name='calendar' color='gray' size={20}></Icon>
            </View>
            <TextInput
              value={dateTime}
              onChangeText={setDateTime}
              placeholder="29 Aug, 11:00am"
              style={{ paddingHorizontal: 20, width: "100%", color: "gray" }}
            />
          </View>

          <View style={{ display: "flex", flexDirection: "row", borderWidth: 1, borderColor: "#cccccc", marginHorizontal: 20, shadowColor: "#cccccc", shadowOffset: { width: 5, height: 5 }, shadowRadius: 10, shadowOpacity: 0.5 }}>
            <View style={{ paddingHorizontal: 20, paddingVertical: 15, borderRightWidth: 1, borderRightColor: "#cccccc" }}>
              <Icon name='user' color='gray' size={20}></Icon>
            </View>
            <TextInput
              value={fullName}
              onChangeText={setFullName}
              placeholder="John Cena"
              style={{ paddingHorizontal: 20, width: "100%", color: "gray" }}
            />
          </View>

          <View style={{ display: "flex", flexDirection: "row", borderWidth: 1, borderColor: "#cccccc", marginHorizontal: 20, shadowColor: "#cccccc", shadowOffset: { width: 5, height: 5 }, shadowRadius: 10, shadowOpacity: 0.5 }}>
            <View style={{ paddingHorizontal: 20, paddingVertical: 15, borderRightWidth: 1, borderRightColor: "#cccccc" }}>
              <Icon name='phone' color='gray' size={20}></Icon>
            </View>
            <TextInput
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="987543210"
              style={{ paddingHorizontal: 20, width: "100%", color: "gray" }}
            />
          </View>

          <View style={{ display: "flex", flexDirection: "row", borderWidth: 1, borderColor: "#cccccc", marginHorizontal: 20, shadowColor: "#cccccc", shadowOffset: { width: 5, height: 5 }, shadowRadius: 10, shadowOpacity: 0.5 }}>
            <View style={{ paddingHorizontal: 20, paddingVertical: 15, borderRightWidth: 1, borderRightColor: "#cccccc" }}>
              <Icon name='location-arrow' color='gray' size={20}></Icon>
            </View>
            <TextInput
              value={address}
              onChangeText={setAddress}
              placeholder="Hinjewadi, Pune, Maharahtra, INDIA"
              style={{ paddingHorizontal: 20, width: "100%", color: "gray" }}
            />
          </View>
          
          <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", marginTop: 20 }} onPress={() => router.replace('/')} >
            <Text style={{ backgroundColor: "#fd6100", color: "white", paddingVertical: 8, paddingHorizontal: 20, borderRadius: 10, fontSize: 18, fontWeight: "600", textAlign: "center", width: Dimensions.get('window').width * 0.8 }}>CONFIRM</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>

      <View style={{marginVertical: 20}}>
        <Text style={{ color: "gray", textAlign: "center" }}>By scheduling a visit, you agree to our <span style={{ fontWeight: "bold" }}>Terms and Conditions.</span></Text>
      </View>

    </View>

  )
}

export default PetAdopt

// import { View, Text, useThemeColor } from '@/components/Themed'
// import { FontAwesome } from '@expo/vector-icons';
// import { useLocalSearchParams } from 'expo-router'
// import React, { useState } from 'react'
// import { Dimensions, Image, ScrollView, TextInput } from 'react-native'

// function Icon(props: {
//   name: React.ComponentProps<typeof FontAwesome>['name'];
//   color: string;
//   size: number
// }) {
//   return <FontAwesome style={{ marginBottom: -3, }} {...props} />;
// }


// const PetAdopt = () => {
//   const { name, breed, gender, age, pic } = useLocalSearchParams()

//   const [dateTime, setDateTime] = useState<string>('')
//   const [fullName, setFullName] = useState<string>('')
//   const [phoneNumber, setPhoneNumber] = useState<string>('')
//   const [address, setAddress] = useState<string>('')


//   return (
//     <ScrollView style={{ minHeight: "100%", paddingHorizontal: 20, backgroundColor: useThemeColor({ light: "white", dark: "black" }, 'background') }}>

//       <View style={{ display: "flex", flexDirection: "row", padding: 10, justifyContent: "space-between", marginVertical: 10, borderColor: "#cccccc", borderWidth: 1, borderRadius: 10, shadowColor:"#cccccc", shadowOffset: {width:5, height:5}, shadowRadius: 10, shadowOpacity: 0.8 }}>
//         <View style={{ display: "flex", justifyContent: "space-between", paddingVertical: 5 }}>
//           <Text style={{ fontSize: 24, fontWeight: "bold" }}>{name}</Text>
//           <Text style={{ color: "gray", fontWeight: "600", fontSize: 15 }}>{breed}</Text>
//           <View style={{ display: "flex", flexDirection: "row", gap: 10, alignItems: "center" }}>
//             <Text style={{ color: "gray", fontWeight: "600", fontSize: 15 }}>{gender}</Text>
//             <Icon name='circle' color='gray' size={5}></Icon>
//             <Text style={{ color: "gray", fontWeight: "600", fontSize: 15 }}>{age}</Text>
//           </View>
//         </View>
//         <Image source={require('../../../assets/images/dog2.jpg')} style={{ width: 100, height: 100, borderRadius: 10 }} />
//       </View>

//       <View style={{ borderBottomColor: "#cccccc", borderBottomWidth: 0.2, marginVertical: 25 }} />


//       <View style={{ display: "flex", gap: 20 }}>

//         <View style={{ display: "flex", flexDirection: "row", borderWidth: 1, borderColor: "#cccccc", marginHorizontal: 20, shadowColor:"#cccccc", shadowOffset: {width:5, height:5}, shadowRadius: 10, shadowOpacity: 0.8 }}>
//           <View style={{ paddingHorizontal: 20, paddingVertical: 15, borderRightWidth: 1, borderRightColor: "#cccccc" }}>
//             <Icon name='calendar' color='gray' size={20}></Icon>
//           </View>
//           <TextInput
//             value={dateTime}
//             onChangeText={setDateTime}
//             placeholder="29 Aug, 11:00am"
//             style={{ paddingHorizontal: 20, width: "100%", color: "gray" }}
//           />
//         </View>

//         <View style={{ display: "flex", flexDirection: "row", borderWidth: 1, borderColor: "#cccccc", marginHorizontal: 20, shadowColor:"#cccccc", shadowOffset: {width:5, height:5}, shadowRadius: 10, shadowOpacity: 0.8 }}>
//           <View style={{ paddingHorizontal: 20, paddingVertical: 15, borderRightWidth: 1, borderRightColor: "#cccccc" }}>
//             <Icon name='user' color='gray' size={20}></Icon>
//           </View>
//           <TextInput
//             value={fullName}
//             onChangeText={setFullName}
//             placeholder="John Cena"
//             style={{ paddingHorizontal: 20, width: "100%", color: "gray" }}
//           />
//         </View>

//         <View style={{ display: "flex", flexDirection: "row", borderWidth: 1, borderColor: "#cccccc", marginHorizontal: 20, shadowColor:"#cccccc", shadowOffset: {width:5, height:5}, shadowRadius: 10, shadowOpacity: 0.8 }}>
//           <View style={{ paddingHorizontal: 20, paddingVertical: 15, borderRightWidth: 1, borderRightColor: "#cccccc" }}>
//             <Icon name='phone' color='gray' size={20}></Icon>
//           </View>
//           <TextInput
//             value={phoneNumber}
//             onChangeText={setPhoneNumber}
//             placeholder="987543210"
//             style={{ paddingHorizontal: 20, width: "100%", color: "gray" }}
//           />
//         </View>

//         <View style={{ display: "flex", flexDirection: "row", borderWidth: 1, borderColor: "#cccccc", marginHorizontal: 20, shadowColor:"#cccccc", shadowOffset: {width:5, height:5}, shadowRadius: 10, shadowOpacity: 0.8 }}>
//           <View style={{ paddingHorizontal: 20, paddingVertical: 15, borderRightWidth: 1, borderRightColor: "#cccccc" }}>
//             <Icon name='location-arrow' color='gray' size={20}></Icon>
//           </View>
//           <TextInput
//             value={address}
//             onChangeText={setAddress}
//             placeholder="Hinjewadi, Pune, Maharahtra, INDIA"
//             style={{ paddingHorizontal: 20, width: "100%", color: "gray" }}
//           />
//         </View>

//           <View style={{ justifyContent: "center", alignItems: "center", marginTop: 15}} >
//             <Text style={{ backgroundColor: "#fd6100", color: "white", paddingVertical: 8, paddingHorizontal: 20, borderRadius: 10, fontSize: 18, fontWeight: "600", textAlign: "center", width: Dimensions.get('window').width * 0.8 }}>CONFIRM</Text>
//           </View>


//       </View>

//       <View style={{}}>
//         <Text style={{color: "gray", textAlign:"center"}}>By scheduling a visit, you agree to our <span style={{fontWeight:"bold"}}>Terms and Conditions.</span></Text>
//       </View>

//     </ScrollView>
//   )
// }

// export default PetAdopt