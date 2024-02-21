import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useRouter } from 'expo-router'

const Auth = () => {
    const router = useRouter()

    useEffect(() => {
        router.push('/auth/sign-in')
    })

    return (
        <View>
            <Text>auth</Text>
        </View>
    )
}

export default Auth

const styles = StyleSheet.create({})