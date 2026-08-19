'''9. Tip Calculator (Full Program) Create a program that: 
• Asks for bill amount 
• Asks for tip percentage (10, 15, or 20) 
• Asks number of people splitting (payers) 
• Calculates and prints: 
o Tip amount 
o Total amount 
o Amount each person pays 
• Use at least 2 functions'''

bill_amount = float(input('enter the bill amount : '))
tip_percentage = float(input('enter the tip percentage : '))
number_of_people = int(input('enter the number of people to split the bill : '))
def tip(bill_amount,tip_percentage):
    tip = bill_amount * (tip_percentage/100)
    return tip
def total_amount(bill_amount,tip):
    total = bill_amount + tip
    return total;
def split(total, number_of_people):
    split = total/number_of_people
    return split
tip = tip(bill_amount,tip_percentage)
total = total_amount(bill_amount,tip)
split = split(total,number_of_people)
print(f'the tip amount is {tip}')
print(f'the total amount to be paid is {total}')
print(f'the amount each person pay is {split}')

'''10. Simple Quiz Game 
• Make a 5-question quiz (about Ethiopia or general knowledge). 
• Keep score. 
• At the end, show final score and message based on performance (use functions).'''
def quiz():
    print("Answer the following 5 questions:")
    score = 0
    print("1. What is the capital city of Ethiopia?")
    one = input("Answer: ")
    print("2. What is the currency of Ethiopia?")
    two = input("Answer: ")
    print("3. What is the highest mountain in Ethiopia?")
    three = input("Answer: ")
    print("4. What is the largest lake in Ethiopia?")
    four = input("Answer: ")
    print("5. What is Ethiopia's national language?")
    five = input("Answer: ")
    if one.lower() == "addis ababa":
        score += 1
    if two.lower() == "birr":
        score += 1
    if three.lower() == "ras dashen":
        score += 1
    if four.lower() == "tana" or four.lower() == "lake tana":
        score += 1
    if five.lower() == "amharic":
        score += 1
    return score   
a = quiz()
print("Final score:", a, "/ 5")
def performance(a):
    if a == 5:
        print("Excellent!")
    elif a >= 3:
        print("Good!")
    else:
        print("Poor!")
performance(a)
       

'''11. Function with Default & Return  
Create a function calculate_final_price(price, tax_rate=0.15, discount=0) that: 
• Calculates tax and discount 
• Returns the final price 
• Test with different values''' 

def final_price(price,tax_rate = 0.15, discount = 0):
    tax = price * tax_rate
    discount_of_item = price * discount
    final_price = (price + tax) - discount_of_item
    return final_price

item = final_price(100)
print(item)

'''
13. Personal Finance Tracker (Day 2 Project) 
Create a program with these features: 
• Menu with options: 
1. Add income 
2. Add expense 
3. Show balance 
4. Exit 
• Use functions for each action 
• Use while True loop for the menu 
• Handle invalid inputs using try/except 
Bonus: Save balance to a variable and show summary at the end.

'''
balance = 0

def add_income():
    global balance
    try:
        income = float(input("Enter income amount: "))
        if income > 0:
            balance += income
            print("Income added successfully.")
        else:
            print("Amount must be positive.")
    except ValueError:
        print("Invalid input. Please enter a number.")

def add_expense():
    global balance
    try:
        expense = float(input("Enter expense amount: "))
        if expense > 0:
            balance -= expense
            print("Expense added successfully.")
        else:
            print("Amount must be positive.")
    except ValueError:
        print("Invalid input. Please enter a number.")
def show_balance():
    print("Current balance:", balance)

while True:
    print("\nPersonal Finance Tracker")
    print("1. Add income")
    print("2. Add expense")
    print("3. Show balance")
    print("4. Exit")

    try:
        choice = int(input("Choose an option: "))
        if choice == 1:
            add_income()
        elif choice == 2:
            add_expense()
        elif choice == 3:
            show_balance()
        elif choice == 4:
            print("\nSummary")
            print("Final balance:", balance)
            break
        else:
            print("Invalid option. Please choose 1-4.")
    except ValueError:
        print("Invalid input. Please enter a number.")
