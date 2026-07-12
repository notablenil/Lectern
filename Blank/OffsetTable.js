let offset = 0;
let numberOfItems = 20;
const fileInput = document.getElementById('fileInput');
const countInput = document.getElementById('countInput');
const indexInput = document.getElementById('indexInput');
const indexValue = document.getElementById('indexValue');
const indexButton = document.getElementById('indexButton');
const buttonText = document.getElementById('buttonText');
indexValue.value = 3;
countInput.value = 20;


fileInput.addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const content = e.target.result;
        storage.content = content.split('\n');
        display();
    };
    reader.readAsText(file);
    
});

countInput.addEventListener('input', (event) => {
    const content = event.target.value;
    storage.count = parseInt(content, 10);
    display();
});
indexInput.addEventListener('input', (event) => {
    const content = event.target.value;
    storage.offset = parseInt(content, 10);
    display();
});
indexValue.addEventListener('input', (event) => {
    const content = event.target.value;
    storage.value = parseInt(content, 10);
    buttonText.innerText = "Press me to add " + content + " to the offset!";
});
indexButton.addEventListener('click', (event) => {
    storage.offset += storage.value;
    display();
});

function display() {
    let content = storage.content;
    let max = content.length;
    let offset = storage.offset;
    let count = storage.count;
    document.getElementById('indexInput').value = storage.offset;
    const tbody = document.getElementById('targetBody');
    tbody.innerHTML = '';

    for (let i = 0; i < count; i++) {
        let num = i + offset;
        if (num >= max) {
            num -= max;
            offset -= max;
        }
        if (num < 0) {
            num += max;
            offset += max;
        }
        const row = document.createElement('tr');

        const indexCell = document.createElement('td');
        indexCell.textContent = i + 1;

        const valueCell = document.createElement('td');
        valueCell.textContent = content[num];

        row.appendChild(indexCell);
        row.appendChild(valueCell);
        tbody.appendChild(row);
    }

}


class StorageContainer {
    constructor() {
        this.content = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
        this.offset = 0;
        this.count = 20;
        this.value = 3;
    }
}
let storage = new StorageContainer();

display();