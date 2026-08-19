'''
5. Grade Classifier 
• Ask a user for a score. 
• Use if / elif / else to print: 
o 90–100 → Excellent 
o 80–89 → Very Good 
o 70–79 → Good 
o 50–69 → Pass 
o Below 50 → Fail '''

score = int(input('enter your score : '))
if score >= 90 and score <= 100:
    print('Excellent')
elif score >= 80 and score <= 89:
    print('Very Good')
elif score >= 70 and score <= 79:
    print('Good')
elif score >= 50 and score <= 69:
    print('Pass')
else:
    print('Fail')



 
'''
6. Number Pattern 
• Use a for loop to print numbers from 1 to 20. 
• Print only odd numbers. 
• Print only numbers divisible by 5 (use a nested if (if statement in a for statement)) '''

for i in range (20):
    if i % 2 != 0:
        print(i)
    if i % 5 == 0:
        print(i)


'''
7. While Loop Practice 
• Ask user to enter positive numbers. 
• Keep adding them until user enters 0. 
• Print the total sum. 
'''

total = 0
while True:
    num = int(input('Enter a positive number : '))
    if num == 0:
        break
    if num > 0:
        total += num
print(f'sum = {total}')


'''
8. Function Practice Create these functions: 
• greet(name) → prints welcome message 
• square(number) → returns number * number 
• is_even(number) → returns True if even, False otherwise'''


def greet(name):
    print('Hello, Welcome!')

def square(num):
    return num **2

def even(num):
    if num % 2 ==0:
        return "True"
    else:
        return "False"

