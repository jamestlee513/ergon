export function secondsToTime(seconds) {

    const hours = Math.floor(seconds / 3600);
    seconds = seconds % 3600;
    const minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;

    let timeArray = [];
    if (hours) timeArray.push(hours.toString());
    timeArray.push(minutes > 9 ? minutes.toString() : "0" + minutes.toString());
    timeArray.push(seconds > 9 ? seconds.toString() : "0" + seconds.toString());

    return timeArray.join(":");
}

export function priorityLevelToColor(level) {
    // Priority ranges from 1 - 4

    switch(level) {
        case 4:
            return "red.200"
        case 3:
            return "yellow.100"
        case 2:
            return "blue.100"
        case 1:
            return "gray.200"
        default:
            return new Error();
    }
}