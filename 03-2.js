(async function () {
    const canvas = document.createElement('canvas');
    canvas.width = 1000;
    canvas.height = 1000;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const colors = [null, 'red', 'blue', 'green', 'yellow', 'orange'];

    const req = await fetch('https://adventofcode.com/2018/day/3/input');
    input = await req.text();

    const inputs = input.split('\n');
    const claims = inputs.filter(Boolean).map(i => {
        const [, index, xStart, yStart, xSize, ySize] = i.match(/#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/).map(Number);
        return { index, xStart, yStart, xSize, ySize };
    });

    const fabric = getArray(1000, () => []);
    claims.forEach(claim => {
        const { xStart, yStart, xSize, ySize } = claim;
        getArray(xSize, (_, x) => x).map(x => {
            const realX = xStart + x;
            const col = fabric[realX];
            getArray(ySize, (_, y) => y).map(y => {
                const realY = yStart + y;
                col[realY] = col[realY] || 0;
                col[realY] += 1;
                ctx.fillStyle = colors[col[realY]];
                ctx.fillRect(realX, realY, 1, 1);
            });
        }); 
    });

    const overlapping = fabric.flat().filter(i => i > 1).length;
    console.log(overlapping);

    const notOverlapped = claims.filter(claim => {
        const { xStart, yStart, xSize, ySize } = claim;
        const cols = fabric.slice(xStart, xStart + xSize);
        const cells = cols.reduce((cells, col) => cells.concat(col.slice(yStart, yStart + ySize)), []);
        return !cells.find(cell => cell > 1);
    });
    console.log(notOverlapped);

    function getArray (l, m) {
        return Array.from({ length: l }, m);
    }

})();
