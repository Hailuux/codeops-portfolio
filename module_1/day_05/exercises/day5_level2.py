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
'''
4. Method Overriding 
• In CurrentAccount, override the statement() method to show overdraft info. 
• In SavingsAccount, override statement() to show interest rate.

'''
account1 = Account("Abebe", 1000)
account2 = SavingsAccount("Kebede", 2000, 0.05)
account3 = CurrentAccount("Alemu", 1500, 500) 
accounts = [account1, account2, account3]

for account in accounts:
    account.statement()
    account.deposit(100)          
'''5. Polymorphism Practice 
• Create a list containing objects of the three account types (Account, SavingsAccount, 
CurrentAccount) 
• Loop through the list and call statement() and deposit(100) on each — observe 
polymorphism.

6. Abstract Base Class 
• Make Account an abstract class using ABC and @abstractmethod 
• Add abstract method calculate_interest() 
• Update SavingsAccount and CurrentAccount to implement it
'''