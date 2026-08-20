'''1. Recursion Basics  
• Write a recursive function factorial(n) that returns the factorial of a number. Also 
write the iterative version for comparison.'''

def factorial(n):
    if n == 0 or n == 1: 
        return 1
    return n * factorial(n - 1)
print(factorial(5))

def factorial_iterative(n):
    result = 1
    for i in range(1, n + 1):
        result *= i
    return result
print(factorial_iterative(5))

'''2. Recursion with Lists  
• Write a recursive function sum_list(numbers) that returns the sum of all numbers 
in a list. '''
def sum_list(numbers):
    if len(numbers) == 0: 
        return 0
    return numbers[0] + sum_list(numbers[1:])
numbers = [10, 20, 30, 40]
print(sum_list(numbers))

'''3. Linear Search  
• Implement a function linear_search(arr, target) that returns the index of the target 
or -1 if not found.'''
def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1
numbers = [10, 25, 30, 45, 50]
print(linear_search(numbers, 45))
print(linear_search(numbers, 100))

'''4. Binary Search  
• Implement binary_search(arr, target). Explain why it needs a sorted array.'''

def binary_search(arr, target):
    left = 0
    right = len(arr) - 1
    while left <= right:
        middle = (left + right) // 2
        if arr[middle] == target:
            return middle
        elif arr[middle] < target:
            left = middle + 1
        else:
            right = middle - 1
    return -1

'''5. Bubble Sort  
• Implement Bubble Sort and print the array after each pass.'''
def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        for j in range(n - 1 - i):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
        print(f"After pass {i + 1}: {arr}")