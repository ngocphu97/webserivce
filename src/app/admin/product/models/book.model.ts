export interface Book {
  id: number;
  sku: string;
	name: string;
	author: string;
	cost: number; // giá gốc
	retailPrice: number; // giá bán lẻ
	distributor: string;
	language: string;
	size: string;
	totalPage: number;
	translator: string;
	publishDate: string;
	amount: number;
	description: string;
  photo?: string;
  bookshelfId?: number;
  locationName?: string;
  locationDescription?: string;
}

export interface AddBook {
  name: string;
  sku: string;
	author: string;
	cost: number; // giá gốc
	retailPrice: number; // giá bán lẻ
	distributor: string;
	language: string;
	size: string;
	totalPage: number;
	translator: string;
	publishDate: string;
	amount: number;
  description: string;
  location?: number;
  photo?: string;
}
