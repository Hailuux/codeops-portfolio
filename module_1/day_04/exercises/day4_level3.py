'''7. Full Bank Account with Properties: Create a robust BankAccount class that includes: 
• Private __balance 
• @property for balance (getter and setter) 
• deposit() with validation (positive amount only) 
• withdraw() with sufficient funds check 
• transfer(to_account, amount) method 
• Create a BankAccount object and test add, borrow & return methods.'''

class Account:
    def __init__(self,owner, balance):
        self.owner = owner
        self.___balance = balance
    @property
    def balance(self):
        return self.___balance
    @balance.setter
    def balance(self, amount):
        if amount < 0:
            raise ValueError("Balance cannot be negative.")
        self.__balance = amount   

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
            print("Deposited:", amount)
        else:
            print("amount must be positive.")
    def withdraw(self, amount):
        if amount <= 0:
            print("Withdrawal amount must be positive.")
        elif amount > self.__balance:
            print("Insufficient funds.")
        else:
            self.__balance -= amount
            print(f"{amount} ETB withdrawn.")
    def transfer(self, to_account, amount):
        if amount <= 0:
            print("Transfer amount must be positive.")
        elif amount > self.__balance:
            print("Insufficient funds for transfer.")
        else:
            self.__balance -= amount
            to_account.__balance += amount
acc1 = Account("Abebe", 1000)
acc2 = Account("Kebede", 500)
acc1.deposit(200)
acc1.withdraw(300)
acc1.transfer(acc2, 400)

'''8.Library System 
• Create a Book class (title, author, isbn, available) 
• Create a Library class that holds a list of Book objects 
• Add methods: 
o add_book(book) 
o borrow_book(isbn) 
o return_book(isbn) 
• Use encapsulation properly. 
• Create a Book object and test add, borrow & return methods.'''

class Book:
    def __init__(self, title, author, isbn):
        self.title = title
        self.author = author
        self.isbn = isbn
        self.__available = True

    @property
    def available(self):
        return self.__available
    def borrow(self):
        if self.__available:
            self.__available = False
            return True
        return False
    def return_book(self):
        self.__available = True
class Library:
    def __init__(self):
        self.books = []
    def add_book(self,book):
        self.books.append(book)
    def borrow_book(self, isbn):
        for book in self.books:
            if book.isbn == isbn:
                if book.borrow():
                    print(f'{book.title} borrowed successfully')
                else:
                    print(f'{book.title} is already borrowed')
                return
        print('book not found')

    def return_book(self, isbn):
        for book in self.books:
            if book.isbn == isbn:
                if not book.available:
                    book.return_book()
                    print(f"'{book.title}' returned successfully.")
                else:
                    print(f"'{book.title}' was not borrowed.")
                return
        print("Book not found.")
library = Library()
book = Book("Fkr Eske Mekabr", "Hadis Alemayehu", "A001")
library.add_book(book)
library.borrow_book("A001")
library.borrow_book("A001")
library.return_book("A001")
library.borrow_book("A001")

'''9.Car Class with Encapsulation 
• Create a Car class with private attributes: __speed, __fuel 
• Methods: accelerate(), brake(), refuel() 
• Use @property for speed and fuel 
• Create a Car object and test accelerate,brak & refuel methods.'''

class Car:
    def __init__(self, speed, fuel):
        self.__speed = speed
        self.__fuel = fuel
    @property
    def speed(self):
        return self.__speed
    @property
    def fuel(self):
        return self.__fuel
    def accelerate(self, amount):
        self.__speed += amount
        return self.__speed
    def brake(self, amount):
        if amount <= self.__speed:
           self.__speed -= amount
        else:
           self.__speed = 0
        return self.__speed
    def refuel(self,amount):
        if amount > 0:
            self.__fuel += amount
        else:
            print("amount must be positive.")
        return self.__fuel

car = Car(0, 20)
car.accelerate(50)
car.brake(20)
car.refuel(10)