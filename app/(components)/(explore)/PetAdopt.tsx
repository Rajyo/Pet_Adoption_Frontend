import { View, Text, useThemeColor } from '@/components/Themed'
import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Dimensions, Image, ImageSourcePropType, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';


function Icon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  size: number
}) {
  return <FontAwesome style={{ marginBottom: -3, }} {...props} />;
}

type PetAdoptType = {
  ageInWeeks: number
  breed: string
  gender: string
  name: string
  pic: ImageSourcePropType | undefined
}

const PetAdopt = () => {
  const { name, breed, gender, ageInWeeks, pic } = useLocalSearchParams<any>()
  
  const [dateTime, setDateTime] = useState<string>('')
  const [fullName, setFullName] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [address, setAddress] = useState<string>('')

  const router = useRouter()

  const handleConfirm = () => {
    console.log(dateTime, fullName, phoneNumber, address);

    if(fullName == ''){
      Alert.alert("Please enter name")
    }

    if(phoneNumber.length !== 10){
      Alert.alert("Please enter valid Phone Number")
    }

    if(address == ''){
      Alert.alert("Please enter Address")
    }
    //router.replace('/')
  }

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
              <Text style={{ color: "gray", fontWeight: "600", fontSize: 15 }}>{Number(ageInWeeks)} weeks old</Text>
            </View>
          </View>
          <Image source={pic} style={{ width: 100, height: 100, borderRadius: 10 }} />
        </View>

        <View style={{ borderBottomColor: "#cccccc", borderBottomWidth: 0.2, marginVertical: 25 }} />


        <View style={{ display: "flex", gap: 20 }}>

          <View style={{ display: "flex", flexDirection: "row", borderWidth: 1, borderColor: "#cccccc", marginHorizontal: 20, shadowColor: "#cccccc", shadowOffset: { width: 5, height: 5 }, shadowRadius: 10, shadowOpacity: 0.5 }}>
            <View style={{ paddingHorizontal: 20, paddingVertical: 15, borderRightWidth: 1, borderRightColor: "#cccccc" }}>
              <Icon name='calendar' color='gray' size={20}></Icon>
            </View>
            {/* <TextInput
              value={dateTime}
              onChangeText={setDateTime}
              placeholder="29 Aug, 11:00am"
              style={{ paddingHorizontal: 20, width: "100%", color: "gray" }}
            /> */}
            <View style={{display:"flex", flexDirection:"row", paddingHorizontal: 10, gap:10, }}>
                <RNPickerSelect
                  items={[
                  { label: '1', value: '1' },
                  { label: '2', value: '2' },
                  { label: '3', value: '3' },
                  { label: '4', value: '4' },
                  { label: '5', value: '5' },
                  { label: '6', value: '6' },
                  { label: '7', value: '7' },
                  { label: '8', value: '8' },
                  { label: '9', value: '9' },
                  { label: '10', value: '10' },
                  { label: '11', value: '11' },
                  { label: '12', value: '12' },
                  { label: '13', value: '13' },
                  { label: '14', value: '14' },
                  { label: '15', value: '15' },
                  { label: '16', value: '16' },
                  { label: '17', value: '17' },
                  { label: '18', value: '18' },
                  { label: '19', value: '19' },
                  { label: '20', value: '20' },
                  { label: '21', value: '21' },
                  { label: '22', value: '22' },
                  { label: '23', value: '23' },
                  { label: '24', value: '24' },
                  { label: '25', value: '25' },
                  { label: '26', value: '26' },
                  { label: '27', value: '27' },
                  { label: '28', value: '28' },
                  { label: '29', value: '29' },
                  { label: '30', value: '30' },
                  { label: '31', value: '31' },
                  ]}
                  onValueChange={(value) => console.log(value)}
                  placeholder={{ label: 'Select Date', value: '' }}
                  />
                
                <RNPickerSelect
                  items={[
                  { label: 'January', value: 'January' },
                  { label: 'February', value: 'February' },
                  { label: 'March', value: 'March' },
                  { label: 'April', value: 'April' },
                  { label: 'May', value: 'May' },
                  { label: 'June', value: 'June' },
                  { label: 'July', value: 'July' },
                  { label: 'August', value: 'August' },
                  { label: 'September', value: 'September' },
                  { label: 'October', value: 'October' },
                  { label: 'November', value: 'November' },
                  { label: 'December', value: 'December' },
                  ]}
                  onValueChange={(value) => console.log(value)}
                  placeholder={{ label: 'Select Month', value: '' }}
                  />
            </View>
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
              placeholder="Hinjewadi, Pune, Maharahtra"
              style={{ paddingHorizontal: 20, width: "100%", color: "gray" }}
            />
          </View>
          
          <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", marginTop: 20 }} onPress={handleConfirm} >
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
// import { useLocalSearchParams, useRouter } from 'expo-router'
// import React, { useState } from 'react'
// import { Alert, Dimensions, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native'

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

//   const router = useRouter()

//   const handleConfirm = () => {
//     console.log(dateTime, fullName, phoneNumber, address);

//     if(fullName == ''){
//       Alert.alert("Please enter name")
//     }

//     if(phoneNumber.length !== 10){
//       Alert.alert("Please enter valid Phone Number")
//     }

//     if(address == ''){
//       Alert.alert("Please enter Address")
//     }
//     //router.replace('/')
//   }

//   return (
//     <View style={{ minHeight: "100%", paddingHorizontal: 20 }}>

//       <ScrollView style={{ backgroundColor: useThemeColor({ light: "white", dark: "black" }, 'background') }}>

//         <View style={{ display: "flex", flexDirection: "row", padding: 10, justifyContent: "space-between", marginVertical: 10, borderColor: "#cccccc", borderWidth: 1, borderRadius: 10, shadowColor: "#cccccc", shadowOffset: { width: 5, height: 5 }, shadowRadius: 10, shadowOpacity: 0.8 }}>
//           <View style={{ display: "flex", justifyContent: "space-between", paddingVertical: 5 }}>
//             <Text style={{ fontSize: 24, fontWeight: "bold" }}>{name}</Text>
//             <Text style={{ color: "gray", fontWeight: "600", fontSize: 15 }}>{breed}</Text>
//             <View style={{ display: "flex", flexDirection: "row", gap: 10, alignItems: "center" }}>
//               <Text style={{ color: "gray", fontWeight: "600", fontSize: 15 }}>{gender}</Text>
//               <Icon name='circle' color='gray' size={5}></Icon>
//               <Text style={{ color: "gray", fontWeight: "600", fontSize: 15 }}>{age}</Text>
//             </View>
//           </View>
//           <Image source={require('../../../assets/images/dog2.jpg')} style={{ width: 100, height: 100, borderRadius: 10 }} />
//         </View>

//         <View style={{ borderBottomColor: "#cccccc", borderBottomWidth: 0.2, marginVertical: 25 }} />


//         <View style={{ display: "flex", gap: 20 }}>

//           <View style={{ display: "flex", flexDirection: "row", borderWidth: 1, borderColor: "#cccccc", marginHorizontal: 20, shadowColor: "#cccccc", shadowOffset: { width: 5, height: 5 }, shadowRadius: 10, shadowOpacity: 0.5 }}>
//             <View style={{ paddingHorizontal: 20, paddingVertical: 15, borderRightWidth: 1, borderRightColor: "#cccccc" }}>
//               <Icon name='calendar' color='gray' size={20}></Icon>
//             </View>
//             <TextInput
//               value={dateTime}
//               onChangeText={setDateTime}
//               placeholder="29 Aug, 11:00am"
//               style={{ paddingHorizontal: 20, width: "100%", color: "gray" }}
//             />
//           </View>

//           <View style={{ display: "flex", flexDirection: "row", borderWidth: 1, borderColor: "#cccccc", marginHorizontal: 20, shadowColor: "#cccccc", shadowOffset: { width: 5, height: 5 }, shadowRadius: 10, shadowOpacity: 0.5 }}>
//             <View style={{ paddingHorizontal: 20, paddingVertical: 15, borderRightWidth: 1, borderRightColor: "#cccccc" }}>
//               <Icon name='user' color='gray' size={20}></Icon>
//             </View>
//             <TextInput
//               value={fullName}
//               onChangeText={setFullName}
//               placeholder="John Cena"
//               style={{ paddingHorizontal: 20, width: "100%", color: "gray" }}
//             />
//           </View>

//           <View style={{ display: "flex", flexDirection: "row", borderWidth: 1, borderColor: "#cccccc", marginHorizontal: 20, shadowColor: "#cccccc", shadowOffset: { width: 5, height: 5 }, shadowRadius: 10, shadowOpacity: 0.5 }}>
//             <View style={{ paddingHorizontal: 20, paddingVertical: 15, borderRightWidth: 1, borderRightColor: "#cccccc" }}>
//               <Icon name='phone' color='gray' size={20}></Icon>
//             </View>
//             <TextInput
//               value={phoneNumber}
//               onChangeText={setPhoneNumber}
//               placeholder="987543210"
//               style={{ paddingHorizontal: 20, width: "100%", color: "gray" }}
//             />
//           </View>

//           <View style={{ display: "flex", flexDirection: "row", borderWidth: 1, borderColor: "#cccccc", marginHorizontal: 20, shadowColor: "#cccccc", shadowOffset: { width: 5, height: 5 }, shadowRadius: 10, shadowOpacity: 0.5 }}>
//             <View style={{ paddingHorizontal: 20, paddingVertical: 15, borderRightWidth: 1, borderRightColor: "#cccccc" }}>
//               <Icon name='location-arrow' color='gray' size={20}></Icon>
//             </View>
//             <TextInput
//               value={address}
//               onChangeText={setAddress}
//               placeholder="Hinjewadi, Pune, Maharahtra"
//               style={{ paddingHorizontal: 20, width: "100%", color: "gray" }}
//             />
//           </View>
          
//           <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", marginTop: 20 }} onPress={handleConfirm} >
//             <Text style={{ backgroundColor: "#fd6100", color: "white", paddingVertical: 8, paddingHorizontal: 20, borderRadius: 10, fontSize: 18, fontWeight: "600", textAlign: "center", width: Dimensions.get('window').width * 0.8 }}>CONFIRM</Text>
//           </TouchableOpacity>

//         </View>
//       </ScrollView>

//       <View style={{marginVertical: 20}}>
//         <Text style={{ color: "gray", textAlign: "center" }}>By scheduling a visit, you agree to our <span style={{ fontWeight: "bold" }}>Terms and Conditions.</span></Text>
//       </View>

//     </View>

//   )
// }

// export default PetAdopt
