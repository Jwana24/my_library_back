import { AppDataSource } from "./data-source";

AppDataSource.initialize().then(async () => {

    // console.log("Inserting a new user into the database...")
    // const reading = new Reading()
    // reading.firstName = "Timber"
    // reading.lastName = "Saw"
    // reading.age = 25
    // await AppDataSource.manager.save(reading)
    // console.log("Saved a new reading with id: " + reading.id)

    // console.log("Loading readings from the database...")
    // const readings = await AppDataSource.manager.find(Reading)
    // console.log("Loaded readings: ", readings)

    // console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))
