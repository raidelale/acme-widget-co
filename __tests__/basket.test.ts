import { Product } from '../product';
import { Basket } from '../basket';
import { Offer } from '../offer';

describe('Basket', () => {
  let basket: Basket;
  let products: Product[];
  let deliveryRules: { threshold: number; charge: number }[];
  let offers: Offer[];

  beforeEach(() => {
    products = [
      new Product('B01', 'Blue Widget', 7.95),
      new Product('G01', 'Green Widget', 24.95),
      new Product('R01', 'Red Widget', 32.95),
    ];

    deliveryRules = [
      { threshold: 50, charge: 4.95 },
      { threshold: 90, charge: 2.95 },
      { threshold: Infinity, charge: 0 },
    ];

    offers = [
      new Offer('Buy one red widget, get the second half price', (items, total) => {
        const redWidgets = items.filter(item => item.code === 'R01');
        if (redWidgets.length >= 2) {
          const discount = redWidgets[1].price / 2;
          return total - discount;
        }
        return total;
      }),
    ];

    basket = new Basket(products, deliveryRules, offers);
  });

  test('should calculate the total for B01, G01', () => {
    basket.add('B01');
    basket.add('G01');
    expect(basket.total()).toBe(37.85);
  });

  test('should calculate the total for R01, R01', () => {
    basket.add('R01');
    basket.add('R01');
    expect(basket.total()).toBe(54.37);
  });

  test('should calculate the total for R01, G01', () => {
    basket.add('R01');
    basket.add('G01');
    expect(basket.total()).toBe(60.85);
  });

  test('should calculate the total for B01, B01, R01, R01, R01', () => {
    basket.add('B01');
    basket.add('B01');
    basket.add('R01');
    basket.add('R01');
    basket.add('R01');
    expect(basket.total()).toBe(98.27);
  });

  test('should handle an empty basket', () => {
    expect(basket.total()).toBe(0);
  });

  test('should handle invalid product codes gracefully', () => {
    expect(() => basket.add('INVALID_CODE')).toThrowError('Product with code INVALID_CODE not found.');
  });

});
