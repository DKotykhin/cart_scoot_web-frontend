export const formatTime = (time: number) => {
    if (!time) return 0;

    const splitTime = time.toString().split(".");

    const validMinutes =
        splitTime[1] === undefined
            ? "00"
            : splitTime[1]?.length === 1
            ? splitTime[1] + "0"
            : splitTime[1];

    const validTime = splitTime[0] + ":" + validMinutes;

    return validTime;
};
