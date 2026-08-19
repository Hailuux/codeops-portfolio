'''
A program customer_report.py that takes a list of customers (name and TeleBirr balance in ETB), 
assigns each a tier, and prints a tidy report — plus a summary count of how many customers fall in 
each tier. '''
customers = [ 
("Almaz", 1500), ("Dawit", 700), ("Tigist", 200), 
("Hanna", 1200), ("Samuel", 450), 
] 

def tier(balance):
    if balance >= 1000:
        return 'Premium'
    if balance >= 500:
        return 'Standard'
    return 'Basic'
premium_count = 0
standard_count = 0
basic_count = 0
for name,balance in customers:
    print(f'{name}: {tier(balance)} ({balance} ETB)') 
    if tier(balance) == 'Premium':
        premium_count += 1
    if tier(balance) == 'Standard':
        standard_count +=1
    if tier(balance) == 'Basic':
        basic_count += 1

print(f'the number of Premium accounts is {premium_count}')
print(f'the number of Standard accounts is {standard_count}')
print(f'the number of Basic accounts is {basic_count}')