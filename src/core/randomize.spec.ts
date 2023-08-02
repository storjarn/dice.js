import { randomize } from "./randomize";

describe("randomize", () => {

    describe("randomize()", () => {

        it("exists", () => {
            expect(randomize).toBeTruthy();
        });

        it("is stable", () => {
            for (let i = 0; i < 1000; ++i) {
                const gen = randomize(i, 1000);
                const val = gen();
                expect(
                    val <= 1000
                    && val >= i
                ).toBeTruthy();
            }

        });
    });
});
