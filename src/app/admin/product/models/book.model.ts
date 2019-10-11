export interface Book {
	id: number;
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
	image?: string;
}

export interface AddBook {
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
}
