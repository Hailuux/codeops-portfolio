'''1. Book class. Define Book with title, author, and pages. Add a describe() method that prints a 
one-line summary. Create two books. '''
class Book:
    def __init__(self,title,author,pages):
        self.title = title
        self.author = author
        self.pages = pages
    def describe(self):
        print(f'{self.title} is a book authored by {self.author} and it has {self.pages} pages.')
book1 = Book('Atomic Habits','James Clear',256)
book2 = Book('Rich Dad Poor Dad', 'Robert T.Kiyosaki',241)
print(book1.describe())
print(book2.describe())

'''2. Product class. Define Product with name, price (ETB), and quantity. Add restock(n) and 
sell(n) methods that change the quantity. '''
class Product:
    def __init__(self,name,price,quantity):
        self.name = name
        self.price = price
        self.__quantity = quantity
    #3. Make it private. Change quantity to a private __quantity and add a @property getter for it
    @property
    def quantity(self):
        return self.__quantity
    #4. Validate. Add a setter (or guard in sell) that refuses to let the quantity go below zero.
    @quantity.setter
    def quantity(self, value):
        if value < 0:
            print("Quantity cannot be negative.")
        else:
            self.__quantity = value
    def restock(self, n):
        self.__quantity += n
    def sell(self, n):
        if n <= self.__quantity:
            self.__quantity -= n
        else:
            print("Not enough stock.")
#5. Prove independence. Create three Product objects, change one, and show the other two are 
#unaffected.
product1 = Product("pen", 5, 20)
product2 = Product("pencil", 2, 15)
product3 = Product("book", 150, 30)





 



