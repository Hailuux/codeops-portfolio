'''1. Build a BST. Write a Node class and an insert(root, value) function. Insert several balances, 
then print them with an in-order traversal — they should come out sorted. '''
class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None
def insert(root, value):
    if root is None:
        return Node(value)
    if value < root.value:
        root.left = insert(root.left, value)
    elif value > root.value:
        root.right = insert(root.right, value)
    return root
def inorder(root):
    if root is not None:
        inorder(root.left)
        print(root.value, end=" ")
        inorder(root.right)

#2. Tree depth. Write a recursive height(node) that returns the depth of a binary tree.
def height(node):
    if node is None:
        return 0
    left_height = height(node.left)
    right_height = height(node.right)
    return 1 + max(left_height, right_height)
print("Tree height:", height(root))

'''3. Graph BFS. Given an adjacency-list graph, implement bfs(graph, start) and return the set of 
reachable vertices.''' 
from collections import deque

def bfs(graph, start):
    visited = set()
    queue = deque([start])
    while queue:
        vertex = queue.popleft()
        if vertex in visited:
            continue
        visited.add(vertex)
        for neighbor in graph.get(vertex, []):
            if neighbor not in visited:
                queue.append(neighbor)
    return visited
graph = {
    "A": ["B", "C"],
    "B": ["A", "D", "E"],
    "C": ["A", "F"],
    "D": ["B"],
    "E": ["B", "F"],
    "F": ["C", "E"]
}
print("BFS reachable:", bfs(graph, "A"))

'''4. Graph DFS. Implement dfs(graph, start) recursively, and compare the visit order with your 
BFS. '''
def dfs(graph, start):
    visited = set()
    order = []
    def visit(vertex):
        if vertex in visited:
            return

        visited.add(vertex)
        order.append(vertex)
        for neighbor in graph.get(vertex, []):
            visit(neighbor)
    visit(start)
    return order
print("DFS order:", dfs(graph, "A"))

'''5. Priority queue. Use heapq to push five (priority, task) tuples in mixed order, then pop them all 
— they should come out by priority.'''
import heapq

priority_queue = []
heapq.heappush(priority_queue, (3, "Check balance"))
heapq.heappush(priority_queue, (1, "Emergency transaction"))
heapq.heappush(priority_queue, (5, "Print statement"))
heapq.heappush(priority_queue, (2, "Process withdrawal"))
heapq.heappush(priority_queue, (4, "Update account"))
print("Serving tasks:")
while priority_queue:
    priority, task = heapq.heappop(priority_queue)
    print(priority, "-", task)
