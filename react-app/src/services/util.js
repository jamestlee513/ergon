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

    switch (level) {
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
    const percent = (currentTime / songDuration * 100);
    const cssPercent = ((percent * .95) + 2).toFixed(2);
    return cssPercent + "%";
}

export function digitHourToString(digitHour) {
    if (typeof digitHour !== 'number' || digitHour > 24 || digitHour < 0) {
        throw new Error('Invalid digitHour!');
    }
    if(digitHour === 24) return "12AM"
    let meridiem = "AM";
    if (digitHour > 11) {
        meridiem = "PM";
        digitHour -= 12;
    }
    if (digitHour === 0) {
        return "12" + meridiem;
    } else {
        return digitHour + meridiem;
    }
}

export function getCurrentTimeNumber(dateTime) {
    const timeString = dateTime ? new Date(dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) :
        new Date().toLocaleString([], { hour: '2-digit', minute: '2-digit'});
    const timeComponents = timeString.split(' ');
    const hourAndMin = timeComponents[0].split(':');
    const hour = parseInt(hourAndMin[0], 10);
    const min = parseInt(hourAndMin[1], 10);
    let timeNumber = hour + (min / 60);
    if (timeComponents[1] === "PM" && hour !== 12) timeNumber += 12;
    return timeNumber;
}

export function calculateTimePercent(start, end, currentTimeNumber) {
    const range = end - start;
    const relativeNumber = currentTimeNumber - start;
    const fraction = relativeNumber / range;
    if (fraction > 1 || fraction < 0) return null;
    const percent = (fraction * 100).toFixed(2);
    return percent + "%";
}

export function determineEventCardTime(calendarStart, calendarEnd, time) {
    const timeNum = getCurrentTimeNumber(time);
    const eventTime = calculateTimePercent(calendarStart, calendarEnd, timeNum);
    return eventTime;
}

export function calculateEventCardHeight(calendarStart, calendarEnd, startTime, endTime) {
    const range = calendarEnd - calendarStart;
    const relativeStart = getCurrentTimeNumber(startTime) - calendarStart;
    const relativeEnd = getCurrentTimeNumber(endTime) - calendarStart;
    const fractionStart = relativeStart / range;
    const fractionEnd = relativeEnd / range;
    const fraction = fractionEnd - fractionStart;
    // if (fraction > 1 || fraction < 0) return null;
    const percent = (fraction * 100).toFixed(2);
    return percent + "%";
}

export function dateTimeToInputTime(dateTime) {
    const timeString = new Date(dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const timeMeridiemSplit = timeString.split(' ');
    const hourMinuteSplit = timeMeridiemSplit[0].split(':');
    const [hours, minutes, meridiem] = [parseInt(hourMinuteSplit[0], 10), parseInt(hourMinuteSplit[1], 10), timeMeridiemSplit[1]];
    
    let inputTimeString = '';
    if(meridiem === "PM") {
        inputTimeString += (hours + 12)
    } else {
        if(hours < 10) inputTimeString += "0";
        inputTimeString += hours;
    }
    inputTimeString += ":";
    if(minutes < 10) inputTimeString += "0";
    inputTimeString += minutes;
    return inputTimeString;
}