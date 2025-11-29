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

    document.addEventListener("keydown", (e) => {
        if (e.ctrlKey || e.metaKey) {
            if (e.key === 's') {
                e.preventDefault();
                saveToFile();
            } else if (e.key === 'o') {
                e.preventDefault();
                openFromFile();
            }
        }
    });
})

function getResults(lines) {
    parser.clear();
    let results = "";
    lines.forEach(line => {
        line = line.replace(":", "=")
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

function saveToFile() {
    const lines = window.localStorage.getItem("lines");
    if (!lines) return;
    
    const blob = new Blob([lines], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'calculator-notes.pwacalc';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function openFromFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pwacalc';
    
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const lines = e.target.result;
                JSON.parse(lines); // Validate JSON
                
                const inputbox = document.querySelector(".input");
                const outputbox = document.querySelector(".output");
                
                window.localStorage.setItem("lines", lines);
                const parsedLines = JSON.parse(lines);
                inputbox.value = parsedLines.join("\n");
                outputbox.value = getResults(parsedLines);
            } catch (error) {
                alert('Error loading file. Please select a valid calculator file.');
            }
        };
        reader.readAsText(file);
    };
    
    input.click();
}