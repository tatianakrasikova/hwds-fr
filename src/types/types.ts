export interface Departament {
  imageUrls: any;
  id: number;
  number: string;
  type: string;
  articles: Article[];
  description: string;
  image: string;
  price: number;
}

export interface Article {
  isBooked: any;
  description: string;
  imageUrls: any;
  id: number;
  number: string;
  type: string;
  price: number;
  departamentId: number;
}

export interface CartItemArticle {
  id: number;
  entryDate: string;
  departureDate: string;
  article: Article;
  cartId: number;
}
