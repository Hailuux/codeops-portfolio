# Addis Bank - Account Management System
from collections import deque
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
    def top_by_balance(self, n):
        sorted_accounts = sorted(
            self.account_list,
            key=lambda a: a.balance,
            reverse=True
        )
        return sorted_accounts[:n]
    def binary_search(self, numbers, target):
        left = 0
        right = len(numbers) - 1
        while left <= right:
            mid = (left + right) // 2

            if numbers[mid] == target:
                return mid
            elif numbers[mid] < target:
                left = mid + 1
            else:
                right = mid - 1

        return -1
    def find_by_number(self, number):
        sorted_numbers = sorted(self.accounts.keys())
        index = self.binary_search(sorted_numbers, number)
        if index == -1:
            return None
        return self.accounts[sorted_numbers[index]]

    def total_transactions(self, number):
        account = self.find_by_number(number)
        if account is None:
            return None

        def calculate_total(history, index):
            if index == len(history):
                return 0
            transaction = history[index]
            return (
                transaction["amount"]
                + calculate_total(history, index + 1)
            )
        return calculate_total(account.history, 0)

class Branch:
    def __init__(self, name):
        self.name = name
        self.accounts = []
        self.children = []
    def add_account(self, account):
        self.accounts.append(account)
    def add_child(self, branch):
        self.children.append(branch)
    def total_balance(self):
        total = sum(account.balance for account in self.accounts)
        for child in self.children:
            total += child.total_balance()
        return total

def bfs(transfers, start):
    visited = set()
    queue = deque([start])
    while queue:
        current = queue.popleft()
        if current in visited:
            continue
        visited.add(current)
        for recipient in transfers.get(current, []):
            if recipient not in visited:
                queue.append(recipient)
    visited.remove(start)
    return list(visited)
