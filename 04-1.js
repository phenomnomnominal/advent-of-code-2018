(async function () {
    const req = await fetch('https://adventofcode.com/2018/day/4/input');
    input = await req.text();

    const inputs = input.split('\n');
    const memo = new Map();
    const guards = {};

    const logs = inputs.filter(Boolean).map(i => {
        const [, date, hour, minute, comment] = i.match(/\[([\d-]+) (\d+):(\d+)\] (.*)/);
        return { date, hour, minute, comment };
    });
    logs.sort((a, b) => {
        const timestampA = getTimestamp(a);
        const timestampB = getTimestamp(b);
        return timestampA - timestampB;
    });

    let guard;
    logs.forEach(log => {
        const [, id] = log.comment.match(/Guard #(\d+)/) || [];
        if (id) {
            guard = id;
        }
        log.minute = +log.minute;
        log.guard = guard;
    });

    logs.forEach(log => {
        const guard = guards[log.guard] || { logs: [], minutes: {}, total: 0 };
        guards[log.guard] = guard;
        guard.logs.push(log);
    });

    Object.keys(guards).forEach(id => {
        const guard = guards[id];
        let fallsAsleep;
        guard.logs.forEach(log => {
            if (log.comment === 'falls asleep') {
                fallsAsleep = log;
            }
            if (log.comment === 'wakes up') {
                getArray(log.minute - fallsAsleep.minute, ((_, i) => i + fallsAsleep.minute)).forEach(minute => {
                    guard.minutes[minute] = guard.minutes[minute] || 0;
                    guard.minutes[minute] += 1;
                    guard.total += 1;
                });
            }
        });
    });

    console.log(guards);
    
    let maxTotal = 0;
    let maxAsleepGuardId;
    Object.keys(guards).forEach(id => {
        const guard = guards[id];
        if (guard.total > maxTotal) {
            maxTotal = guard.total;
            maxAsleepGuardId = id;
        }
    });

    let mostAsleepGuard = guards[maxAsleepGuardId];

    let maxMinuteCount = 0;
    let maxMinute = null;
    Object.keys(mostAsleepGuard.minutes).forEach(minute => {
        let count = mostAsleepGuard.minutes[minute];
        if (count > maxMinuteCount) {
            maxMinuteCount = count;
            maxMinute = minute;
        }
    });

    console.log(maxTotal, maxAsleepGuardId, maxMinute, maxAsleepGuardId * maxMinute);  

    function getTimestamp (log) {
        let date = memo.get(log);
        if (date) { return date; }
        date = new Date(`${log.date} ${log.hour}:${log.minute}`).getTime();
        memo.set(log, date);
        return date;
    }

    function getArray (l, m) {
        return Array.from({ length: l }, m);
    }
})();
