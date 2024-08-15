import { IProduct } from './product';

/**
 * Interface representing a discount offer.
 * Implementations should provide a description and a function to apply the discount.
 */
export interface IOffer {
    description: string;
    applyDiscount(items: IProduct[], total: number): number;
}

/**
 * Class representing a generic offer.
 * The applyDiscount method is passed as a function, allowing for different discount strategies.
 */
export class Offer implements IOffer {
    /**
 * Constructor for the Offer class.
 * @param description - A brief description of the offer.
 * @param applyDiscount - A function that applies the discount logic to the basket.
 */
    constructor(
        public description: string,
        public applyDiscount: (items: IProduct[], total: number) => number
    ) { }
}
