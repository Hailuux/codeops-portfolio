'''
1. Variables & Data Types 
• Create variables for: 
o your full name 
o age 
o height (float) 
o is_student (bool) 
o favorite food 
• Print them using f-strings in an attractive way using a nice sentence. '''

full_name = ''
age = ''
height = ''
is_student = ''
favorite_food = ''

print(f'my name is {full_name}. I am {age} years old and I am {height} meters tall. 
      my favorite food is {favorite_food} and me being a student is {is_student}')



'''
2. Arithmetic Operations 
• Take two numbers from user input. (don’t forget to cast inputs to the needed datatype) 
• Print sum, difference, product, division, floor division, and remainder for the two 
numbers (in readable and attractive way) '''
number_1 = int(input('enter the first number : '))
number_2 = int(input('enter the second number : '))
print(number_1 + number_2)
print(number_1 - number_2)
print(number_1 * number_2)
print(number_1 / number_2)
print(number_1 // number_2)
print(number_1 % number_2)



'''
3. Type Conversion 
• Ask user for birth year. 
• Calculate and print their age in a sentence (current year = 2026). '''
current_year = 2026
birth_year = int(input())
age = current_year - birth_year
print(f'you are {age} years old')

'''
4. Simple Decision (if/else) 
• Ask user for a score (0-100). 
• Print "Pass" if score >= 50, otherwise "Fail". '''

score = int(input(''))
if score >= 50:
    print('Pass')
else:
    print('Fail')
score = int(input(''))