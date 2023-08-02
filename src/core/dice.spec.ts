import { Dice } from "./dice";
import { SidedRoll } from "./roll";
import { RollSequence } from "./roll-sequence";

describe("dice", () => {

    describe("Dice", () => {

        it("exists", () => {
            expect(Dice).toBeTruthy();
        });

        describe(".defaults", () => {

            it("is as expected", () => {
                const dice = new Dice();
                expect(dice.defaults).toEqual({
                    multiple: 1,
                    typeOfDie: 6,
                    modifier: 0
                });
            });

        });

        describe(".random()", () => {

            it("is stable", () => {
                const dice = new Dice();
                for (let i = 0; i < 1000; ++i) {
                    const val = dice.random(i, 1000);
                    expect(
                        val <= 1000
                        && val >= i
                    ).toBeTruthy();
                }
            });
        });

        describe(".randomize()", () => {

            it("is stable", () => {
                const dice = new Dice();
                for (let i = 0; i < 1000; ++i) {
                    const gen = dice.randomize(i, 1000);
                    const val = gen();
                    expect(
                        val <= 1000
                        && val >= i
                    ).toBeTruthy();
                }
            });
        });

        describe(".d()", () => {

            it("is stable", () => {
                const dice = new Dice();
                for (let i = 0; i < 1000; ++i) {
                    const val = dice.d(i);
                    expect(
                        val.min === 1
                        && val.max === i
                        && val.multiple === 1
                        && val.typeOfDie === i
                        && val.value >= 1
                        && val.value <= i
                    ).toBeTruthy();

                    const val2 = dice.d(i, -1);
                    expect(
                        val.min === 0
                        && val2.max === i - 1
                        && val2.multiple === 1
                        && val2.typeOfDie === i
                        && val2.value >= 0
                        && val2.value <= i - 1
                    ).toBeTruthy();
                }
            });
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
