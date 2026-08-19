
'''1. Spot the SRP violation. Take a Report class that builds, saves, and emails a report. Split it 
into three focused classes. '''
class Report:
    def __init__(self, title, content):
        self.title = title
        self.content = content

    def generate(self):
        return f"Title: {self.title} Content : {self.content}"

class ReportSaver:
    def save(self, report):
        print(report.generate())

class ReportEmail:
    def send(self, report, email):
        print(f"Sending report to {email}")

'''2. Refactor to OCP. Replace an if/elif that prints a shape's area by shape type with a small 
class hierarchy and one method. '''
import math

class Shape:
    def area(self):
        pass

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    def area(self):
        return math.pi * self.radius ** 2

class Square(Shape):
    def __init__(self, side):
        self.side = side
    def area(self):
        return self.side ** 2

class Triangle(Shape):
    def __init__(self, base, height):
        self.base = base
        self.height = height
    def area(self):
        return 0.5 * self.base * self.height

'''3. Write a Singleton. Build an AppSettings Singleton holding a currency ("ETB") and confirm two 
instances are the same object.''' 

class AppSettings:
    _instance = None
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.currency = "ETB"
        return cls._instance
    
settings1 = AppSettings()
settings2 = AppSettings()

print(settings1.currency)
print(settings2.currency)

'''4. Write a Factory. Create a ShapeFactory.create(kind) that returns a Circle, Square, or 
Triangle.'''

class Circle:
    def draw(self):
        print("Circle")

class Square:
    def draw(self):
        print("Square")

class Triangle:
    def draw(self):
        print("Triangle")

class ShapeFactory:
    @staticmethod
    def create(kind):
        kind = kind.lower()

        if kind == "circle":
            return Circle()
        elif kind == "square":
            return Square()
        elif kind == "triangle":
            return Triangle()
        else:
            raise ValueError("Unknown shape type")

shape = ShapeFactory.create("circle")
shape.draw()

'''5.Write an Observer pair. Make a NewsAgency subject and two subscriber classes that print when 
notified.'''

class NewsAgency:
    def __init__(self):
        self.subscribers = []

    def subscribe(self, subscriber):
        self.subscribers.append(subscriber)

    def notify(self, news):
        for subscriber in self.subscribers:
            subscriber.update(news)

class TVChannel:
    def update(self, news):
        print(f"TV Channel received: {news}")

class MobileApp:
    def update(self, news):
        print(f"Mobile App received: {news}")