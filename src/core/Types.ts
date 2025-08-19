export interface Book{
    id: number
    name: string
    price: number
    category: string
    action: boolean
}

export interface Category{
    id: number
    slug: string
    name: string
    amount: number
    
    
}

export interface Customer{
    id: number
    name: string
    Budget: number
}

export interface Address {
    id: string;
    name: string;
    phone: string;
    street: string;
    city: string;
    isDefault: boolean;
}