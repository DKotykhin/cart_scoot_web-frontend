export const formatTime = (time: number) => {
    if (!time) return 0;

    const splitTime = time.toString().split(".");

    const validMinutes =
        splitTime[1] === undefined
            ? ""
            : splitTime[1]?.length === 1
            ? ":" + splitTime[1] + "0"
            : ":" + splitTime[1];

    const validHour = +splitTime[0] > 12 ? +splitTime[0] - 12 : splitTime[0];
    const validSuffix = +splitTime[0] > 12 ? "PM" : "AM";

    const validTime = validHour + validMinutes + " " + validSuffix;

    return validTime;
};
