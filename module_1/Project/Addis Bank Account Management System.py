#Addis Bank — Account Management System
class Account:
    def __init__(self, owner, number, balance = 0):
        self.owner = owner
        self.number = number
        self.__balance = balance

    @property
    def balance(self):
        return self.__balance
    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Amount Must be Positive")
        self.__balance += amount
    def withdraw(self,amount):
        if self.__balance < amount:
            raise ValueError("Insufficient balance")
        self.__balance -= amount
    def statement(self):
        print(f' name = {self.owner} \n account number = {self.number} \n balance = {self.__balance}')

acc = Account("Abebe", "1234", 1000)
acc.withdraw(1000)
acc.statement()
