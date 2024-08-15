import { IProduct } from './product';
import { IOffer } from './offer';

interface IDeliveryRule {
    threshold: number;
    charge: number;
}

export class Basket {
    // Array to hold items added to the basket
    private items: IProduct[] = [];

    /**
     * Constructor for the Basket class.
     * @param products - The product catalogue available for the basket.
     * @param deliveryRules - The rules for calculating delivery charges based on the basket total.
     * @param offers - A list of offers that can be applied to the basket.
     */
    constructor(
        private products: IProduct[],
        private deliveryRules: IDeliveryRule[],
        private offers: IOffer[]
    ) { }

    /**
    * Adds a product to the basket based on the provided product code.
    * @param productCode - The unique code of the product to add.
    * @throws Error if the product code is not found in the product catalogue.
    */
    add(productCode: string): void {
        const product = this.products.find(p => p.code === productCode);
        if (!product) {
            throw new Error(`Product with code ${productCode} not found.`);
        }
        this.items.push(product);
    }

    /**
    * Calculates the total cost of the basket, including applying any offers and delivery charges.
    * @returns The total cost of the basket, truncated to two decimal places without rounding.
    */
    total(): number {
        if (this.items.length === 0) {
            return 0;
        }

        let total = this.items.reduce((sum, item) => sum + item.price, 0);

        // Apply offers
        this.offers.forEach(offer => {
            total = offer.applyDiscount(this.items, total);
        });

        // Apply delivery charges after calculating the total price
        const deliveryCharge = this.getDeliveryCharge(total);
        total += deliveryCharge;

        // Truncate to two decimal places without rounding
        return Math.floor(total * 100) / 100;
    }

    /**
    * Determines the delivery charge based on the total cost of items in the basket.
    * @param total - The current total of the basket before adding the delivery charge.
    * @returns The delivery charge applicable to the current total.
    */
    private getDeliveryCharge(total: number): number {
        for (let i = 0; i < this.deliveryRules.length; i++) {
            if (total < this.deliveryRules[i].threshold) {
                return this.deliveryRules[i].charge;
            }
        }
        return 0; // Default to free delivery if no rules match
    }

    /**
    * Retrieves the list of items currently in the basket.
    * @returns An array of products currently in the basket.
    */
    getItems(): IProduct[] {
        return this.items;
    }
}
