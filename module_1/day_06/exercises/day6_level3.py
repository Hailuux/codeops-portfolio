'''9. Full SOLID Refactoring  
o Take a god class version of Account and refactor it using as many SOLID 
principles as possible.  
10. Combine Factory + Observer + Singleton Create: 
o BankConfig as Singleton (for interest rates) 
o AccountFactory to create accounts 
o Observer system that notifies on big transactions 
11. Refactoring Challenge  
o Add a new account type InvestmentAccount to your system.  
o Show how your design (especially OCP + Factory) makes this change easy. '''

from abc import ABC, abstractmethod

    _instance = None
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.interest_rates = {
                "savings": 0.05,
                "fixeddeposit": 0.08,
                "investment": 0.10}
        return cls._instance
        
    def get_interest_rate(self, account_type):
        return self.interest_rates.get(account_type, 0.0)

    def set_interest_rate(self, account_type, rate):
        self.interest_rates[account_type] = rate

class AccountRepository(ABC):
    @abstractmethod
    def save(self, account):
        pass

class DatabaseAccountRepository(AccountRepository):
    def save(self, account):
        print(
            f"[DATABASE] Account {account.number} saved "
            f"with balance {account.balance}")
class AccountObserver(ABC):
    @abstractmethod
    def update(self, account, transaction_type, amount):
        pass

class SMSAlert(AccountObserver):
    def update(self, account, transaction_type, amount):
        print(
            f"[SMS] Big {transaction_type} of {amount} "
            f"on account {account.number}")

class AuditLog(AccountObserver):
    def update(self, account, transaction_type, amount):
        print(
            f"[AUDIT] {transaction_type.upper()} of {amount} "
            f"recorded for account {account.number}")
class InterestBearing(ABC):
    @abstractmethod
    def calculate_interest(self):
        pass
    @abstractmethod
    def add_interest(self):
        pass

class Account(ABC):
    BIG_TRANSACTION_LIMIT = 3000
    def __init__(self, owner, number, balance, repository):
        self.owner = owner
        self.number = number
        self.balance = balance
        self.repository = repository
        self.observers = []
    def deposit(self, amount):
        if amount <= 0:
            raise ValueError(
                "Deposit amount must be positive.")
        self.balance += amount
        self.repository.save(self)

        if amount > self.BIG_TRANSACTION_LIMIT:
            self.notify_observers(
                "deposit",
                amount
            )
    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError(
                "Withdrawal amount must be positive.")
        if amount > self.balance:
            raise ValueError(
                "Insufficient balance.")
        self.balance -= amount
        self.repository.save(self)
        if amount > self.BIG_TRANSACTION_LIMIT:
            self.notify_observers(
                "withdrawal",amount)
    def add_observer(self, observer):
        self.observers.append(observer)

    def remove_observer(self, observer):
        if observer in self.observers:
            self.observers.remove(observer)

    def notify_observers(self, transaction_type, amount):
        for observer in self.observers:
            observer.update(
                self,
                transaction_type,
                amount)
class SavingsAccount(Account, InterestBearing):

    def calculate_interest(self):
        config = BankConfig()
        rate = config.get_interest_rate("savings")
        return self.balance * rate
    def add_interest(self):
        interest = self.calculate_interest()
        self.deposit(interest)
class CurrentAccount(Account):
    pass

class FixedDepositAccount(Account, InterestBearing):
    def calculate_interest(self):
        config = BankConfig()
        rate = config.get_interest_rate("fixeddeposit")
        return self.balance * rate
    def add_interest(self):
        interest = self.calculate_interes()
        self.deposit(interest)

class InvestmentAccount(Account, InterestBearing):
    def calculate_interest(self):
        config = BankConfig()
        rate = config.get_interest_rate("investment")
        return self.balance * rate
    def add_interest(self):
        interest = self.calculate_interes()
        self.deposit(interest)
class AccountFactory:
    _account_types = {}

    @classmethod
    def register(cls, kind, account_class):
        cls._account_types[kind.lower()] = account_class
    @classmethod
    def create(cls, kind, owner, number, balance):
        kind = kind.lower()
        if kind not in cls._account_types:
            raise ValueError(
                f"Unknown account type: {kind}")
        repository = DatabaseAccountRepository()
        account_class = cls._account_types[kind]
        account = account_class(
            owner,
            number,
            balance,
            repository)
        account.add_observer(SMSAlert())
        account.add_observer(AuditLog())
        return account
AccountFactory.register(
    "savings",
    SavingsAccount)
AccountFactory.register(
    "current",
    CurrentAccount)
AccountFactory.register(
    "fixeddeposit",
    FixedDepositAccount)
    
AccountFactory.register(
    "investment",
    InvestmentAccount)
