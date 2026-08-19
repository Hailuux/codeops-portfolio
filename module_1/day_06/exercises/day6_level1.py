'''1. Single Responsibility Principle (SRP)  
• Create a class called Employee that currently handles salary calculation, saving to 
file, and sending email. Refactor it into separate classes following SRP.'''

class Employee:
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

    def calculate_salary(self):
        return self.salary
    
    def save_to_file(self):
        print(f"Saving {self.name} to file")

    def send_email(self):
        print(f"Sending email to {self.name}")

'''2. Open/Closed Principle (OCP)  
• Write a function calculate_bonus(employee_type) that uses if-elif. Then refactor it 
using classes so you can add new employee types without modifying the function.'''

class Employee:
    def calculate_bonus(self, salary):
        raise NotImplementedError

class Manager(Employee):
    def calculate_bonus(self, salary):
        return salary * 0.20

class Cashier(Employee):
    def calculate_bonus(self, salary):
        return salary * 0.05

'''3. Liskov Substitution Principle (LSP)  
• Create Bird and Penguin classes. Fix the design so that a function 
make_bird_fly(bird) works properly with both (without errors).'''

class Bird:
    def move(self):
        print("Bird is moving")

class FlyingBird(Bird):
    def fly(self):
        print("Bird is flying")
class Penguin(Bird):
    def move(self):
        print("Penguin is swimming/walking")

'''4. Identify SOLID Violations  
• Look at this code and name which SOLID principle(s) are violated: '''
class Account: 
def __init__(self): 
self.notifier = EmailNotifier() 
def withdraw(self, amount): 

self.notifier.send_email(...) 
self.save_to_db(...)

Single Responsibility Principle violated