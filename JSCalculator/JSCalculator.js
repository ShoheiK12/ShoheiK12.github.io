function get_calc(btn) {
  const display = document.calculator.display;

  if (btn.value == "=") {
    const expression = display.value;

    // Check if it is divided by zero or not.
    if (/\/0|÷0/.test(expression)) {
      display.value = "Do not divide by zero";
      display.classList.add("error");
    } else {
      try {
        // ×と÷を計算可能に変換してeval
        const safeExpression = expression.replace(/×/g, "*").replace(/÷/g, "/");
        display.value = eval(safeExpression);
        
        const result = eval(safeExpression);

        display.value = result;

        // Save calculation history
        saveHistory(expression, result);
      } catch (e) {
        display.value = "Error";
      }
    }

  } else if (btn.value == "C") {
    // 末尾1文字を削除
    display.value = display.value.slice(0, -1);
  } else if (btn.value == "AC") {          
    display.value = "";
  } else if (btn.value == "%") {
    if (display.value !== "") {
      display.value = Number(display.value) / 100;
    }

  } else if (btn.className == "float") {
    const dispNum = display.value;
    const lastNumber = dispNum.split(/[\+\-\*\/]/).pop();

    if (lastNumber.includes(".")) return;

    if (dispNum === "" || /[\+\-\*\/]$/.test(dispNum)) {
      display.value += "0.";
    } else {
      display.value += ".";
    }

  } else {
    if (btn.value == "×") {
      btn.value = "*";
    } else if (btn.value == "÷") {
      btn.value = "/";
    } 
    display.value += btn.value;

    // 表示用に元のボタン文字に戻す
    if (btn.value == "*") document.calculator.multi_btn.value = "×";
    if (btn.value == "/") document.calculator.div_btn.value = "÷";
  }
}


/* =========================
  History Modal
========================= */

// Open modal display
const clockButton = document.querySelector(".clock-button");

const historyModal = document.getElementById("history-modal");

clockButton.addEventListener("click", () => {
  displayHistory();
  historyModal.style.display = "flex";
});

// Close modal display
const closeModalButton = document.getElementById("close-modal");

closeModalButton.addEventListener("click", () => {
  document.getElementById("history-modal").style.display = "none";
});

/* =========================
  Save calculation history
========================= */

function getHistory() {
  return JSON.parse(localStorage.getItem("calcHistory")) || [];
}

function saveHistory(expression, result) {
  const history = getHistory();

  const newRecord = {
    expression: expression,
    result: result,
    createdAt: new Date().toISOString()
  };

  history.push(newRecord);

  localStorage.setItem("calcHistory", JSON.stringify(history));
}

/* =========================
  Display history in Modal
========================= */

function displayHistory() {

  const historyList = document.getElementById("history-list");

  // Initialize
  historyList.innerHTML = "";

  const history = getHistory();

  // Current time
  const now = new Date();

  // Retrieve only the calc history from the last 7 days.
  const last7DaysHistory = history.filter((item) => {

    const recordDate = new Date(item.createdAt);

    // Convert to milliseconds
    const diffTime = now - recordDate;

    // Convert to days
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    return diffDays <= 7;
  });

  // Sort by newest
  last7DaysHistory.reverse();

  // If no calc histories
  if (last7DaysHistory.length === 0) {
    historyList.innerHTML = "<p>No calculation history</p>";
    return;
  }

  // Display calc histories
  last7DaysHistory.forEach((item) => {

    const historyItem = document.createElement("div");

    historyItem.classList.add("history-item");

    historyItem.innerHTML = `
      <p>${item.expression} = ${item.result}</p>
    `;

    historyList.appendChild(historyItem);
  });
}


