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

let currentQuestion = 0;
let score = 0;
let startTime = Date.now();

const container = document.getElementById("quiz-container");
const submitBtn = document.getElementById("submit");
const resultDiv = document.getElementById("result");

function loadQuestion(index) {
  const q = questions[index];
  container.innerHTML = `
    <p class="text-xl font-medium">${q.question_ar}</p>
    ${q.options_ar.map((opt, i) => `
      <div>
        <label>
          <input type="radio" name="answer" value="${i}" class="mr-2" />
          ${opt}
        </label>
      </div>
    `).join('')}
  `;
}

submitBtn.onclick = () => {
  const selected = document.querySelector('input[name="answer"]:checked');
  if (!selected) return alert("الرجاء اختيار إجابة");

  const timeTaken = (Date.now() - startTime) / 1000;
  const isCorrect = parseInt(selected.value) === questions[currentQuestion].answer;
  const questionScore = isCorrect ? Math.max(0, 100 - timeTaken * 5) : 0;

  score += questionScore;

  currentQuestion++;
  if (currentQuestion < questions.length) {
    startTime = Date.now();
    loadQuestion(currentQuestion);
  } else {
    container.innerHTML = "";
    submitBtn.remove();
    resultDiv.textContent = `النتيجة: ${Math.round(score)} من ${questions.length * 100}`;