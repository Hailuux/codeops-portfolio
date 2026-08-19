''' 1. Unique cities. Given a list with repeated city names, use a set to print the distinct cities, then 
the count.''' 
cities = ['Addis Ababa', 'Hawassa', 'Bahir dar', 'Adama', 'Hawassa','Addis Ababa']
unique_cities = set(cities)
print(unique_cities)

'''2. Price report. Make a dictionary of five grocery items and prices in ETB. Loop with .items() to 
print each on its own line.''' 
grocery = {'oil' : 2000, 'chili' : 250, 'flour' : 100, 'onions' : 200, 'tomato' : 200}
for item in grocery.items():
    print(item)

'''3. Tax comprehension. Given prices = [100, 250, 400, 80], use one comprehension to build 
a list with 15% tax added.'''
prices = [100, 250, 400, 80]
tax = [x + x * 0.15 for x in prices]
print(tax)
 
'''4. Cheap items. From the same list, use a comprehension with a condition to keep only prices 
under 200. '''
prices = [100, 250, 400, 80]
cheap_items = [x for x in prices if x < 200]
print(cheap_items)

'''5. Write & read. Write three customer names to names.txt, then open it and print each name 
back, one per line. '''

with open('names.txt', 'w') as f:
    f.write('Abebe\n')
    f.write('Kebede\n')
    f.write('Alemu\n')

with open('names.txt', 'r') as f:
    for line in f:
        print(line.strip())

'''6. Safe division. Ask the user for a number and divide 1000 by it, catching both ValueError and 
ZeroDivisionError. '''
'''6. Safe division. Ask the user for a number and divide 1000 by it, catching both ValueError and 
ZeroDivisionError. '''
try:
    num = int(input('Enter a number : '))
    result = 1000 / num
    print(f'The result is {result}')

except ValueError:
    print('enter a valid number')

except ZeroDivisionError:
    print('You cannot divide by zero')

