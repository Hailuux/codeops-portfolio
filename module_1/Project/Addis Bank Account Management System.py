# Addis Bank Account Management System
class BankConfig:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.interest_rate = 0.05
            cls._instance.overdraft_limit = 1000
        return cls._instance

class SMSAlert:
    def update(self,message):
        print(f'Sms Alert : {message}')

class AuditLog:
    def update(self,message):
        print(f'Audit Log : {message}')

class Account:
    def __init__(self, owner, number, balance = 0):
        self.owner = owner
        self.number = number
        self.__balance = balance
        self.observers = []

    @property
    def balance(self):
        return self.__balance
    def statement(self):
        print(f' name = {self.owner} \n account number = {self.number} \n balance = {self.__balance}')
    def subscribe(self, observer):
        self.observers.append(observer)
    def _notify(self, message):
        for observer in self.observers:
            observer.update(message)
    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Amount Must be Positive")
        self.__balance += amount
        self._notify(f'Deposit : {amount} ETB , New balance : {self.balance} ETB')
    def withdraw(self,amount):
        if self.__balance < amount:
            raise ValueError("Insufficient balance")
        self.__balance -=amount
        self._notify(f'Withdraw : {amount} ETB , New balance : {self.balance} ETB')


class SavingsAccount(Account):
    def __init__(self, owner, number, balance = 0):
        super().__init__(owner, number, balance)
        config = BankConfig()
        self.rate = config.interest_rate
    def add_interest(self):
        self.deposit(self.balance * self.rate)
    def statement(self):
        print("Account Type: Savings Account")
        super().statement()
   

class CurrentAccount(Account):
    def __init__(self, owner, number, balance = 0, overdraft = 1000):
        super().__init__(owner, number, balance)
        config = BankConfig()
        self.overdraft = config.overdraft_limit
    def statement(self):
        print("Account Type: Current Account")
        super().statement()
    def withdraw(self, amount):
        if self.balance - amount < -self.overdraft:
            raise ValueError("Overdraft limit exceeded")
        self._Account__balance -= amount


class AccountFactory:
    @staticmethod
    def create(kind, owner, number, balance=0):
        if kind.lower() == "savings":
            return SavingsAccount(owner, number, balance)
        elif kind.lower() == "current":
            return CurrentAccount(owner, number, balance)
        raise ValueError("Invalid account type")

sms = SMSAlert()
audit = AuditLog()
account1 = AccountFactory.create(
    "savings",
    "Abebe",
    1001,
    5000
)
account1.subscribe(sms)
account1.subscribe(audit)
account1.deposit(500)
account1.add_interest()
account1.statement()
