/**
 * Interface representing a product in the catalogue.
 */
export interface IProduct {
    code: string;
    name: string;
    price: number;
}

/**
 * Class representing a product in the catalogue.
 * Products have a unique code, a name, and a price.
 */
export class Product implements IProduct {
    /**
     * Constructor for the Product class.
     * @param code - The unique code of the product.
     * @param name - The name of the product.
     * @param price - The price of the product.
     */
    constructor(public code: string, public name: string, public price: number) { }
}
