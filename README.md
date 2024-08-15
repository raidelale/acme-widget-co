## **Overview**

This project is a TypeScript implementation of a shopping basket for Acme Widget Co. It simulates adding products to a basket, applying special offers, and calculating the total cost, including delivery charges. The implementation is designed to be modular, maintainable, and easily extendable.

## **Project Structure**

- **`basket.ts`**: Contains the `Basket` class, which manages the basket's contents, applies offers, and calculates the total cost, including delivery charges.
- **`product.ts`**: Defines the `Product` class and the `IProduct` interface, representing items in the product catalogue.
- **`offer.ts`**: Contains the `Offer` class and the `IOffer` interface, representing discount offers that can be applied to the basket.
- **`__tests__/basket.test.ts`**: Contains Jest test cases to validate the functionality of the basket, including adding products, applying offers, and calculating totals.

## **How It Works**

1. **Initialization**: The `Basket` class is initialized with:
   - A list of available products (`IProduct[]`).
   - Delivery charge rules (`IDeliveryRule[]`), which define the cost of delivery based on the total price of the basket.
   - A list of offers (`IOffer[]`) that can be applied to the basket.

2. **Adding Products**: The `add` method allows products to be added to the basket using their unique product code. The method checks if the product exists in the catalogue before adding it.

3. **Calculating the Total**: The `total` method calculates the total cost of the basket:
   - It sums the prices of all items.
   - Applies any relevant offers or discounts.
   - Determines the appropriate delivery charge based on the total.
   - Truncates the total to two decimal places without rounding.

4. **Offers and Discounts**: Offers are applied as strategies that modify the total price based on the contents of the basket. Each offer is encapsulated in an `Offer` class instance.

5. **Delivery Charges**: Delivery charges are determined based on the total cost of items in the basket before the delivery charge is added. The rules for delivery charges are flexible and can be adjusted by modifying the `deliveryRules[]`.

## **Assumptions Made**

- **Product Code Uniqueness**: It is assumed that each product in the catalogue has a unique code. The `add` method relies on this uniqueness to identify and add products.
- **No Rounding for Totals**: The total cost is truncated to two decimal places without rounding. This is to avoid rounding errors that could accumulate in financial calculations.
- **Default Delivery Charge**: If no delivery rules match (i.e., if the total exceeds all thresholds), the delivery charge defaults to `0`.
- **Offer Application Order**: Offers are applied sequentially in the order they are provided. It is assumed that the order of offers does not negatively impact the final total (i.e., there is no dependency between offers).
- **Invalid Product Codes**: If an invalid product code is provided to the `add` method, an error is thrown. This ensures that only valid products are added to the basket.

## **Testing**

The project uses **Jest** for testing. The test suite (`__tests__/basket.test.ts`) includes various scenarios to ensure that the basket behaves as expected. To run the tests:

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the test suite:

   ```bash
   npm test
   ```

## **Extensibility**

The code is designed to be easily extended:
- **New Products**: Additional products can be added to the product catalog without modifying the `Basket` class.
- **New Offers**: New discount strategies can be implemented by creating additional `Offer` instances and passing them to the `Basket` constructor.
- **Additional Features**: The modular design allows for adding new features, such as loyalty points, multi-currency support, or promotional codes.


