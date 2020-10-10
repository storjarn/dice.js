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

    it("can show help", async () => {
        const logSpy = jest.spyOn(console, "warn");

        process.argv.push('--help');

        const retVal = await cli();

        expect(logSpy).toBeCalledTimes(1);
        expect(retVal).toEqual(0);
    });

    it("can run one argument in parseString()", async () => {
        const logSpy = jest.spyOn(console, "log");
        const parseSpy = jest.spyOn(dice, "parseString");

        process.argv.push('2d6m6');

        const retVal = await cli();

        expect(logSpy).toBeCalledWith(retVal);
        expect(parseSpy).toBeCalledWith("2d6m6");
    });

    it("can run two arguments in parseString()", async () => {
        const logSpy = jest.spyOn(console, "log");
        const parseSpy = jest.spyOn(dice, "parseString");

        process.argv.push('2d6m6');
        process.argv.push('1d6m-1');

        const retVal = await cli();

        expect(logSpy).toBeCalledWith(retVal);
        expect(parseSpy).toHaveBeenNthCalledWith(
            1,
            "2d6m6"
        );

        expect(parseSpy).toHaveBeenNthCalledWith(
            2,
            "1d6m-1"
        );
    });

    it("can run three arguments in parseString()", async () => {
        const logSpy = jest.spyOn(console, "log");
        const parseSpy = jest.spyOn(dice, "parseString");

        process.argv.push('2d6m6');
        process.argv.push('1d6m-1');
        process.argv.push('3d6');

        const retVal = await cli();

        expect(logSpy).toBeCalledWith(retVal);
        expect(parseSpy).toHaveBeenNthCalledWith(
            1,
            "2d6m6"
        );

        expect(parseSpy).toHaveBeenNthCalledWith(
            2,
            "1d6m-1"
        );

        expect(parseSpy).toHaveBeenNthCalledWith(
            3,
            "3d6"
        );
    });

    it("can run any number of arguments in parseString()", async () => {
        const logSpy = jest.spyOn(console, "log");
        const parseSpy = jest.spyOn(dice, "parseString");

        process.argv.push('2d6m6');
        process.argv.push('1d6m-1');
        process.argv.push('3d6');
        process.argv.push('4d6');
        process.argv.push('5d6');
        process.argv.push('6d6');

        const retVal = await cli();

        expect(logSpy).toBeCalledWith(retVal);
        expect(parseSpy).toHaveBeenNthCalledWith(
            1,
            "2d6m6"
        );

        expect(parseSpy).toHaveBeenNthCalledWith(
            2,
            "1d6m-1"
        );

        expect(parseSpy).toHaveBeenNthCalledWith(
            3,
            "3d6"
        );
        expect(parseSpy).toHaveBeenNthCalledWith(
            4,
            "4d6"
        );
        expect(parseSpy).toHaveBeenNthCalledWith(
            5,
            "5d6"
        );
        expect(parseSpy).toHaveBeenNthCalledWith(
            6,
            "6d6"
        );
    });

    it("will show usage if any number of arguments is not parseable by parseString()", async () => {
        const logSpy = jest.spyOn(console, "warn");
        const parseSpy = jest.spyOn(dice, "isDiceString");

        process.argv.push('2d6m6');
        process.argv.push('1d6m-1');
        process.argv.push('3');
        process.argv.push('4d6');
        process.argv.push('5d6');
        process.argv.push('6d6');

        const retVal = await cli();

        expect(logSpy).toHaveBeenCalledTimes(1);
        expect(parseSpy).toHaveBeenCalledTimes(6);
        expect(retVal).toEqual(0);
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