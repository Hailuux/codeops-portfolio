'''8. File Reading & Writing 
• Create a program that: 
o Writes 5 student names and scores to a file students.txt 
o Reads the file back and prints average score 
• Handle the case if file doesn’t exist.'''

try:
    with open("students.txt", "w") as f:
        f.write("Abebe,80\n")
        f.write("Kebede,75\n")
        f.write("Alemu,90\n")
        f.write("Hana,85\n")
        f.write("Dawit,70\n")
    scores = []
    with open("students.txt", "r") as f:
        for line in f:
            name, score = line.strip().split(",")
            scores.append(float(score))
    average = sum(scores) / len(scores)
    print(average)
except FileNotFoundError:
    print("students.txt was not found.")

'''9. Error Handling 
• Write a program that asks user for two numbers. 
• Use try/except to handle: 
o ValueError (non-numeric input) 
o ZeroDivisionError 
• Use finally to always print “Calculation attempt completed”.'''

try:
    x = float(input("Enter the first number : "))
    y = float(input("Enter the second number : "))
    result = x / y
    print(result)
except ValueError:
    print("Please enter numbers only.")
except ZeroDivisionError:
    print("You cannot divide by zero.")
finally:
    print("Completed")


'''10. Full Program – Inventory Manager Create a program that: 
• Uses a dictionary to store product: quantity pair 
• Menu system with options: 
1. Add new product 
2. Update quantity 
3. View all products 
4. Save to file 
5. Load from file 
6. Exit'''

inventory = {}
def add_product():
    product = input("Enter product name: ")
    quantity = int(input("Enter quantity: "))
    if product in inventory:
        print("Product already exists.")
    else:
        inventory[product] = quantity
        print("added successfully.")

def update_quantity():
    product = input("Enter product name : ")
    if product in inventory:
        quantity = int(input("Enter new quantity : "))
        inventory[product] = quantity
        print("updated successfully.")
    else:
        print("Product not found.")

def view_products():
    if not inventory:
        print("Inventory is empty.")
    else:
        for product, quantity in inventory.items():
            print(f" Product : {product}, Quantity : {quantity}")
def save_to_file():
    with open("inventory.txt", "w") as f:
        for product, quantity in inventory.items():
            f.write(f"{product},{quantity}\n")
    print("saved successfully.")

def load_from_file():
    try:
        with open("inventory.txt", "r") as f:
            inventory.clear()
            for line in f:
                product, quantity = line.strip().split(",")
                inventory[product] = int(quantity)
        print("loaded successfully.")
    except FileNotFoundError:
        print("inventory.txt was not found.")

while True:
    print("1. Add new product")
    print("2. Update quantity")
    print("3. View all products")
    print("4. Save to file")
    print("5. Load from file")
    print("6. Exit")
    choice = input("Choose an option: ")
    if choice == "1":
        add_product()
    elif choice == "2":
        update_quantity()
    elif choice == "3":
        view_products()
    elif choice == "4":
        save_to_file()
    elif choice == "5":
        load_from_file()
    elif choice == "6":
        print("Goodbye!")
        break
    else:
        print("Invalid choice. Please try again.")
