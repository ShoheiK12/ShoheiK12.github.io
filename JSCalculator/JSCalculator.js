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
        const result = eval(safeExpression);

        // Update display
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

async function saveHistory(expression, result) {
  await window.addDoc(
    window.collection(window.db, "history"),
    {
      expression: expression,
      result: result,
      createdAt: window.serverTimestamp()
    }
  );
}

/* =========================
  Display history in Modal
========================= */

async function displayHistory() {

  const historyList = document.getElementById("history-list");
  historyList.innerHTML = "";

  const querySnapshot = await window.getDocs(
    window.collection(window.db, "history")
  );

  const now = new Date();
  let history = [];

  querySnapshot.forEach((doc) => {
    const data = doc.data();

    let createdAt;

    if (data.createdAt && typeof data.createdAt.toDate === "function") {
      createdAt = data.createdAt.toDate();
    } else {
      createdAt = new Date(data.createdAt);
    }

    history.push({
      expression: data.expression,
      result: data.result,
      createdAt: createdAt
    });
  });

  // Display only 7 days calc histories
  const last7DaysHistory = history.filter((item) => {
    const diffTime = now - item.createdAt;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays <= 7;
  });

  // Sort by newest
  last7DaysHistory.sort((a, b) => b.createdAt - a.createdAt);

  if (last7DaysHistory.length === 0) {
    historyList.innerHTML = "<p>No calculation history</p>";
    return;
  }
  
  // Display result
  last7DaysHistory.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("history-item");

    div.innerHTML = `<p>${item.expression} = ${item.result}</p>`;

    historyList.appendChild(div);
  });
}


