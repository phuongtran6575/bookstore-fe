export interface Book{
    id: number
    name: string
    price: number
    category: string
    action: boolean
}

export interface Category{
    id: number
    name: string
}

export interface Customer{
    id: number
    name: string
    Budget: number
}