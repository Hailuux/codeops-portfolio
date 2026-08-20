#Basic Exercises 
''''1. Tree Basics  
o Create a TreeNode class.  
o Build a small bank hierarchy: 
▪ Head Office 
▪ Bole Branch 
➢ Teller 
➢ Loan Officer 
▪ Piassa Branch 
o Write a function to print the tree. '''

class TreeNode:
    def __init__(self, name):
        self.name = name
        self.children = []
    def add_child(self, child):
        self.children.append(child)
def print_tree(node, level=0):
    print("  " * level + node.name)
    for child in node.children:
        print_tree(child, level + 1)

'''2. Binary Search Tree  
o Create a BST and insert these values: 50, 30, 70, 20, 40, 60.  
o Search for 40 and 100. Print whether they exist. '''

class BSTNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

class BST:
    def __init__(self):
        self.root = None
    def insert(self, value):
        if self.root is None:
            self.root = BSTNode(value)
        else:
            self._insert(self.root, value)
    def _insert(self, node, value):
        if value < node.value:
            if node.left is None:
                node.left = BSTNode(value)
            else:
                self._insert(node.left, value)
        elif value > node.value:
            if node.right is None:
                node.right = BSTNode(value)
            else:
                self._insert(node.right, value)
    def search(self, value):
        current = self.root
        while current is not None:
            if value == current.value:
                return True
            elif value < current.value:
                current = current.left
            else:
                current = current.right
        return False
bst = BST()
values = [50, 30, 70, 20, 40, 60]

for value in values:
    bst.insert(value)

if bst.search(40):
    print("40 exists in the BST.")
else:
    print("40 does not exist in the BST.")

if bst.search(100):
    print("100 exists in the BST.")
else:
    print("100 does not exist in the BST.")

'''3. Graph Basics  
o Create a graph with customers: Almaz, Dawit, Tigist, Hanna. Add connections 
(money transfers) between them. And print the graph. '''

graph = {
    "Almaz": [],
    "Dawit": [],
    "Tigist": [],
    "Hanna": []
}

def add_connection(customer1, customer2):
    graph[customer1].append(customer2)
    graph[customer2].append(customer1)

add_connection("Almaz", "Dawit")
add_connection("Almaz", "Tigist")
add_connection("Dawit", "Hanna")
add_connection("Tigist", "Hanna")

for customer, connections in graph.items():
    print(customer, "->", connections)

'''
4. Heap Basics  
o Use heapq to create a priority queue for urgent transactions.  
o Add: (5000, "Big Loan"), (200, "Small Deposit"), (10000, "Fraud Alert").  
o Pop the highest priority item.'''

import heapq

priority_queue = []

heapq.heappush(priority_queue, (5000, "Big Loan"))
heapq.heappush(priority_queue, (200, "Small Deposit"))
heapq.heappush(priority_queue, (10000, "Fraud Alert"))

print(priority_queue)
priority, transaction = heapq.heappop(priority_queue)


