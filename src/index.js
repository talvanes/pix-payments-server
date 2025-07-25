import Car from '@root/car'

const cars = new Set([
    ['Toyota', 'Corolla'],
    ['Ford', 'Mustang'],
    ['Chevrolet', 'Camaro'],
    ['Honda', 'Civic'],
    ['Nissan', 'Altima'],
    ['Toyota', 'Camry'],
])

cars.forEach(([make, model]) => {
    let car = new Car(make, model)
    car.startEngine()
})
