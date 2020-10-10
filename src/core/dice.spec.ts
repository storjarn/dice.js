import { Dice } from "./dice";
import { SidedRoll } from "./roll";
import { RollSequence } from "./roll-sequence";

describe("dice", () => {

    describe("Dice", () => {

        it("exists", () => {
            expect(Dice).toBeTruthy();
        });

        describe(".parseString()", () => {

            it("can parse properly formatted strings", () => {
                const dice = new Dice();
                const roll1: SidedRoll = dice.parseString("2d8-1");

                expect(roll1.value <= 15).toEqual(true);
                expect(roll1.value >= 1).toEqual(true);
            });
        });
    });

    describe("Roll", () => {

        it("exists", () => {
            expect(SidedRoll).toBeTruthy();
        });

        describe("value", () => {

            it("can generate the value for each roll", () => {
                const roll1 = new SidedRoll(2, 3);

                expect(roll1.value).toBeTruthy();
                expect(roll1.value <= 6).toEqual(true);
                expect(roll1.value >= 2).toEqual(true);
            });
        });
    });

    describe("RollSequence", () => {

        it("exists", () => {
            expect(RollSequence).toBeTruthy();
        });

        describe("value", () => {

            it("can calculate the value from rolls", () => {
                const seq: RollSequence = new RollSequence();
                const roll1 = new SidedRoll(2, 3);
                const roll2 = new SidedRoll(2, 3);
                seq.push(roll1);
                seq.push(roll2);

                const val = roll1.value + roll2.value;

                expect(seq.value).toBeTruthy();
                expect(seq.value).toEqual(val);
            });
        });
    });
});
