(async function () {
    const req = await fetch('https://adventofcode.com/2018/day/5/input');
    const input = await req.text();

    console.log(react(input.trim()));

    function react (input) {
        const units = input.split('');
        let hasMatch = false;
        for (let i = 0; i < units.length; i = hasMatch ? Math.max(i - 1, 0) : i + 1) {
            const unit = units[i];
            const next = units[i + 1];
            if (next && unit.toLowerCase() === next.toLowerCase() && unit !== next) {
                hasMatch = true;
                units.splice(i, 2);
                continue;
            }
            hasMatch = false;
        }
 
        return units.join('').length;
    }
})();
