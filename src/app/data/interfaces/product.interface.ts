import { CategoryInterface } from "./category.interface";

export interface ProductInterface {
    id:number;
    title:string;
    slug:string;
    price:number;
    description:string;
    category: CategoryInterface;
    images:string[];
}
