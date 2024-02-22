// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
// import { useEffect, useState } from "react";

// const trial = () => {
//     const [userToken, setUserToken] = useState('')
    
//     useEffect(() => {
//         const idToken = async () => {
//             const token = await AsyncStorage.getItem('token')
//             setUserToken(token || "No Token")
//         }
//         idToken()
//     })

//     return userToken
// }

// const tokenTrial = trial()
// console.log(tokenTrial);

// const axiosInstance = axios.create({
//   baseURL: 'http://10.0.0.58:8000',
//   timeout: 30000,
//   withCredentials: true,
//     headers: {
//       Authorization: localStorage.getItem("access_token")
//         ? "Bearer " + localStorage.getItem("access_token")
//         : null,
//       "Content-Type": "application/json",
//       accept: "application/json",
//     },
// });

// export default axiosInstance