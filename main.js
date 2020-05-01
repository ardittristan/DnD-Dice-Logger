//! imports
const input = require("input");
const { existsSync, mkdirSync, writeFileSync, createWriteStream } = require("fs");
const { red, green } = require("colors/safe");



//! constant variables
const diceValues = [100, 20, 12, 10, 8, 6, 4];



//! init csv
if (!existsSync("./db")) {
    mkdirSync("./db");
}
if (!existsSync("./db/data.csv")) {
    writeFileSync("./db/data.csv", "type, value");
}

const stream = createWriteStream("./db/data.csv", { flags: 'a' });

main().then(function () { stream.end(); });


//! main loop
async function main() {
    var running = true;
    while (running) {
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
            addToCSV(inputDice, inputNumber);
            /** @type {boolean} */
            var repeat = await input.confirm("Do you want to add the same dice again\n(y) "); emptyLine();
            while (repeat) {

                var inputNumber = (await input.text("What number did you throw\n", { default: "0" })).trim(); emptyLine();
                if (inputNumber.includes("stop") || inputNumber.includes("exit")) { return; }
                inputNumber = inputNumber.replace(/[^0-9]*/g, "");

                if (!(inputNumber == "" || inputNumber == 0)) {
                    addToCSV(inputDice, inputNumber);
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
function addToCSV(inputDice, inputNumber) {
    if (inputNumber <= diceValues[inputDice]) {
        stream.write(`\nd${diceValues[inputDice]},${inputNumber}`);
        console.log(green("added!")); emptyLine();
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
