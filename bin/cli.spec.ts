import { cli, dice } from './cli';

describe("bin/cli", () => {

    beforeEach(() => {
        const args = process.argv.slice(2);
        args.forEach((_arg) => {
            process.argv.pop();
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("can run one argument in parseString()", async () => {
        const logSpy = jest.spyOn(console, "log");
        const parseSpy = jest.spyOn(dice, "parseString");

        process.argv.push('2d6m6');

        const retVal = await cli();

        expect(logSpy).toBeCalledWith(retVal);
        expect(parseSpy).toBeCalledWith("2d6m6");
    });

    it("can run two arguments as a simple <arg1>d<arg2> format", async () => {
        const logSpy = jest.spyOn(console, "log");
        const rollSpy = jest.spyOn(dice, "roll");

        process.argv.push('2');
        process.argv.push('6');

        const retVal = await cli();

        expect(logSpy).toBeCalledWith(retVal);
        expect(rollSpy).toBeCalledWith(2, 6);
    });

    it("can run three arguments as a simple <arg1>d<arg2>m<arg3> format", async () => {
        const logSpy = jest.spyOn(console, "log");
        const rollSpy = jest.spyOn(dice, "roll");

        process.argv.push('2');
        process.argv.push('6');
        process.argv.push('6');

        const retVal = await cli();

        expect(logSpy).toBeCalledWith(retVal);
        expect(rollSpy).toBeCalledWith(2, 6, 6);
    });
});