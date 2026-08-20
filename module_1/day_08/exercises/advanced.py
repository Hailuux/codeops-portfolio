'''6. Recursive Problems 
o Write a recursive function to reverse a string. 
o Write a recursive function to count the number of occurrences of a target in a list.'''
def reverse_string(text):
    if len(text) <= 1:
        return text
    return reverse_string(text[1:]) + text[0]
print(reverse_string("hello"))

def count_occurrences(numbers, target):
    if len(numbers) == 0:
        return 0
    count = 1 if numbers[0] == target else 0
    return count + count_occurrences(numbers[1:], target)

'''7. Sorting Comparison  
o Implement Selection Sort and Insertion Sort (take the provided code).  
o Test them on the same list and note how many swaps/comparisons each makes.'''
def selection_sort(arr):
    comparisons = 0
    swaps = 0
    n = len(arr)
    for i in range(n - 1):
        min_index = i
        for j in range(i + 1, n):
            comparisons += 1
            if arr[j] < arr[min_index]:
                min_index = j
        if min_index != i:
            arr[i], arr[min_index] = arr[min_index], arr[i]
            swaps += 1
    return comparisons, swaps

def insertion_sort(arr):
    comparisons = 0
    swaps = 0
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0:
            comparisons += 1
            if arr[j] > key:
                arr[j + 1] = arr[j]
                swaps += 1
                j -= 1
            else:
                break
        arr[j + 1] = key
    return comparisons, swaps

'''8. Two Pointer Technique  
o Given a sorted array, write a function to find two numbers that add up to a target. '''
def two_sum(arr, target):
    left = 0
    right = len(arr) - 1
    while left < right:
        total = arr[left] + arr[right]
        if total == target:
            return arr[left], arr[right]
        elif total < target:
            left += 1
        else:
            right -= 1
    return None