# Addis Bank - Account Management System
class BankConfig:
    _instance = None
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.interest_rate = 0.05
            cls._instance.overdraft_limit = 1000
        return cls._instance

class SMSAlert:
    def update(self, message):
        print(f"SMS Alert : {message}")

class AuditLog:
    def update(self, message):
        print(f"Audit Log : {message}")

class Account:
    def __init__(self, owner, account_number, balance=0):
        self.owner = owner
        self.account_number = account_number
        self.__balance = balance
        self.observers = []
        self.history = []
    def subscribe(self, observer):
        self.observers.append(observer)
    def _notify(self, message):
        for observer in self.observers:
            observer.update(message)
    @property
    def balance(self):
        return self.__balance
    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        self.__balance += amount
        self.history.append({
            "type": "deposit",
            "amount": amount
        })
        self._notify(
            f"Deposit of {amount} ETB. "
            f"New balance : {self.balance} ETB"
        )
    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        if self.__balance < amount:
            raise ValueError("Insufficient balance")
        self.__balance -= amount
        self.history.append({
            "type": "withdraw",
            "amount": amount
        })
        self._notify(
            f"Withdrawal of {amount} ETB. "
            f"New balance : {self.balance} ETB"
        )
    def statement(self):
        print(
            f"Owner : {self.owner}\n"
            f"Account Number : {self.account_number}\n"
            f"Balance : {self.balance} ETB"
        )
    def undo_last(self):
        if not self.history:
            raise ValueError("No transactions to undo")
        transaction = self.history.pop()
        if transaction["type"] == "deposit":
            self.__balance -= transaction["amount"]
        elif transaction["type"] == "withdraw":
            self.__balance += transaction["amount"]
        self._notify(
            f"Undo {transaction['type']} of "
            f"{transaction['amount']} ETB. "
            f"New balance : {self.balance} ETB"
        )

class SavingsAccount(Account):
    def __init__(self, owner, account_number, balance=0):
        super().__init__(owner, account_number, balance)
        config = BankConfig()
        self.rate = config.interest_rate
    def add_interest(self):
        self.deposit(self.balance * self.rate)
    def statement(self):
        print("Account Type : Savings Account")
        super().statement()

class CurrentAccount(Account):
    def __init__(self, owner, account_number, balance=0):
        super().__init__(owner, account_number, balance)
        config = BankConfig()
        self.overdraft = config.overdraft_limit
    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        if self.balance - amount < -self.overdraft:
            raise ValueError("Overdraft limit exceeded")
        self._Account__balance -= amount
        self.history.append({
            "type": "withdraw",
            "amount": amount
        })
        self._notify(
            f"Withdrawal of {amount} ETB. "
            f"New balance: {self.balance} ETB"
        )
    def statement(self):
        print("Account Type : Current Account")
        super().statement()

class AccountFactory:
    @staticmethod
    def create(kind, owner, number, balance=0):
        if kind.lower() == "savings":
            return SavingsAccount(owner, number, balance)
        elif kind.lower() == "current":
            return CurrentAccount(owner, number, balance)
        else:
            raise ValueError("Invalid account type")

class AccountRegistry:
    def __init__(self):
        self.accounts = {}
        self.account_list = []
    def add(self, account):
        self.accounts[account.account_number] = account
        self.account_list.append(account)
    def find(self, number):
        return self.accounts.get(number)
    def list_all(self):
        return self.account_list

registry = AccountRegistry()
