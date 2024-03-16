const PRECISION = 2;
const parser = math.parser();

document.addEventListener("DOMContentLoaded", () => {
    const inputbox = document.querySelector(".input");
    const outputbox = document.querySelector(".output");
    const lines = window.localStorage.getItem("lines");
    if (lines) {
        const parsedLines = JSON.parse(lines);
        inputbox.value = parsedLines.join("\n");
        outputbox.value = getResults(parsedLines);
    }

    inputbox.addEventListener("keyup", () => {
        const lines = inputbox.value.split("\n");
        outputbox.value = getResults(lines);
        window.localStorage.setItem("lines", JSON.stringify(lines));
    })
})

function getResults(lines) {
    parser.clear();
    let results = "";
    lines.forEach(line => {
        try {
            const result = parser.evaluate(line);
            results = results + result.toString() + "\n";
        }
        catch (e) {
            results += "\n"
        }
    });
    return results;
}