#7

from abc import ABC, abstractmethod

class Account(ABC):
    def __init__(self, owner, balance):
        self.owner = owner
        self.__balance = balance
    @property
    def balance(self):
        return self.__balance
    @balance.setter
    def balance(self, amount):
        self.__balance = amount
    @abstractmethod
    def calculate_interest(self):
        pass
    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
            print("Balance:", self.__balance)
        else:
            print("Deposit must be positive.")
    def withdraw(self, amount):
        if amount > 0 and amount <= self.__balance:
            self.__balance -= amount
            print("Balance:", self.__balance)
        else:
            print("Insufficient funds.")
    def statement(self):
        print(f"Owner: {self.owner}, Balance: {self.__balance}")

class SavingsAccount(Account):
    def __init__(self, owner, balance, interest_rate):
        super().__init__(owner, balance)
        self.interest_rate = interest_rate
    def calculate_interest(self):
        return self.balance * self.interest_rate
    def add_interest(self):
        interest = self.calculate_interest()
        self.balance += interest
        print("Interest:", interest)
        print("New balance:", self.balance)
    def statement(self):
        print(f"Owner: {self.owner}, Balance: {self.__balance} , interest rate : {self.interest_rate * 100}%")
        
class CurrentAccount(Account):
    def __init__(self, owner, balance, overdraft_limit):
        super().__init__(owner, balance)
        self.overdraft_limit = overdraft_limit
    def calculate_interest(self):
        return 0
    def withdraw(self, amount):
        if amount > 0 and amount <= self.balance + self.overdraft_limit:
            self.balance -= amount
            print("Withdrawn:", amount)
            print("Balance:", self.balance)
        else:
            print("Withdrawal exceeds overdraft limit.")
    def statement(self):
        print(f"Owner: {self.owner}, Balance: {self.__balance} , overdraft limit : {self.overdraft_limit}")

savings = SavingsAccount("Abebe", 1000, 0.05)
current = CurrentAccount("Kebede", 1000, 500)

savings.deposit(200)
savings.add_interest()
savings.statement()

current.deposit(300)
current.withdraw(1500)
current.statement()