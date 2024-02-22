import { ReactNode, SetStateAction, createContext, useState } from "react";

export type storageType = {
    storeToken: string | null
    storeId: string | null
    changeToken?: (token: string | null) => void
    changeId?: (id: string | null) => void
}

const defaultState: storageType = {
    storeToken: null,
    storeId: null,
} 

export const StorageContext = createContext<storageType>(defaultState)



const StorageProvider = ({ children }: { children: ReactNode }) => {
    const [storeToken, setStoreToken] = useState<string | null>(null)
    const [storeId, setStoreId] = useState<string | null>(null)

    const changeToken = (token: string | null) => {
        setStoreToken(token)
    }
    
    const changeId = (id: string | null) => {
        setStoreId(id)
    }


    return (
        <StorageContext.Provider value={{ storeToken, storeId, changeToken, changeId }}>
            {children}
        </StorageContext.Provider>
    )
}

export default StorageProvider




