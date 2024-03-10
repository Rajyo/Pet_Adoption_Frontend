declare module '@env' {
    export const BACKEND_URL: string;
}

type PetType = {
    _id: string
    ageInWeeks: number
    breed: string
    gender: string
    location: string
    name: string
    petBehaviour: string
    pic: ImageSourcePropType | undefined
    typeOfPet: string
    dateTime: string
    petInfo: string[]
    likes?: string[] | null
}

type filterType = {
    filterSelect: string | undefined
    item: string | undefined
}

type finalResultType = {
    petType: string,
    gender: string,
    age: string,
    breed: string
}

type PetAdoptType = {
    ageInWeeks: number
    breed: string
    gender: string
    name: string
    pic: ImageSourcePropType | undefined
}


type renderNewlyWelcomedProps = {
    data: PetType
}

type renderUpcomingVisitsProps = {
    data: {
        dateTime: string
        location: string
        name: string
        ageInWeeks: number
        pic: ImageSourcePropType | undefined
    }
}

type renderProfileDataProps = {
    data: {
        id: number
        title: string
        icon: any
        link?: string
    }
}

type PetAdoption = {
    _id: string
    adoptionDate: string
    fullName: string
    phoneNumber: string
    address: string
    petName: string
    petGender: string
    petType: string
    petAgeInWeeks: number
    petPic: string
    petBreed: string
}

type UserType = {
    _id: string
    username: string
    email: string
    password: string
    isAdmin: boolean
    name: string
    location: string
    petAdoptionId: PetAdoption[]
    petLikedId: PetType[]
}