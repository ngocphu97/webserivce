export interface Book {
  id: number;
  sku: string;
	name: string;
	author: string;
	cost: number; // giá gốc
	retailPrice: number; // giá bán lẻ
	inventory: number; // hàng tồn
	distributor: string;
	language: string;
	size: string;
	totalPage: number;
	translator: string;
	publishDate: string;
	reviews?: string;
	amount: number;
	description: string;
  photo?: string;
  
}

export interface AddBook {
  name: string;
  sku: string;
	author: string;
	cost: number; // giá gốc
	retailPrice: number; // giá bán lẻ
	inventory: number; // hàng tồn
	distributor: string;
	language: string;
	size: string;
	totalPage: number;
	translator: string;
	publishDate: string;
	reviews?: string;
	amount: number;
	description: string;
}
