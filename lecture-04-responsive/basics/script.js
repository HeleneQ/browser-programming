// Ex1

const btnName = document.getElementById("btnName");
const nameOut = document.getElementById("nameOut");

btnName.onclick = function () {
    nameOut.innerText = "Helene";
};

//Ex2

const btnToggle = document.getElementById("btnToggle");
const toggleOut = document.getElementById("toggleOut");

btnToggle.onclick = function () {
    if (toggleOut.innerText === "OFF") {
        toggleOut.innerText = "ON";
    }
    else {
        toggleOut.innerText = "OFF";
    }
};


//Ex3

const btnBg = document.getElementById("btnBg");
const btnBgReset = document.getElementById("btnBgReset");

btnBg.onclick = function () {
    document.body.style.backgroundColor = "lavender";
}

btnBgReset.onclick = function () {
    document.body.style.backgroundColor = "";
}

//Ex4
let count = 0;
const btnMinus = document.getElementById("btnMinus");
const btnPlus = document.getElementById("btnPlus");
const btnReset = document.getElementById("btnReset");

const counterValue = document.getElementById("counterValue")

btnMinus.onclick = function () {
    count = count - 1;
    renderCount();
}

btnPlus.onclick = function () {
    count = count + 1;
    renderCount();
}

btnReset.onclick = function () {
    count = 0;
    renderCount();
}

function renderCount(){
    counterValue.innerText = string(count);
}

//Ex5

const a = document.getElementById("a")
const b = document.getElementById("b")

const btnAdd = document.getElementById("btnAdd");
const sumOut = document.getElementById("sumOut");

btnAdd.onclick = function () {
    const num1 = Number(a.value);
    const num2 = Number(b.value);
    const sum = num1 + num2;

    sumOut.innerText = "Result: " + sum;
}

//Ex6

const btnHide = document.getElementById("btnHide");
const secret = document.getElementById("secret");

btnHide.onclick = function () {
    if (secret.style.display ==='none') {
        secret.style.display = "block";
    }
    else {
        secret.style.display = "none";
    }
}

//Ex7

const msgInput = document.getElementById("msgInput");
const btnCheck = document.getElementById("btnCheck");
const msgOut = document.getElementById("msgOut");

btnCheck.onclick = function () {
    if (msgInput === "") {
        msgOut.innerText = "Please type something.";
        msgOut.style.color = "crimson";
    }
    else {
        msgOut.innerText = "You typed: " + msgInput;
        msgOut.style.color = "green";
    }
}

//Ex8

const btnHappy = document.getElementById("btnHappy");
const btnSad = document.getElementById("btnSad");
const moodOut = document.getElementById("moodOut");

btnHappy.onclick = function () {
    moodOut.innerText = "Mood: Happy 😊";
    moodOut.style.color = "green";
};

btnSad.onclick = function () {
    moodOut.innerText = "Mood: Sad 😢";
    moodOut.style.color = "blue";
};
