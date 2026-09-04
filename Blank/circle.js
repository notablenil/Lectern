const innerCount = document.getElementById("countInput");
const innerLabels = document.getElementById("countInputText");
const outerCount = document.getElementById("outerCount");
const outerLabels = document.getElementById("outerCountText");
const innerOrder = document.getElementById("innerOrder");
const outerOrder = document.getElementById("outerOrder");
const selection = document.getElementById("modeSelect"); 

const errorMessage = document.getElementById("error");
innerCount.value = 16;
outerCount.value = 16;
let useLabelsInside = false;
let useLabelsOutside = false;

innerCount.addEventListener('input', (event) => {
    const num = Number(innerCount.value);
    if (innerCount.value.trim() === '' || Number.isNaN(num)) innerCount.value = 0;
    circle.ic = innerCount.value;
    useLabelsInside = false;
    circle.mode(selection.value);
    
});
outerCount.addEventListener('input', (event) => {
    const num = Number(outerCount.value);
    if (outerCount.value.trim() === '' || Number.isNaN(num)) outerCount.value = 0;
    circle.oc = outerCount.value;
    useLabelsOutside = false;
    circle.mode(selection.value);
});
innerLabels.addEventListener('input', (event) => {
    const raw = innerLabels.value.trim();
    let values = raw === '' ? [] : raw.split(/\s+/);
    innerCount.value = values.length;
    circle.ic = innerCount.value;
    circle.il = values;
    useLabelsInside = true;
    circle.mode(selection.value);
});
outerLabels.addEventListener('input', (event) => {
    const raw = outerLabels.value.trim();
    let values = raw === '' ? [] : raw.split(/\s+/);
    outerCount.value = values.length;
    circle.oc = outerCount.value;
    circle.ol = values;
});
innerOrder.addEventListener('input', (event) => {
    const raw = innerOrder.value.trim();
    let values = raw === '' ? [] : raw.split(/\s+/);
    circle.io = values;
    circle.mode(selection.value);
});
outerOrder.addEventListener('input', (event) => {
    const raw = outerOrder.value.trim();
    let values = raw === '' ? [] : raw.split(/\s+/);
    circle.oo = values;
    circle.mode(selection.value);
});
class node {
    x = 0.0;
    y = 0.0;
    constructor(X, Y) {
        this.x = X;
        this.y = Y;
    }
}


class circleType {
    ic = 16;
    il = [""];
    oc = 16;
    ol = [""];
    io = [""];
    oo = [""];
    s = 0;
    innerNodes = new Map();
    outerNodes = new Map();
    mode(mode) {
        switch (mode) {
            case ("0"):
                circle.clockwise();
                break;
            case ("1"):
                circle.planar();
                break;
            default:
                break;
        }
        loop();
    }

    clockwise() {
        console.log("cloclwise has been called");
        this.innerNodes = new Map();
        this.innerNodes.set("origin", origin);
        let max = this.ic;
        let small = 320;

        if (!useLabelsInside) {
            
            for (let i = 1; i <= max; i++) {
                this.innerNodes.set("" + i, new node(
                    intWidth / 2 + small * Math.sin(Math.PI * 2 * (i - 1) / max), intHeight / 2 + small * Math.cos(Math.PI * 2 * (i - 1) / max)
                ));
                this.il[i - 1] = i;
            }
        } else {
            for (let i = 0; i < max; i++) {
                this.innerNodes.set(this.il[i], new node(
                    intWidth / 2 + small * Math.sin(Math.PI * 2 * i / max), intHeight / 2 + small * Math.cos(Math.PI * 2 * i / max)
                ));
            }
        }

    }
    planar() {

    }
}
let errorMessageText = "no errors";
function update(){
    radiusMax = intHeight;
    if (intWidth < radius) radiusMax = intWidth;
    radiusMax = radiusMax / 2;
    radius = radiusMax * 0.75;
    errorMessage.innerHTML = "Interior Count:" + circle.ic + "<br>Interior Labels:" + circle.il + "<br>Outer Count:" + circle.oc + "<br>Outer Labels:" + circle.ol + "<br>Interior Order:" + circle.io + "<br>Outer Order:" + circle.oo
        + "<br>" + errorMessageText;
}
const size = 10;
function drawCircle(node, index) {
    ctx.beginPath();
    ctx.arc( node.x,  node.y, size, 0, 2 * Math.PI);
    ctx.stroke();
}
function sketch(name, order) {
    let node = circle.innerNodes.get(name);
    if (node !== undefined) {
        console.log(name + " found at x:"+node.x+" y:"+node.y);

        ctx.lineTo(node.x, node.y);

    } else errorMessageText = "undefined node later";

}
function draw() {
    ctx.fillStyle = "rgb(255 255 255)";
    ctx.fillRect(0, 0, intWidth, intHeight);
    ctx.fillStyle = "rgb(0 0 0)";
    ctx.beginPath();
    ctx.arc(intWidth / 2, intHeight / 2, radius, 0, 2 * Math.PI);
    ctx.stroke();
    circle.innerNodes.forEach(drawCircle);
    //console.log("Moving to " + circle.il[0]);
    if (!useLabelsInside) {
        usednode = circle.innerNodes.get(circle.il[0]);
        if (usednode !== undefined) {
            ctx.moveTo(usednode.x, usednode.y);
            ctx.beginPath();
            circle.io.forEach(sketch);
            ctx.stroke();
        } else {
            errorMessageText = "undefined node earlier";
        }
    } else {
        usednode = circle.innerNodes.get(circle.il[0]);
        if (usednode !== undefined) {
            ctx.moveTo(usednode.x, usednode.y);
            ctx.beginPath();
            circle.io.forEach(sketch);
            ctx.stroke();
        } else {
            errorMessageText = "undefined node earlier";
        }
    }
}

function loop() {
    errorMessageText = "";
    update();
    draw();
    //requestAnimationFrame(loop);
}

const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");
const intWidth = canvas.width;
const intHeight = canvas.height;
let radiusMax = 100;
let radius = 100;

let circle = new circleType();
let origin = new node(intWidth/2, intHeight/2);
circle.innerNodes.set("origin",origin);
circle.mode(0);

requestAnimationFrame(loop);