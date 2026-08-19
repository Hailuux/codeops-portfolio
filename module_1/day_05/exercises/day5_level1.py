'''1. Simple Inheritance 
• Create a Vehicle parent class with: 
o name, model, year 
o info() method 
• Create Car and Motorcycle child classes that inherit from Vehicle. 
• Add one unique attribute and method to each child.'''
class Vehicle:
    def __init__(self, name, model, year):
        self.name = name
        self.model = model
        self.year = year
    def info(self):
        print(f'name : {self.name} , model : {self.model} , year : {self.year}')
class Car(Vehicle):
    def __init__(self, name, model, year, seats):
        super().__init__(name, model, year)
        self.seats = seats
    def car_seats(self):
        print(f'this car has {self.seats} number of seats')
class Motorcycle(Vehicle):
    def __init__(self, name, model, year, color):
        super().__init__(name, model, year)
        self.color = color
    def bike_color(self):
        print(f'this motorcyle has a {self.color} color')

car = Car("Toyota", "Corolla", 2022, 4)
motorcycle = Motorcycle("Honda", "CBR", 2023, 'green')
Vehicle.info(car)
Car.car_seats(car)
Vehicle.info(motorcycle)
Motorcycle.bike_color(motorcycle)

'''2. SavingsAccount Inheritance 
• Using the Account class from Day 4: 
o Create SavingsAccount that inherits from Account 
o Add interest_rate data 
o Add add_interest() method '''

from abc import ABC, abstractmethod

class Account(ABC):
    def __init__(self, owner, balance):
        self.owner = owner
        self.balance = balance
    @abstractmethod
    def calculate_interest(self):
        pass
    def deposit(self, amount):
        self.balance += amount
        print("Balance:", self.balance)
    def withdraw(self, amount):
        self.balance -= amount
        print("Balance:", self.balance)
    def statement(self):
        print(f'owner : {self.owner} , balance : {self.balance}')

class SavingsAccount(Account):
    def __init__(self, owner, balance, interest_rate):
        super().__init__(owner, balance)
        self.interest_rate = interest_rate
    def calculate_interest(self):
        return self.balance * 0.05
    def add_interest(self):
        interest = self.balance * self.interest_rate
        self.balance += interest
        print("Interest:", interest)
        print("New balance:", self.balance)
    def statement(self):
            print(f'owner : {self.owner} , balance : {self.balance} , interest rate : {self.interest_rate}')

class CurrentAccount(Account):
    def __init__(self, owner, balance, overdraft_limit):
        super().__init__(owner, balance)
        self.overdraft_limit = overdraft_limit
    def calculate_interest(self):
        return self.balance * 0.05
    def withdraw(self, amount):
        if amount <= self.balance + self.overdraft_limit:
            self.balance -= amount
            print("Withdrawn:", amount)
            print("Balance:", self.balance)
        else:
            print("Withdrawal exceeds overdraft limit.")
    def statement(self):
            print(f'oner : {self.owner} , balance : {self.balance} , overdraft limit : {self.overdraft_limit}')
'''3. CurrentAccount Inheritance 
• Create CurrentAccount that inherits from Account 
o Add overdraft_limit data 
o Override withdraw() method to allow overdraft