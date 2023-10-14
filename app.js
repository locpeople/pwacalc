const PRECISION = 2;

document.addEventListener("DOMContentLoaded", () => {
    const inputbox = document.querySelector(".input");
    const outputbox = document.querySelector(".output");
    inputbox.addEventListener("keyup", () => {
        const lines = inputbox.value.split("\n");
        try {
            const results = math.evaluate(lines)
                .map(x => x.toString())
                .join("\n");

            outputbox.value = results;

               
        }
        catch (e) { }
    })
})