const questions = [
  {
    question_ar: "ما هو العدد التالي في التسلسل: 2، 4، 8، 16، ؟",
    options_ar: ["18", "24", "32", "20"],
    answer: 2,
  },
  {
    question_ar: "كم ضلع للمثلث؟",
    options_ar: ["4", "3", "6", "2"],
    answer: 1,
  }
];

let current = 0, score = 0, start = Date.now();

const container = document.getElementById("quiz-container");
const btn = document.getElementById("submit");
const resultDiv = document.getElementById("result");

function loadQuestion() {
  const q = questions[current];
  container.innerHTML = `<div>
    <p class="text-xl">${q.question_ar}</p>` +
    q.options_ar.map((opt, i) => `
      <div><label><input type="radio" name="answer" value="${i}" /> ${opt}</label></div>
    `).join('') + `</div>`;
}

btn.onclick = () => {
  if (btn.textContent === "ابدأ") {
    loadQuestion();
    btn.textContent = "إجابة";
    start = Date.now();
    return;
  }
  const sel = document.querySelector('input[name="answer"]:checked');
  if (!sel) return alert("الرجاء اختيار إجابة");
  const timeSec = (Date.now() - start)/1000;
  if (parseInt(sel.value) === questions[current].answer) {
    score += Math.max(0, 100 - timeSec * 5);
  }
  current++;
  if (current < questions.length) {
    start = Date.now();
    loadQuestion();
  } else {
    container.innerHTML = "";
    btn.remove();
    resultDiv.textContent = `النتيجة: ${Math.round(score)} من ${questions.length * 100}`;
  }
};
