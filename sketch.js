class Nodes {
    constructor() {
        this.nodes = [];
        this.nodeCount = 0;
    }
    Push(node) {
        console.log("pushed" + node.ind);
        node.ind = this.nodeCount;
        this.nodes.push(node);
        this.nodeCount++;
    }
    Chain(node,link,length,reciprocate = true) {
        this.Push(node);
        node.Connect(link, length, reciprocate);
    }
    ChainToLast(node, length,reciprocate = true) {
        this.Push(node);
        node.Connect(this.nodes[this.nodeCount - 2], length, reciprocate);
    }
    CreateChained(position,number) {
        if (number == 0) return;
        this.Push(new Node(position, this.nodeCount));
        
        let loop = 0;
        let displacement = new vector3(20, 0, 0);
        let newPos = position;
        while (loop < number) {
            console.log("created"+loop);
            newPos = newPos.add(displacement);
            nodes.ChainToLast(new Node(newPos, this.nodeCount),20,true);
            loop++;
        }
    }
}

class vector3 {
    constructor(x, y, z) {
        this.struct = new Float32Array(3);
        this.struct[0] = x;
        this.struct[1] = y;
        this.struct[2] = z;
    }

    x() { return this.struct[0]; }
    y() { return this.struct[1]; }
    z() { return this.struct[2]; }

    length() {
        return (Math.sqrt((this.x()) ** 2 + (this.y()) ** 2 + (this.z()) ** 2));
    }
    distance(start) {
        return (Math.sqrt((this.x() - start.x()) ** 2 + (this.y() - start.y()) ** 2 + (this.z() - start.z()) ** 2));
    }
    displacement(start) {
        return (new vector3(this.x() - start.x(), this.y() - start.y(), this.z() - start.z()));
    }

    add(vector) {
        let x = vector.x() + this.x();
        let y = vector.y() + this.y();
        let z = vector.z() + this.z();
        return (new vector3(x, y, z));
    }

    mult(sf) {
        let x = this.x() * sf;
        let y = this.y() * sf;
        let z = this.z() * sf;
        return (new vector3(x, y, z));
    }
    normalise() {
        let scale = this.length();
        return this.mult(1 / scale);
    }
    cross(vector) {
        let x = this.y() * vector.z() - this.z() * vector.y();
        let y = -(this.x() * vector.z() - this.z() * vector.x());
        let z = this.x() * vector.y() - this.y() * vector.x();
        return (new vector3(x, y, z));
    }
    dot(vector) {
        return (this.x() * vector.x() + this.y() * vector.y() + this.z() * vector.z());
    }

}


class vector4 {
    constructor(a, b, c, d) {
        this.struct = new Float32Array(4);
        this.struct[0] = a;
        this.struct[1] = b;
        this.struct[2] = c;
        this.struct[3] = d;
    }

    a() { return this.struct[0]; }
    b() { return this.struct[1]; }
    c() { return this.struct[2]; }
    d() { return this.struct[3]; }
    A(a) { this.struct[0] = a }
    B(b) { this.struct[1] = b }
    C(c) { this.struct[2] = c }
    D(d) { this.struct[3] = d }

    add(vector) {
        let loop = 0;
        let result = [];
        while (loop < 4) {
            result.push(this.struct[loop] + vector.struct[loop]);
        }
        return new Vector4(result[0],result[1],result[2],result[3]);
    }
    add(vector) {
        let loop = 0;
        let result = [];
        while (loop < 4) {
            result.push(this.struct[loop] + vector.struct[loop]);
        }
        return result;
    }
    mult(sf) {
        let loop = 0;
        let result = [];
        while (loop < 4) {
            result.push(this.struct[loop] * sf);
        }
        return new vector4(result[0], result[1], result[2], result[3]);
    }

}
class matrix4 {
    constructor() {
        this.struct = new Float32Array(16);
        this.struct.fill(0);
    }
    identify() {
        this.struct.fill(0);
        this.struct[0] = this.struct[5] = this.struct[10] = this.struct[15] = 1;
        return this;
    }
    //in multiplication, this matrix is the one on the left
    mMult(matrix) {
        let loop = 0;
        let result = new Float32Array(16);
        for (let row = 0; row < 4; row++) {
            for (let column = 0; column < 4; column++) {
                let temp = 0;
                for (let operation = 0; operation < 4; operation++) {
                    temp += this.struct[4 * row + operation] * matrix.struct[4 * (operation) + column];
                }
                result[row * 4 + column] = temp;
            }
        }
        let output = new matrix4();
        output.struct = result;
        return output;
    }
    vMult(vector) {
        let loop = 0;
        let result = new Float32Array(4);
        for (let row = 0; row < 4; row++) {

            let temp = 0;
            for (let operation = 0; operation < 4; operation++) {
                temp += this.struct[4 * row + operation] * vector.struct[operation];
            }
            result[row] = temp;

        }
        let output = new vector4();
        output.struct = result;
        return output;
    }
    inverse() {
        const m = this.struct;
        const out = new Float32Array(16);

        const b00 = m[0] * m[5] - m[1] * m[4];
        const b01 = m[0] * m[6] - m[2] * m[4];
        const b02 = m[0] * m[7] - m[3] * m[4];
        const b03 = m[1] * m[6] - m[2] * m[5];
        const b04 = m[1] * m[7] - m[3] * m[5];
        const b05 = m[2] * m[7] - m[3] * m[6];
        const b06 = m[8] * m[13] - m[9] * m[12];
        const b07 = m[8] * m[14] - m[10] * m[12];
        const b08 = m[8] * m[15] - m[11] * m[12];
        const b09 = m[9] * m[14] - m[10] * m[13];
        const b10 = m[9] * m[15] - m[11] * m[13];
        const b11 = m[10] * m[15] - m[11] * m[14];

        const det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

        if (Math.abs(det) < 1e-10) return null;

        const inv = 1 / det;

        out[0] = (m[5] * b11 - m[6] * b10 + m[7] * b09) * inv;
        out[1] = (m[2] * b10 - m[1] * b11 - m[3] * b09) * inv;
        out[2] = (m[13] * b05 - m[14] * b04 + m[15] * b03) * inv;
        out[3] = (m[10] * b04 - m[9] * b05 - m[11] * b03) * inv;
        out[4] = (m[6] * b08 - m[4] * b11 - m[7] * b07) * inv;
        out[5] = (m[0] * b11 - m[2] * b08 + m[3] * b07) * inv;
        out[6] = (m[14] * b02 - m[12] * b05 - m[15] * b01) * inv;
        out[7] = (m[8] * b05 - m[10] * b02 + m[11] * b01) * inv;
        out[8] = (m[4] * b10 - m[5] * b08 + m[7] * b06) * inv;
        out[9] = (m[1] * b08 - m[0] * b10 - m[3] * b06) * inv;
        out[10] = (m[12] * b04 - m[13] * b02 + m[15] * b00) * inv;
        out[11] = (m[9] * b02 - m[8] * b04 - m[11] * b00) * inv;
        out[12] = (m[5] * b07 - m[4] * b09 - m[6] * b06) * inv;
        out[13] = (m[0] * b09 - m[1] * b07 + m[2] * b06) * inv;
        out[14] = (m[13] * b00 - m[12] * b03 - m[14] * b01) * inv; 
        out[15] = (m[8] * b03 - m[9] * b01 + m[10] * b00) * inv;
        let output = new matrix4();
        output.struct = out;
        return output;
    }
}


class Connection {
    constructor(target, length) {
        this.node = target;
        this.radius = length;
    }
    Greet(start) {
        this.node.visited = true;
        this.Cut(start);
        this.node.Visit();
    }
    Cut(start) {
        let displacement = this.node.pos.displacement(start.pos);
        let distance = displacement.length();
        let scaleFactor = this.radius / distance;
        this.node.pos = start.pos.add(displacement.mult(scaleFactor));
    }
}

class Node {
    constructor(position,index) {
        this.ind = index;
        this.pos = position;
        this.connections = [];
        this.conCount = 0;
        this.visited = false;
        this.scale = 10;
        this.cachedScreenX = 0;
        this.cachedScreenY = 0;
        this.cachedDepth = 0;
    }
    Visit() {
        let loop = 0;
        while (loop < this.conCount) {
            if (!this.connections[loop].node.visited) {
                drawLine(this, this.connections[loop].node)
                this.connections[loop].Greet(this);
            }
            loop++;
        }
    }
    Connect(node,length,reciprocate) {
        this.connections.push(new Connection(node,length));
        this.conCount++;
        if (reciprocate) {
            node.Connect(this, length, false);
        }
    }
    Shake() {
        this.visited = false;
    }
    Zero() {
        this.pos = new vector3(0, 0, 0);
    }
}
class Bone extends Node{
    constructor(position, index) {
        super(position, index);
        this.primary = new Vector3();
        this.secondary = new Vector3();
    }
}

class Renderer {
    constructor() {
        this.lookdown = "free";
        this.fov = 60;
        this.aspect = intWidth / intHeight;
        this.far = 100;
        this.near = 1;
        this.pitch = 0;
        this.yaw = 0;
        this.pos = new vector3(0, 0, 0);
        this.projection = new matrix4();
        this.vpCache = new matrix4();
        this.depthConst = intHeight / (2 * Math.tan(this.fov/180*Math.PI / 2));
    }
    Fov() {
        return (this.fov / 180 * Math.PI);
    }
    build() {
        let f = 1 / Math.tan(this.Fov()/2);
        this.projection.struct[0] = f/this.aspect;
        this.projection.struct[5] = f;
        this.projection.struct[10] = (this.far + this.near) / (this.near - this.far);
        this.projection.struct[11] = (2 * this.far * this.near) / (this.near - this.far);
        this.projection.struct[14] = -1;
        this.projection.struct[15] = 0;
        this.depthConst = intHeight / (2 * Math.tan(this.fov / 180 * Math.PI / 2));
    }
    lookAtAuto() {
        let target = new vector3(
            this.pos.x() + Math.cos(this.pitch) * Math.sin(this.yaw),
            this.pos.y() + Math.sin(this.pitch),
            this.pos.z() + Math.cos(this.pitch) * Math.cos(this.yaw)
        );
        let up = new vector3(0, 1, 0);
        //console.log("about to return");
        return this.lookAt(this.pos, target, up);
    }
    lookAt(eye,target,up) {
        let forward = eye.displacement(target).normalise();
        let right = forward.cross(up).normalise();
        let camUp = right.cross(forward).normalise();
        this.forward = forward;
        this.right = right;
        this.camUp = camUp;

        let result = new matrix4();
        result.struct[0] = right.x();
        result.struct[1] = right.y();
        result.struct[2] = right.z();
        result.struct[3] = -right.dot(eye);

        result.struct[4] = camUp.x();
        result.struct[5] = camUp.y();
        result.struct[6] = camUp.z();
        result.struct[7] = -camUp.dot(eye);

        result.struct[8] = forward.x();
        result.struct[9] = forward.y();
        result.struct[10] = forward.z();
        result.struct[11] = -forward.dot(eye);

        result.struct[15] = 1;
        return result;
    }
    model(pos) {
        let result = new matrix4();
        result.identify();
        result.struct[3] = pos.x();
        result.struct[7] = pos.y();
        result.struct[11] = pos.z();
    }
}

class State {
    constructor() {
        this.dragEnabled = true;
        this.selectedNode = 0;
        this.nodeSpeed = 2;
        this.camSpeed = 3;
        this.rotationSpeed = Math.PI / 180;
    }
}

function drawLine(start, finish){
    
    ctx.beginPath();
    if (renderer.lookdown == "z") {
        ctx.moveTo(start.pos.x(), start.pos.y());
        ctx.lineTo(finish.pos.x(), finish.pos.y());
    } else if (renderer.lookdown == "x") {
        ctx.moveTo(start.pos.z(), start.pos.y());
        ctx.lineTo(finish.pos.z(), finish.pos.y());
    } else if (renderer.lookdown == "y") {
        ctx.moveTo(start.pos.x(), start.pos.z());
        ctx.lineTo(finish.pos.x(), finish.pos.z());
    }
    ctx.stroke();
}

function draw() {
    if (!canvas.getContext)
        return;
    ctx.fillStyle = "rgb(255 255 255)";
    ctx.fillRect(0, 0, intWidth, intHeight);
    let loop = 1;
    ctx.fillStyle = "rgb(0,0,0)";
    

    while (loop < nodes.nodeCount) {

        let active = nodes.nodes[loop];
        if (loop != 1) {
            let past = nodes.nodes[loop - 1];
            drawLine(past, active);
        }

        ctx.beginPath();

        if (renderer.lookdown == "z")
            ctx.arc(active.pos.x(), active.pos.y(), 1.1 ** (0.01 * active.pos.z()), 0, 2 * Math.PI);
        else if (renderer.lookdown == "x")
            ctx.arc(active.pos.z(), active.pos.y(), 1.1 ** (0.01 * active.pos.x()), 0, 2 * Math.PI);
        else if (renderer.lookdown == "y")
            ctx.arc(active.pos.x(), active.pos.z(), 1.1 ** (0.01 * active.pos.y()), 0, 2 * Math.PI);

        else if (renderer.lookdown == "free") {

            let position = new vector4(active.pos.x(), active.pos.y(), active.pos.z(), 1);
            let effectivePos = renderer.vpCache.vMult(position);
            let screenX = intWidth*(effectivePos.a() / effectivePos.d()+1)/2;
            let screenY = intHeight * (effectivePos.b() / effectivePos.d() + 1) / 2;
            if (effectivePos.c() > 0) {
                if (active.ind == drag.activeInd) ctx.strokeStyle = "rgb(255 0 0)";
                else ctx.strokeStyle = "rgb(0 0 0 )";
                ctx.arc(screenX, screenY, renderer.depthConst * active.scale / effectivePos.d(), 0, 2 * Math.PI);
            }
            active.cachedScreenX = screenX;
            active.cachedScreenY = screenY;
            active.cachedDepth = effectivePos.d();
        }

        ctx.stroke();
        loop++;
    }
}



function update() {

    inputs();

    if (renderer.lookdown == "free") {
        renderer.view = renderer.lookAtAuto();
        renderer.vpCache = renderer.projection.mMult(renderer.view);
    }

    let loop = 0;
    trash.Zero();
    while (loop < nodes.nodeCount) {
        nodes.nodes[loop].Shake();
        loop++;
    }

    let i = state.selectedNode;
    
    movementSimple(i);
    movementDrag(i);
    cameraMovement();

    nodes.nodes[i].visited = true;
    nodes.nodes[i].Visit();
}
function inputs() {
    
}

function movementSimple(i) {
    let speed = state.nodeSpeed;
    let x = 0;
    let y = 0;
    let z = 0;
    if (keys['a']) x -= speed;
    if (keys['d']) x += speed;
    if (keys['w']) y -= speed;
    if (keys['s']) y += speed;
    if (keys['q']) z -= speed;
    if (keys['e']) z += speed;
    nodes.nodes[i].pos = nodes.nodes[i].pos.add(renderer.right.mult(x)).add(renderer.camUp.mult(y)).add(renderer.forward.mult(z));
}
function getCanvasCoordinates(event, canvas) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
        x: (event.clientX - rect.left) * scaleX,
        y: (event.clientY - rect.top) * scaleY
    };
}
class DragStorage {
    constructor() {
        this.activeInd = 0;
        this.isDragging = false;
        this.lastMousePos = new vector3();
        this.mouse = new vector3();
        
    }
}
function movementDrag() {
    if (!mouseDown) {
        drag.isDragging = false;
        return;
    };

    drag.lastMousePos = drag.mouse;
    drag.mouse = new vector3(mousePos.x, mousePos.y, 0);

    if (drag.isDragging) {
        let move = drag.mouse.displacement(new vector3(drag.x.cachedScreenX,drag.x.cachedScreenY,0)).mult(drag.x.cachedDepth / renderer.depthConst);
        let moveInPlane = new vector3(0, 0, 0);
        moveInPlane = moveInPlane.add(renderer.right.mult(move.x())).add(renderer.camUp.mult(move.y()));
        drag.lastMousePos = drag.mouse;
        drag.x.pos = drag.x.pos.add(moveInPlane);
    }
    else {
        drag.isDragging = true;
        drag.x = nodes.nodes[0];
        let dist = 25;
        for (let i = 0; i < nodes.nodeCount; i++) {
            let active = nodes.nodes[i];
            let tempPos = new vector3(active.cachedScreenX, active.cachedScreenY, 0);
            let tempDist = tempPos.distance(drag.mouse);
            if (tempDist < dist) {
                dist = tempDist;
                drag.x = nodes.nodes[i];

            }
        }
        drag.activeInd = drag.x.ind;
        state.selectedNode = drag.activeInd;

        console.log(drag.x.ind);
    }
}
function cameraMovement() {
    let speed = state.camSpeed;
    let pan = state.rotationSpeed;

    if (keys['z']) renderer.lookdown = "z";
    if (keys['x']) renderer.lookdown = "x";
    if (keys['y']) renderer.lookdown = "y";
    if (keys['f']) renderer.lookdown = "free";
    if (renderer.lookdown != "free") return;

    if (keys['ArrowLeft']) renderer.pos = renderer.pos.add(renderer.right.mult(-speed));
    if (keys['ArrowRight']) renderer.pos = renderer.pos.add(renderer.right.mult(speed));
    if (keys['ArrowUp']) renderer.pos = renderer.pos.add(renderer.forward.mult(-speed));
    if (keys['ArrowDown']) renderer.pos = renderer.pos.add(renderer.forward.mult(speed));
    if (keys['j']) renderer.pos = renderer.pos.add(renderer.camUp.mult(speed));
    if (keys['k']) renderer.pos = renderer.pos.add(renderer.camUp.mult(-speed));
    if (keys['v']) renderer.pitch -= pan;
    if (keys['b']) renderer.pitch += pan;
    if (keys['n']) renderer.yaw -= pan;
    if (keys['m']) renderer.yaw += pan;
    if (keys['o']) {
        renderer.fov -= 1;
        renderer.build();
    }
    if (keys['p']) {
        renderer.fov += 1;
        renderer.build();
    }

}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");
const intWidth = canvas.width;
const intHeight = canvas.height;
let mouseDown = false;
let mousePos = { x: 0, y: 0 };
const keys = {};
window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});
window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});
canvas.addEventListener('mousemove', (e) => {
    mousePos = getCanvasCoordinates(e, canvas);
    //console.log(`Mouse X: ${mousePos.x}, Y: ${mousePos.y}`);
});
canvas.addEventListener('mousedown', (e) => {
    mouseDown = true;
    console.log("Mouse down");

});
canvas.addEventListener('mouseup', (e) => {
    mouseDown = false;
    console.log("Mouse up");

});

const nodes = new Nodes();
const state = new State();
const renderer = new Renderer();
const drag = new DragStorage();
renderer.build();
let trash = new Node(0, 0, 0);
nodes.Push(trash);
nodes.CreateChained(new vector3(0, 0, 100), 20);
requestAnimationFrame(loop);