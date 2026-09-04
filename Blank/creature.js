let costVal = 0;
let count = 0;

class data {
    constructor() {
        this.code = "000000000000000-00-0";
        this.codeA = [...this.code];
        this.cost = 0;
        this.pb = 2;
        this.level = 0;
        this.dType = "Piercing";
        this.attackName = "Bite / Gore"
        this.mainDamage = "1d8";
        this.speed = 30;
    }
    flip(n,button, max = 2) {
        if (this.codeA[n] == '-') return;
        let num = Number(Data.codeA[n]);
        num = (num + 1) % max;
        
        this.codeA[n] = String(num);
        this.code = this.codeA.join("");
        //console.log(this.code);
        code.value = this.code;

        const t = num / (max - 1);
        
        const colour = Math.round(255 * (1 - t));
        //console.log("bouton: "+button,n,max);
        button.style.backgroundColor = 'rgb(255,'+colour+','+colour+')';
        updateStart(n);
    }

}
let Data = new data();
function updateStart(n) {
    //console.log("updating...");
    costVal = 0;
    count = 0;
    Data.codeA.forEach(pinger);
    let message = "";
    if (costVal > 3) message = " << Funds exceeded, remove something!"
    cost.innerHTML = "Cost Spent : " + costVal + "/3" + message;
    
    //console.log("calling "+n);
    update(n);
}
function update(n) {
    let value = Data.codeA[n];
    switch (n) {
        case -1:
            for (let i = 0; i < 15; i++) {
                update(i);
            }
            break;
        case 0:
            switch (value) {
                case "0": Data.dType = "Piercing"; Data.attackName = "Bite"; break;
                case "1": Data.dType = "Slashing"; Data.attackName = "Claw"; break;
                case "2": Data.dType = "Bludgeoning"; Data.attackName = "Slam"; break;
                case "3": Data.dType = "Piercing or Bludgeoning"; Data.attackName = "Ram"; break;
            }
            redo("damage");
            //console.log("redone");
            break;
        case 13:
            redo("defense");
        case 3:
        case 9:
        case 1:
        
            redo("movement");
            break;
        case 14:
            redo("defense");
            break;
        case 2:
        case 6:
        case 8:
        case 11:
        case 12:
            redo("feature");
            break;



    }
}
function pinger(item) {

    if (item == "-" || item == "0" || count==0) {
        count++; return;
    }
    costVal++;
    if (count == "3" || count == "5")
        costVal++;
    count++;
}
function redo(item) {
    switch (item) {
        case "all":
            redo("damage");
            redo("movement");
            redo("defense");
            redo("feature");
            break;
        case "damage":
            damage.innerHTML = "Hit: " + Data.mainDamage + " + " + Data.pb + " " + Data.dType + " Damage";
            title.innerHTML = Data.attackName;
            break;
        case "movement":
            //console.log("redoing speed");
            let speed = Data.speed;
            if (Data.codeA[9] == "1") speed = speed + 10;
            if (Data.codeA[13] == "1") speed = speed - 10;
            let movementVal = "Speed: " + speed + " ft.";
            if (Data.codeA[1] == "1") movementVal = movementVal + ", Swim " + speed + " ft.";
            if (Data.codeA[3] == "1") movementVal = movementVal + ", Fly " + speed + " ft.";
            movement.innerHTML = movementVal;
            break;
        case "defense":
            let value = 10 + Data.pb;
            if (Data.codeA[13] == "1") value += 5;
            ac.innerHTML = "Armor Class : " + value;
            let health = 5 + 4 * Data.level;
            if (Data.codeA[14] == "1") health += (5 + Data.level);
            hp.innerHTML = "Hit Points : " + health;
            break;
        case "feature":
            let feat = "";
            if (Data.codeA[2] == "1") feat = feat + "Blindsight : Your companion gains a Blindsight of 10ft.<br/>";
            if (Data.codeA[6] == "1") feat = feat + "Pack Tactics : Your companion has advantage on an attack roll against a creature if at least one of the beast's allies is within 5 ft. of the creature and the ally isn't incapacitated.<br/>";
            if (Data.codeA[8] == "1") feat = feat + "Pounce/Charge : If the beast moves at least 20 ft. straight towards a creature and then hits it with an attack on the same turn, that target must succeed on a Strength saving throw with a DC equal to your Spell Save DV or be knocked Prone.<br/>"
            if (Data.codeA[11] == "1") feat = feat + "Sneaky : Your Companion gains proficiency in the Stealth and Deception skills.<br/>";
            if (Data.codeA[12] == "1") feat = feat + "Spider Climb : Your companion can climb difficult durfaces, including upside down ceilings, without needing to make an ability check, and ignores movement restrictions caused by webbing/<br/>";
            features.innerHTML = feat;
            break;
    }
}


const code = document.getElementById('code');
/*
code.addEventListener("change", function (event) {
    //console.log(code.value);
    Data.code = code.value;
    Data.codeA = Data.code.split;
    Data.pb = Number(code.value.substring(15, 2));
    console.log(Data.pb);
    updateStart(-1);
})
*/
const cost = document.getElementById('cost');

const damage = document.getElementById('Damage');
const title = document.getElementById('Title');
const movement = document.getElementById('Movement');
const ac = document.getElementById('AC');
const features = document.getElementById('Feature');
const hp = document.getElementById('HP');

const level = document.getElementById('Level');
level.addEventListener("change", function (event) {
    if (level.value == null) level.value = 0;
    Data.level = Number(level.value);
    Data.pb = Math.round((Data.level - 1) / 4) + 2;
    redo("all");
});

const but00 = document.getElementById('00');
but00.addEventListener("click", function (event) {
    Data.flip(0,but00,4);
});
const but01 = document.getElementById('01');
but01.addEventListener("click", function (event) {
    Data.flip(1, but01);
});
const but02 = document.getElementById('02');
but02.addEventListener("click", function (event) {
    Data.flip(2, but02);
});
const but03 = document.getElementById('03');
but03.addEventListener("click", function (event) {
    Data.flip(3, but03);
});
const but04 = document.getElementById('04');
but04.addEventListener("click", function (event) {
    Data.flip(4, but04);
});
const but05 = document.getElementById('05');
but05.addEventListener("click", function (event) {
    Data.flip(5, but05);
});
const but06 = document.getElementById('06');
but06.addEventListener("click", function (event) {
    Data.flip(6, but06);
});
const but07 = document.getElementById('07');
but07.addEventListener("click", function (event) {
    Data.flip(7, but07);
});
const but08 = document.getElementById('08');
but08.addEventListener("click", function (event) {
    Data.flip(8, but08);
});
const but09 = document.getElementById('09');
but09.addEventListener("click", function (event) {
    Data.flip(9, but09);
});
const but10 = document.getElementById('10');
but10.addEventListener("click", function (event) {
    Data.flip(10, but10);
});
const but11 = document.getElementById('11');
but11.addEventListener("click", function (event) {
    Data.flip(11, but11);
});
const but12 = document.getElementById('12');
but12.addEventListener("click", function (event) {
    Data.flip(12, but12);
});
const but13 = document.getElementById('13');
but13.addEventListener("click", function (event) {
    Data.flip(13, but13);
});
const but14 = document.getElementById('14');
but14.addEventListener("click", function (event) {
    Data.flip(14, but14);
});



redo("all");



