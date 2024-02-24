import { createContext } from "react";

export type storageType = {
    storeToken: string | null
    storeId: string | null
}

const defaultState: storageType = {
    storeToken: null,
    storeId: null,
} 

  export const MyContext = createContext<storageType>(defaultState)
  export const MyProvider = MyContext.Provider



// const StorageProvider = ({ children }: { children: ReactNode }) => {
//     const [storeToken, setStoreToken] = useState<string | null>(null)
//     const [storeId, setStoreId] = useState<string | null>(null)

//     const changeToken = (token: string | null) => {
//         setStoreToken(token)
//     }
    
//     const changeId = (id: string | null) => {
//         setStoreId(id)
//     }


//     return (
//         <StorageContext.Provider value={{ storeToken, storeId, changeToken, changeId }}>
//             {children}
//         </StorageContext.Provider>
//     )
// }

// export default StorageProvider

// import { createContext } from "react"

// export type storageType = {
//     storeToken: string | null
//   }
  
//   const defaultState: storageType = {
//     storeToken: null,
//   } 
//   export const MyContext = createContext<storageType>(defaultState)
//   export const MyProvider = MyContext.Provider




