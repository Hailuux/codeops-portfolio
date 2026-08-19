'''1. Apply SRP + DIP  
• Refactor the Account class so that it does only account-related logic (balance, 
deposit, withdraw).  
• Move persistence and notification to separate classes. Use dependency injection.
2. Factory Pattern  
• Create an AccountFactory class with a create(kind, owner, number, balance) static 
method that returns the correct account type (SavingsAccount, CurrentAccount, or 
FixedDepositAccount). 
3. Observer Pattern  
• Implement a simple Observer system in the Account class. When withdraw() is 
called with amount > 3000, it should notify SMSAlert and AuditLog classes. 
4. Interface Segregation (ISP)  
• Create a small InterestBearing interface and make only SavingsAccount implement 
it.  
• CurrentAccount should not be forced to implement interest methods.'''

from abc import ABC, abstractmethod

class AccountRepository(ABC):

    @abstractmethod
    def save(self, account):
        pass

class DatabaseAccountRepository(AccountRepository):

    def save(self, account):
        print(
            f"Account {account.number} saved to database "
            f"(balance: {account.balance})"
        )

class AccountObserver(ABC):

    @abstractmethod
    def update(self, account, amount):
        pass

class SMSAlert(AccountObserver):

    def update(self, account, amount):
        print(
            f"SMS Alert: Large withdrawal of {amount} "
            f"from account {account.number}"
        )
class AuditLog(AccountObserver):

    def update(self, account, amount):
        print(
            f"Audit Log: Withdrawal of {amount} "
            f"recorded for account {account.number}"
        )

class Account(ABC):

    def __init__(self, owner, number, balance, repository):
        self.owner = owner
        self.number = number
        self.balance = balance
        self.repository = repository
        self.observers = []

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Deposit amount must be positive.")
        self.balance += amount
        self.repository.save(self)

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive.")

        if amount > self.balance:
            raise ValueError("Insufficient balance.")
        self.balance -= amount
        self.repository.save(self)
        if amount > 3000:
            self.notify_observers(amount)

    def add_observer(self, observer):
        self.observers.append(observer)

    def remove_observer(self, observer):
        if observer in self.observers:
            self.observers.remove(observer)

    def notify_observers(self, amount):
        for observer in self.observers:
            observer.update(self, amount)

class InterestBearing(ABC):

    @abstractmethod
    def calculate_interest(self):
        pass

    @abstractmethod
    def add_interest(self):
        pass

class SavingsAccount(Account, InterestBearing):

    INTEREST_RATE = 0.05

    def calculate_interest(self):
        return self.balance * self.INTEREST_RATE

    def add_interest(self):
        interest = self.calculate_interest()
        self.deposit(interest)

class CurrentAccount(Account):
    pass

class FixedDepositAccount(Account):
    pass

class AccountFactory:

    @staticmethod
    def create(kind, owner, number, balance):

        repository = DatabaseAccountRepository()

        kind = kind.lower()

        if kind == "savings":
            account = SavingsAccount(
                owner,
                number,
                balance,
                repository
            )

        elif kind == "current":
            account = CurrentAccount(
                owner,
                number,
                balance,
                repository
            )

        elif kind in ("fixed", "fixeddeposit"):
            account = FixedDepositAccount(
                owner,
                number,
                balance,
                repository
            )

        else:
            raise ValueError(f"Unknown account type: {kind}")

        # Register observers
        account.add_observer(SMSAlert())
        account.add_observer(AuditLog())

        return account