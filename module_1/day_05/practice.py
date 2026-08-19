from abc import ABC, abstractmethod

class Vehicle(ABC):
    def __init__(self, make, model):
        self.make = make
        self.model = model
    def describe(self):
        print(f' make : {self.make}\n model : {self.model}')
    @abstractmethod
    def wheels(self):
        pass

class Car(Vehicle):
    def __init__(self, make, model):
        super().__init__(make, model)
    def wheels(self):
        return 4

class Truck(Vehicle):
    def __init__(self, make, model, capacity):
        super().__init__(make, model)
        self.capacity = capacity
    def describe(self):
        print(f' make : {self.make}\n model : {self.model}\n capacity : {self.capacity}')
    def wheels(self):
        return 8

vehicles = [
Car('Toyota','Corolla'),
Truck('Ford', 'F-150', '2 tons'),
Car('Honda', 'Civic')
]
for vehicle in vehicles:
    vehicle.describe()
    print(f'wheels : {vehicle.wheels()}')
