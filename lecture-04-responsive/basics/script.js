// Ex1

const btnName = document.getElementById("btnName");
const nameOut = document.getElementById("nameOut");
const nameInput = document.getElementById("nameInput")

btnName.onclick = function () {
    const text = nameInput.value.trim();
    if (text === "") {
        alert("Please write your name !")
    } else {
        nameOut.innerText = text;
    }
};

//Ex2

const btnToggle = document.getElementById("btnToggle");

btnToggle.onclick = function () {
    if (btnToggle.innerText === "OFF") {
        btnToggle.innerText = "ON";
        btnToggle.style.backgroundColor ="green";
    }
    else {
        btnToggle.innerText = "OFF";
        btnToggle.style.backgroundColor ="crimson";
    }
};


//Ex3

const btnBg = document.getElementById("btnBg");
const btnBgReset = document.getElementById("btnBgReset");
const btnCardBg = document.getElementById("btnCardBg");
const btnCardBgReset = document.getElementById("btnCardBgReset");

const Card3 = document.getElementById("card3");

btnBg.onclick = function () {
    document.body.style.backgroundColor = "lavender";
}

btnBgReset.onclick = function () {
    document.body.style.backgroundColor = "";
}

btnCardBg.onclick = function () {
    Card3.style.backgroundColor = "pink";
}

btnCardBgReset.onclick = function () {
    Card3.style.backgroundColor = "";
}

//Ex4
let count = 0;
const btnMinus = document.getElementById("btnMinus");
const btnPlus = document.getElementById("btnPlus");
const btnReset = document.getElementById("btnReset");

const counterValue = document.getElementById("counterValue")

function renderCount(){
    counterValue.innerText = String(count);
}

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

renderCount();

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
    const text = msgInput.value.trim();

    if (text === "") {
        msgOut.innerText = "Please type something.";
        msgOut.style.color = "crimson";
    }
    else {
        msgOut.innerText = "You typed: " + text;
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
