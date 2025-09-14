export interface Book{
    id: string
    title: string
    description: string
    sku: string
    price: number
    sale_price: number
    stock_quantity: number
    page_count: number
    cover_type: string
    publication_date?:  Date | null;
    created_at: Date
    updated_at: Date
}
export interface BookCreate {
  title: string;
  description?: string;
  sku: string;
  price: number;
  sale_price?: number;
  stock_quantity?: number;
  page_count?: number;
  cover_type?: string;
  publication_date?: Date |null;}

export interface Category{
    id: number
    slug: string
    name: string
    amount: number
}

export interface Author{
    id: string
    name: string
}

export interface Publisher{
    id: string
    name: string
}

export interface Tag{
    id: string
    name: string
}


export interface User{
    id: string
    name: string
    Budget: number
}

export interface Role{
    id: string
    name: string
}

export interface Address {
    id: string;
    name: string;
    phone: string;
    street: string;
    city: string;
    isDefault: boolean;
}