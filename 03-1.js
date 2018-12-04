(async function () {
    const req = await fetch('https://adventofcode.com/2018/day/3/input');
    input = await req.text();

    const inputs = input.split('\n');
    const claims = inputs.filter(Boolean).map(i => {
        const [match, index, xStart, yStart, xSize, ySize] = i.match(/#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/);
        return { match, index, xStart, yStart, xSize, ySize };
    });

    const fabric = getArray(1000, () => []);
    claims.forEach(claim => {
        const { xStart, yStart, xSize, ySize } = claim;
        getArray(xSize, x => x).map(x => {
            const col = fabric[xStart + x];
            getArray(ySize, y => y).map(y => {
                col[yStart + y] = col[yStart + y] || 0;
                col[yStart + y] += 1;
            });
        }); 
    });

    function getArray (l, m) {
        return Array.from({ length: 1000 }, m);
    }
})();
