export interface Book {
	id: string;
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
	reviews: Array<string>;
	amount: number;
	description: string;
	image: string;
}
