'''1. Name the Big-O. For five short snippets (a list index, a single loop, a nested loop, a dict 
lookup, a binary search), write the Big-O of each as a comment and explain why.'''
numbers = [1, 2, 3, 4, 5]
value = numbers[3]
# Big-O: O(1)

for number in numbers:
    print(number)
 # Big-O: O(n)
 
for i in numbers:
    for j in numbers:
        print(i, j)
# Big-O: O(n²)

students = {
    "Abebe": 85,
    "Kebede": 90,
    "Almaz": 78}
grade = students["Abebe"]
# Big-O: O(1)

def binary_search(numbers, target):
    left = 0
    right = len(numbers) - 1
    while left <= right:
        middle = (left + right) // 2
        if numbers[middle] == target:
            return middle
        elif numbers[middle] < target:
            left = middle + 1
        else:
            right = middle - 1
    return -1
# Big-O: O(log n)

'''2. List vs. dict lookup. Build a list and a dict of 100,000 fake account numbers. Time how long it 
takes to find one near the end in each. '''
import time

accounts_list = [f"i" for i in range(100000)]
accounts_dict = {account: True for account in accounts_list}
target = "099999"
start = time.perf_counter()
if target in accounts_list:
    print("Found in list")
list_time = time.perf_counter() - start
start = time.perf_counter()
if target in accounts_dict:
    print("Found in dictionary")
dict_time = time.perf_counter() - start
print(f"List lookup time: {list_time:.10f} seconds")
print(f"Dictionary lookup time: {dict_time:.10f} seconds")
#List - O(n)
#Dictionary - O(1) 

'''3.Build a stack. Write a Stack class with push, pop, and peek, and use it to reverse a list of 
names.'''
class Stack:

    def __init__(self):
        self.items = []
    def push(self, item):
        self.items.append(item)
    def pop(self):
        if self.is_empty():
            raise IndexError("Stack is empty")
        return self.items.pop()
    def peek(self):
        if self.is_empty():
            raise IndexError("Stack is empty")
        return self.items[-1]
    def is_empty(self):
        return len(self.items) == 0


'''4. Build a queue. Use collections.deque to model a bank service line: enqueue five customers, 
then serve them in order. '''

from collections import deque

queue = deque()

queue.append("Customer 1")
queue.append("Customer 2")
queue.append("Customer 3")
queue.append("Customer 4")
queue.append("Customer 5")

print("Queue:", queue)

while queue:
    customer = queue.popleft()
    print("Serving:", customer)

'''5.Singly linked list. Implement a Node and a LinkedList with push_front and a print_all() that 
walks the chain. '''

class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None
    def push_front(self, data):
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node
    def print_all(self):
        current = self.head
        while current is not None:
            print(current.data, end=" -> ")
            current = current.next
        print("None")

