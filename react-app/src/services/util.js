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
    // Priority ranges from 1 - 4. 5-8 are for dark mode

    switch(level) {
        case 8:
            return "red.500"
        case 7:
            return "yellow.500"
        case 6:
            return "blue.500"
        case 5:
            return "gray.600"
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

export function determineMusicBarPercent(currentTime, songDuration) {
    const percent = Math.floor(currentTime/songDuration * 100);
    const cssPercent = Math.floor(percent * .95) + 2
    return cssPercent + "%";
}