'''A program inventory.py for a small Addis Ababa pharmacy that loads stock from a file into a 
dictionary, lets you update quantities, reports low-stock items, and saves the updated stock back to 
the file. 
Requirements 
• Read stock.txt (one item,quantity per line) into a dictionary, inside a try / except for a 
missing file. 
• Add a function that increases or decreases an item's quantity by a given amount. 
• Use a comprehension or loop to print every item where the quantity is below 10 (low stock). 
• Write the updated dictionary back to stock.txt so the changes persist. '''
stock = {}
try:
    with open("stock.txt", "r") as f:
        for line in f:
            item, quantity = line.strip().split(",")
            stock[item] = int(quantity)
except FileNotFoundError:
    print("stock.txt was not found. Starting with empty stock.")

def update_quantity(item, amount):
    if item in stock:
        stock[item] += amount
    else:
        stock[item] = amount

print("Low-stock items:")
for item, quantity in stock.items():
    if quantity < 10:
        print(f"{item}: {quantity}")
        
update_quantity("Paracetamol", 5)
update_quantity("Amoxicillin", -2)

with open("stock.txt", "w") as f:
    for item, quantity in stock.items():
        f.write(f"{item},{quantity}")
print("Updated stock saved to stock.txt.")