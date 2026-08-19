'''4. List Operations 
• Create a list of numbers: [10, 25, 40, 15, 60, 30] 
• Use a loop to print only numbers greater than 30. 
• Sort the list and print it. 
• Find the sum and average of the list.'''

num = [10, 20, 40, 15, 60, 30]
for n in num:
    if n > 30:
        print(n)
num.sort()
print(num)
total = sum(num)
avg = total / len(num)

'''5. Dictionary Operations 
• Create a dictionary of 5 products and their prices. 
• Loop through the dictionary and print each product with its price in an attractive manner. 
• Ask user for a product name and show its price (use .get() with default message if not 
found).'''

products = {
    "Bread": 50,
    "Milk": 80,
    "Coffee": 250,
    "Sugar": 120,
    "Rice": 150
}
for product, price in products.items():
    print(f"Product : {product} ,Price : {price}ETB")
price = products.get(product_name, "Product not found.")
print(f"Result: {price}")
'''6.List Comprehension 
• Create a list of numbers from 1 to 20 using comprehension. 
• Create a new list containing only even numbers from 1 to 30 using comprehension. 
• Create a list of odd numbers from 1 to 10 using comprehension'''

numbers = [x for x in range(1, 20)]
print(numbers)
even = [x for x in range(1, 30) if x % 2 == 0]
print(even)
odd = [x for x in range(1, 10) if x % 2 != 0]
print(odd)

'''7.Modules & Import 
• Create a file utils.py with these function: 
o add_tax(price, rate=0.15) – accepts a price, includes tax and returns tax included 
price 
• In your main.py file, import and use the function.'''
#utils.py
def add_tax(price, rate=0.15):
    tax_included_price = price + (price * rate)
    return tax_included_price
#main.py
from utils import add_tax
price = 100
total = add_tax(price)