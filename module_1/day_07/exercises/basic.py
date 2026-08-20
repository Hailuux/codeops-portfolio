#Basic Exercises 
'''1. Big-O Notation What is the time complexity of the following operations? 
o Accessing an element in a Python list by index. 
o Searching for an element in a list using in. 
o Inserting at the beginning of a list. 
o Dictionary lookup by key. 

Access list element by index - O(1)
Search using 'in' - O(n)               
Insert at beginning of list  O(n)       
Dictionary lookup by key - O(1)'''


'''2. Compare Complexities Rank these from fastest to slowest for large input size (n = 
1,000,000): O(1), O(log n), O(n), O(n²) 
fastest to slowest :
O(1)
O(log n)
O(n)
O(n²)
'''

'''3. Arrays / Lists Create a list of 10 student names. Demonstrate: 
o Accessing by index 
o Adding at the end 
o Inserting at position 0 

students = [
    "Abebe",
    "Betty",
    "Dawit",
    "Eden",
    "Fikru",
    "Hana",
    "Kebede",
    "Liya",
    "Meron",
    "Natnael"
]

print(students[3])
students.append("Samuel")
students.insert(0, "Selam")
'''

'''4. Hashmaps (Dictionaries) Create a dictionary student_grades with 5 students. Show how 
to: 
o Add a new student 
o Update a grade 
o Check if a student exists (fast lookup) 

student_grades = {
    "Abebe": 85,
    "Betty": 92,
    "Dawit": 78,
    "Eden": 95,
    "Fikru": 88
}
student_grades["Hana"] = 90
student_grades["Abebe"] = 91
if "Eden" in student_grades:
    print("Eden exists in the dictionary.")
'''