//! imports
const input = require("input");
const { Database, OPEN_READWRITE, OPEN_CREATE } = require("sqlite3");
const { existsSync, mkdirSync } = require("fs");
const { red, green } = require("colors/safe");



//! constant variables
const diceValues = [100, 20, 12, 10, 8, 6, 4];



//! init database
if (!existsSync("./db")) {
    mkdirSync("./db");
}
let db = new Database("./db/database.db", OPEN_READWRITE | OPEN_CREATE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log(green("connected to database")); emptyLine(3)
    //* d100
    db.run(/*sql*/`CREATE TABLE IF NOT EXISTS "d100" ("number" INTEGER NOT NULL)`, function (err) {
        if (err) {
            console.error(err.message);
        }
    });
    //* d20
    db.run(/*sql*/`CREATE TABLE IF NOT EXISTS "d20" ("number" INTEGER NOT NULL)`, function (err) {
        if (err) {
            console.error(err.message);
        }
    });
    //* d12
    db.run(/*sql*/`CREATE TABLE IF NOT EXISTS "d12" ("number" INTEGER NOT NULL)`, function (err) {
        if (err) {
            console.error(err.message);
        }
    });
    //* d10
    db.run(/*sql*/`CREATE TABLE IF NOT EXISTS "d10" ("number" INTEGER NOT NULL)`, function (err) {
        if (err) {
            console.error(err.message);
        }
    });
    //* d8
    db.run(/*sql*/`CREATE TABLE IF NOT EXISTS "d8" ("number" INTEGER NOT NULL)`, function (err) {
        if (err) {
            console.error(err.message);
        }
    });
    //* d6
    db.run(/*sql*/`CREATE TABLE IF NOT EXISTS "d6" ("number" INTEGER NOT NULL)`, function (err) {
        if (err) {
            console.error(err.message);
        }
    });
    //* d4
    db.run(/*sql*/`CREATE TABLE IF NOT EXISTS "d4" ("number" INTEGER NOT NULL)`, function (err) {
        if (err) {
            console.error(err.message);
        }
    });
    main();
});



//! main loop
async function main() {
    while (true) {
        /** @type {string} */
        var inputDice = await input.text("What Dice did you throw?\n 0: d100\n 1: d20\n 2: d12\n 3: d10\n 4: d8\n 5: d6\n 6: d4\n", { default: "1" }); emptyLine();
        if (inputDice.includes("stop") || inputDice.includes("exit")) { return; }
        /** @type {string} */
        var inputNumber = (await input.text("What number did you throw\n", { default: "0" })).trim(); emptyLine();


        // check for stop command
        if (inputNumber.includes("stop") || inputNumber.includes("exit")) { return; }

        // remove everything except numbers from string
        inputDice = inputDice.replace(/[^0-9]*/g, "");
        inputNumber = inputNumber.replace(/[^0-9]*/g, "");

        // check if there's actual numbers in answer
        if (!(inputDice == "" || inputNumber == "" || inputNumber == 0)) {
            addToDatabase(inputDice, inputNumber);
            /** @type {boolean} */
            var repeat = await input.confirm("Do you want to add the same dice again\n(y) "); emptyLine();
            while (repeat) {

                var inputNumber = (await input.text("What number did you throw\n", { default: "0" })).trim(); emptyLine();
                if (inputNumber.includes("stop") || inputNumber.includes("exit")) { return; }
                inputNumber = inputNumber.replace(/[^0-9]*/g, "");

                if (!(inputNumber == "" || inputNumber == 0)) {
                    addToDatabase(inputDice, inputNumber);
                    repeat = await input.confirm("Do you want to add the same dice again\n(y) "); emptyLine();
                } else {
                    emptyLine(3); console.log(red("Something went wrong, please try again")); emptyLine();
                    repeat = false;
                }
            }
        } else {
            emptyLine(3); console.log(red("Something went wrong, please try again")); emptyLine();
        }
    }
}



//! functions
/**
 * @param  {number} inputDice
 * @param  {number} inputNumber
 */
function addToDatabase(inputDice, inputNumber) {
    if (inputNumber <= diceValues[inputDice]) {
        switch (diceValues[inputDice]) {
            case 100:
                db.run(/*sql*/`INSERT INTO "d100" ("number") VALUES (?)`, inputNumber);
                break;
            case 20:
                db.run(/*sql*/`INSERT INTO "d20" ("number") VALUES (?)`, inputNumber);
                break;

            case 12:
                db.run(/*sql*/`INSERT INTO "d12" ("number") VALUES (?)`, inputNumber);
                break;

            case 10:
                db.run(/*sql*/`INSERT INTO "d10" ("number") VALUES (?)`, inputNumber);
                break;

            case 8:
                db.run(/*sql*/`INSERT INTO "d8" ("number") VALUES (?)`, inputNumber);
                break;

            case 6:
                db.run(/*sql*/`INSERT INTO "d6" ("number") VALUES (?)`, inputNumber);
                break;

            case 4:
                db.run(/*sql*/`INSERT INTO "d4" ("number") VALUES (?)`, inputNumber);
                break;
        }
        console.log(green("added!")); emptyLine()
    } else {
        emptyLine(3); console.log(red("That number does not correspond to that dice")); emptyLine();
    }
}

function emptyLine(times = 1) {
    var count = 0;
    while (count < times) {
        console.log(String.fromCharCode(8203));
        count++;
    }
}
