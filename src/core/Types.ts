export interface Book{
    id: string
    title: string
    description: string
    sku: string
    price: number
    sale_price: number
    stock_quantity: number
    page_count: number
    ISBN: string
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
  ISBN?: string;
  stock_quantity?: number;
  page_count?: number;
  cover_type?: string;
  publication_date?: Date |null;}

export interface Category{
    id: number
    slug: string
    name: string
    parentName: String
}

export interface Author{
    id: string
    name: string
    bio: string
}

export interface Publisher{
    id: string
    name: string
    address: string
}

export interface Tag{
    id: string
    name: string
    slug: string
}


export interface User{
    id: string
    full_name: string
    email: string
    phone_number: string
    created_at: Date
    updated_at: Date
}
export interface UserCreate{
    full_name: string
    email: string
    password_hash: string
    phone_number: string
}

export interface Role{
    id: string
    name: string
}

export interface Address {
    id: string;
    full_name: string;
    phone_number: string;
    full_address: string;
    is_default: boolean;
}