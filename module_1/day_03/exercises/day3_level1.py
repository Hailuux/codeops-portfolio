'''1. Lists & Tuples 
• Create a list of 6 favorite foods. 
• Print the first and last city. 
• Add a new city using .append() 
• Remove the second city using .pop() 
• Create a tuple of coordinates for Ethiopia and unpack it into two variables'''

cities = ["Addis Ababa", "Dire Dawa", "Hawassa", "Bahir Dar", "Mekelle"]
print(cities[0])
print(cities[-1])
cities.append("Adama")
cities.pop(1)
coordinates = (13.145, 30.4897)
latitude, longitude = coordinates

'''2. Dictionaries 
• Create a dictionary student with keys: name, age, grade, city, department. 
• Print the student’s name, department, and grade. 
• Add a new key phone, with value ”0987654321” 
• Update the grade. '''

student = {
    "name": "Abebe",
    "age": 20,
    "grade": 85,
    "city": "Addis Ababa",
    "department": "Computer Science"
}
print(f'Name : {student["name"]} , Department : {student["department"]} , Grade : {student["grade"]}')
student["phone"] = "0987654321"
student["grade"] = 90

'''3. Sets 
• Create a list with duplicate names. 
• Convert it to a set to remove duplicates. 
• Add a new name to the set.'''

names = ["Abebe", "Kebede", "Abebe", "Alemu", "Kebede"]
unique = set(names)
unique.add("Haile")