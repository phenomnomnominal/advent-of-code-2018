const frequencies = frequenciesList.split('\n').map(n => +n);
const values = {};

let sum = 0;
let calibrated = null;

while (calibrated == null) {
    sum = frequencies.reduce(((p, n) => {
        const result = p + n;
        if (values[result]) {
            calibrated = result;
            values[result] += 1;
        } else {
            values[result] = 1;
        }
        return result;
    }), sum);
}

console.log(calibrated);
