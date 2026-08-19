'''4. Student Class 
• Create a Student class with: 
o name, student_id, and a list of grades 
o Method add_grade(grade) 
o Method average_grade() (use a loop or sum/len) 
• Create a student object, add several grades, and print the average.'''

class Student:
    def __init__(self, name, student_id):
        self.name = name
        self.student_id = student_id
        self.grades = []

    def add_grade(self,grade):
        self.grades.append(grade)
    def average_grade(self,grade):
        return sum(self.grades) / len(self.grades)

'''5. Product Class 
• Create a Product class with name, price, and stock. 
• Add method sell(quantity) that reduces stock (prevent going negative). 
• Add method restock(quantity). 
• Create a product object and test sell and restock.'''

class Product:
    def __init__(self, name, price, stock):
        self.name = name
        self.price = price
        self.stock = stock
    def sell(self, quantity):
        if quantity <= self.stock:
            self.stock -= quantity
            print(f"Sold {quantity} {self.name}.")
        else:
            print("Not enough stock.")
    def restock(self, quantity):
        self.stock += quantity
        print(f"Restocked {quantity} {self.name}.")
product1 = Product("biscuits", 50, 20)
product1.sell(10)
product1.restock(5)

'''6. Encapsulation Practice 
• Modify your Account class from exercise 3: 
o Make balance private (__balance) 
o Add a @property for balance (read-only / getter) 
o Improve withdraw() with proper validation '''

class Account:
    def __init__(self, owner, balance):
        self.owner = owner
        self.__balance = balance

    @property
    def balance(self):
        return self.__balance
    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
            print("Deposited:", amount)
        else:
            print("Deposit amount must be positive.")
    def withdraw(self, amount):
        if amount <= 0:
            print("Withdrawal amount must be positive.")
        elif amount > self.__balance:
            print("Insufficient balance.")
        else:
            self.__balance -= amount
            print("Withdrawn:", amount)
acc = Account("Abebe", 1000)
acc.deposit(200)
acc.withdraw(300)
acc.withdraw(2000)