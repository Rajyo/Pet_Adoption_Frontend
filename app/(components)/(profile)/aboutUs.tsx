import { View, Text } from '@/components/Themed'
import React from 'react'

const AboutUs = () => {
  return (
    <View style={{ minHeight: "100%", paddingHorizontal: 20, paddingVertical:10 }}>

      <Text style={{fontSize:16, marginVertical:15}}>Whether you need in-home pet grooming, pet boarding, pet training, dog walking, pet insurance, pet relocation, or vet on call, <Text style={{fontWeight:"bold", color:"orange"}}>PAWSFORYOU</Text> connects pet parents with pet care heroes who’ll treat their pet like family.
      </Text>

      <Text style={{fontSize:16, marginVertical:15}}>
        We understand your pet is family. And you can trust us to keep your pet happy, healthy, and sweet as ever.
      </Text>

      <Text style={{fontSize:16, marginVertical:15}}>
        But it’s not just about pet love. <Text style={{fontWeight:"bold", color:"orange"}}>PAWSFORYOU</Text> is also committed to making pet care safe, easy, and affordable so that everyone can experience the unconditional love of a pet. Whatever you and your furr babies are into, we’re into it too. And we’ve got your back. Anytime. Anywhere.
      </Text>

      <Text style={{fontSize:16, marginVertical:15}}>
        <Text style={{fontWeight:"bold", color:"orange"}}>PAWSFORYOU</Text> donates a portion of every service to Pet NGO’s & Rescue shelters through this program. We also provide meals to shelter dogs in India.
      </Text>
    </View>
  )
}

export default AboutUs