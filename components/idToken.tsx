import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react"


const idToken = () => {
  const [storeToken, setStoreToken] = useState<string | null>(null)
  const [storeId, setStoreId] = useState<string | null>(null)

  useEffect(() => {
    const idToken = async () => {
      const token = await AsyncStorage.getItem('token')
      // console.log(token);
      setStoreToken(token || "No Token")

      const id = await AsyncStorage.getItem('id')
      // console.log(id);
      setStoreId(id || "No Id")
    }
    idToken()
  }, [storeToken, storeId])
  
  return {storeToken, storeId}
}

export default idToken
