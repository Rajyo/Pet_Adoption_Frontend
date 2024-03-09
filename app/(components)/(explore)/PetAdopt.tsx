import { View, Text, useThemeColor } from '@/components/Themed'
import idToken from '@/components/getIdToken';
import { MyContext } from '@/providers/storageProvider';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useContext, useState } from 'react'
import { Alert, Dimensions, Image, ImageSourcePropType, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import { Calendar } from 'react-native-calendars';


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
  const { name, breed, gender, ageInWeeks, pic, _id, typeOfPet } = useLocalSearchParams<any>()

  const [adoptionDate, setAdoptionDate] = useState<any>('')
  const [fullName, setFullName] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [calendar, setCalendar] = useState<boolean>(false)
  const { storeToken, storeId } = useContext(MyContext);
  const token = storeToken == 'No Token' ? idToken().storeToken : storeToken

  const router = useRouter()

  const handleConfirm = async () => {
    // console.log(adoptionDate, fullName, phoneNumber, address);

    if (adoptionDate == '') {
      Alert.alert("Please enter date")
      return
    } else {
      const date = new Date()
      const finalDate = date.toJSON().split('T')[0]
      if (finalDate > adoptionDate) {
        Alert.alert("Please enter valid date")
        return
      }
    }

    if (fullName == '') {
      Alert.alert("Please enter name")
      return
    }

    if (phoneNumber.length !== 10) {
      Alert.alert("Please enter valid Phone Number")
      return
    }

    if (address == '') {
      Alert.alert("Please enter Address")
      return
    }
    //router.replace('/')
    await axios.post('http://10.0.0.58:8000/api/petAdoptionAppointment/', {
      adoptionDate,
      fullName,
      phoneNumber,
      address,
      petName: name,
      petGender: gender,
      petType: typeOfPet,
      petAgeInWeeks: ageInWeeks,
      petPic: pic,
      petBreed: breed
    }, {
      headers: {
        Authorization: token
          ? "Bearer " + token
          : null,
        "Content-Type": "application/json",
        accept: "application/json",
      },
    })
      .then((res: any) => {
        // console.log(res.data);
        router.push('/adoption')
      })
      .catch((error: any) => {
        console.log(error)
      })
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
          <Image source={{uri: pic}} style={{ width: 100, height: 100, borderRadius: 10 }} />
        </View>

        <View style={{ borderBottomColor: "#cccccc", borderBottomWidth: 0.2, marginVertical: 25 }} />


        <View style={{ display: "flex", gap: 20 }}>

          <View style={{ display: "flex", flexDirection: "row", borderWidth: 1, borderColor: "#cccccc", marginHorizontal: 20, shadowColor: "#cccccc", shadowOffset: { width: 5, height: 5 }, shadowRadius: 10, shadowOpacity: 0.5 }}>
            <TouchableOpacity style={{ paddingHorizontal: 20, paddingVertical: 15, borderRightWidth: 1, borderRightColor: "#cccccc" }} onPress={() => setCalendar(!calendar)}>
              <Icon name='calendar' color='gray' size={20}></Icon>
            </TouchableOpacity>

            {calendar && <Calendar
              onDayPress={day => {
                // console.log("day", day);
                setAdoptionDate(day.dateString)
                setCalendar(false)
              }}
            />
            }

            <TextInput
              value={adoptionDate}
              onChangeText={setAdoptionDate}
              placeholder='Select Adoption Date'
              placeholderTextColor={'gray'}
              aria-disabled
              // editable={false}
              keyboardType='numeric'
              onFocus={() => setCalendar(true)}
              onPointerDown={() => setCalendar(true)}
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
              maxLength={20}
              placeholder="John Cena"
              placeholderTextColor={'gray'}
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
              maxLength={10}
              keyboardType='phone-pad'
              placeholder="987543210"
              placeholderTextColor={'gray'}
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
              maxLength={50}
              placeholder="Hinjewadi, Pune, Maharahtra"
              placeholderTextColor={'gray'}
              style={{ paddingHorizontal: 20, width: "100%", color: "gray" }}
            />
          </View>

          <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", marginTop: 20 }} onPress={handleConfirm} >
            <Text style={{ backgroundColor: "#fd6100", color: "white", paddingVertical: 8, paddingHorizontal: 20, borderRadius: 10, fontSize: 18, fontWeight: "600", textAlign: "center", width: Dimensions.get('window').width * 0.8 }}>CONFIRM</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>

      <View style={{ marginVertical: 20 }}>
        <Text style={{ color: "gray", textAlign: "center" }}>By scheduling a visit, you agree to our <Text style={{ fontWeight: "bold" }}>Terms and Conditions.</Text></Text>
      </View>

    </View>

  )
}

export default PetAdopt
