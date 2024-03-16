const PRECISION = 2;
const parser = math.parser();

document.addEventListener("DOMContentLoaded", () => {
    const inputbox = document.querySelector(".input");
    const outputbox = document.querySelector(".output");
    inputbox.addEventListener("keyup", () => {
        parser.clear();
        const lines = inputbox.value.split("\n");
        let results = "";
        lines.forEach(line => {
            try {
                const result = parser.evaluate(line);
                results = results + result.toString() + "\n";
            }
            catch(e) { 
                results += "\n"
            } 
        });
        outputbox.value = results;
    })
})