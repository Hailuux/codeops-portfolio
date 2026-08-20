## Intermediate Exercises
'''5. Big-O Analysis  
o Write a function that finds the maximum number in a list. What is its time 
complexity? Then write a function with two nested loops and analyze its 
complexity. 

# to find the maximum
def find_max(numbers):
    if not numbers:
        return None
    max = numbers[0]
    for number in numbers:
        if number > max:
            max= number
    return max

Time complexity - O(n)

#two nested loops

def nested_loops(n):
    for i in range(n):
        for j in range(n):
            print(i, j)

Time complexity: O(n**2)
'''

'''6. Linked List Basics  
o Implement a simple Node class and a LinkedList class with: 
• append(value) 
• print_list()

class Node:
    def __init__(self, value):
        self.value = value
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None
    def append(self, value):
        new_node = Node(value)
        if self.head is None:
            self.head = new_node
            return
        current = self.head
        while current.next is not None:
            current = current.next
        current.next = new_node
    def print_list(self):
        current = self.head
        while current is not None:
            print(current.value, end=" -> ")
            current = current.next
        print("None")
'''

'''7. Stack (LIFO)  
o Implement a Stack class using a list with push, pop, and peek. Use it to reverse a 
string: "Addis Ababa" → "ababa siddA". 

class Stack:
    def __init__(self):
        self.items = []
    def push(self, value):
        self.items.append(value)
    def pop(self):
        if not self.items:
            return None
        return self.items.pop()
    def peek(self):
        if not self.items:
            return None
        return self.items[-1]

#Reverse "Addis Ababa"
def reverse_string(text):
    stack = Stack()
    for character in text:
        stack.push(character)
    reversed_text = ""
    while stack.peek() is not None:
        reversed_text += stack.pop()
    return reversed_text
text = "Addis Ababa"
print("Reversed:", reverse_string(text))
'''

'''8. Queue (FIFO)  
o Implement a Queue class with enqueue and dequeue. Simulate a bank queue: 
customers arrive and are served in order. 

class Queue:
    def __init__(self):
        self.items = []
    def enqueue(self, customer):
        self.items.append(customer)
    def dequeue(self):
        if not self.items:
            return None
        return self.items.pop(0)


# Create a bank queue
bank_queue = Queue()
bank_queue.enqueue("Abebe")
bank_queue.enqueue("Kebede")

while bank_queue.items:
    customer = bank_queue.dequeue()
    print(customer)
    '''