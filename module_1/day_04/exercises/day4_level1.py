'''1. Simple Class – Person 
• Create a Person class with: 
o name and age attributes 
o __init__ constructor 
o introduce() method that prints a greeting with the self.name 
• Create 2 Person objects and call introduce() on both. '''
class Person:
    def __init__(self,name,age = None):
        self.name = name
        self.age = age
    def introduce(self):
        print(f'Hello {self.name}!')
a = Person('Abebe')
b = Person ('Kebede')
a.introduce()
b.introduce()

'''2. Rectangle Class 
• Create a Rectangle class with length and width. 
o Add a method area() that returns length × width. 
o Add a method perimeter(). 
• Create 2 Rectangle objects and call area() & perimeter() on both.'''

class Rectangle:
    def __init__(self, length, width):
        self.length = length
        self.width = width
    def area(self):
        print (self.length * self.width)
    def perimeter(self):
        print (2 * (self.length + self.width))
a = Rectangle(3,5)
b = Rectangle(7,4)
a.area()
a.perimeter()
b.area()
b.perimeter()

'''3. Bank Account (Basic) 
• Create an Account class with owner and balance. 
• Add deposit(amount) and withdraw(amount) methods. 
• Create an object and test deposits and withdrawals.'''

class Account:
    def __init__(self,owner , balance):
        self.owner = owner
        self.balance = balance
    def deposit(self, amount):
       self.balance += amount
       print(self.balance)
    def withdraw(self, amount):
        self.balance -= amount
        print(self.balance)
acc = Account('Abebe', 1000)
acc.deposit(200)
acc.withdraw(300)  