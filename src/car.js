export default class Car {
    constructor(make, model) {
        this.make = make
        this.model = model
    }

    startEngine() {
        console.log(`My ${this} has started`)
    }

    toString() {
        return `${this.make} ${this.model}`
    }
}
