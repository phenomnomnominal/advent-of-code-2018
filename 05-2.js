(async function () {
    const req = await fetch('https://adventofcode.com/2018/day/5/input');
    const input = await req.text();
    
    console.log(findShortestPolymer(input.trim()));

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

    function findShortestPolymer (input) {
        const alphabet = new Set(input.toLowerCase());
        let shortest = input.length;
        alphabet.forEach(letter => {
            const without = input.replace(new RegExp(letter, 'g'), '').replace(new RegExp(letter.toUpperCase(), 'g'), '');
            const length = react(without);
            shortest = length < shortest ? length : shortest; 
        });
        return shortest;
    }
})();
