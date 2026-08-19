# Addis Bank Account Management System
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
        self.__balance -=amount
    def statement(self):
        print(f' name = {self.owner} \n account number = {self.number} \n balance = {self.__balance}')

class SavingsAccount(Account):
    def __init__(self, owner, number, balance = 0, rate =0.05):
        super().__init__(owner, number, balance)
        self.rate = rate
    def add_interest(self):
        self.deposit(self.balance * self.rate)
    def statement(self):
        print("Account Type: Savings Account")
        super().statement()

class CurrentAccount(Account):
    def __init__(self, owner, number, balance = 0, overdraft = 1000):
        super().__init__(owner, number, balance)
        self.overdraft = overdraft
    def statement(self):
        print("Account Type: Current Account")
        super().statement()
    def withdraw(self, amount):
        if self.balance - amount < -self.overdraft:
            raise ValueError("Overdraft limit exceeded")
        self._Account__balance -= amount

acc = CurrentAccount("Abebe", "1234", 500, overdraft=1000)
acc.withdraw(1200) 
acc.statement()
