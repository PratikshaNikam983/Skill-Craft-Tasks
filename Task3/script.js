const quizData = [
  {
    type: "single",
    question: "Which language runs in the browser?",
    options: ["Java", "C", "JavaScript", "Python"],
    answer: "JavaScript"
  },
  {
    type: "multi",
    question: "Select programming languages:",
    options: ["HTML", "Python", "CSS", "Java"],
    answer: ["Python", "Java"]
  },
  {
    type: "fill",
    question: "HTML stands for ______.",
    answer: "HyperText Markup Language"
  },
  {
    type: "single",
    question: "Which is a CSS framework?",
    options: ["React", "Bootstrap", "Node", "MongoDB"],
    answer: "Bootstrap"
  },
  {
    type: "single",
    question: "Which company developed Java?",
    options: ["Microsoft", "Sun Microsystems", "Google", "Apple"],
    answer: "Sun Microsystems"
  }
];

let currentQ = 0;
let score = 0;
let username = "";

function startQuiz() {
  username = document.getElementById("username").value.trim();
  if (!username) {
    alert("Enter your name!");
    return;
  }

  document.getElementById("start-box").classList.add("hidden");
  document.getElementById("quiz-box").classList.remove("hidden");
  loadQuestion();
}

function loadQuestion() {
  const q = quizData[currentQ];
  document.getElementById("question").innerText = q.question;

  const optionsDiv = document.getElementById("options");
  const inputBox = document.getElementById("fillInput");

  optionsDiv.innerHTML = "";
  inputBox.style.display = "none";

  if (q.type === "single") {
    q.options.forEach(opt => {
      optionsDiv.innerHTML += `
        <label class="option">
          <input type="radio" name="answer" value="${opt}"> ${opt}
        </label>
      `;
    });
  }

  else if (q.type === "multi") {
    q.options.forEach(opt => {
      optionsDiv.innerHTML += `
        <label class="option">
          <input type="checkbox" value="${opt}"> ${opt}
        </label>
      `;
    });
  }

  else if (q.type === "fill") {
    inputBox.style.display = "block";
  }
}

function nextQuestion() {
  const q = quizData[currentQ];

  if (q.type === "single") {
    const selected = document.querySelector('input[name="answer"]:checked');
    if (selected && selected.value === q.answer) score++;
  }

  else if (q.type === "multi") {
    const selected = [...document.querySelectorAll('input[type="checkbox"]:checked')]
      .map(el => el.value);

    if (JSON.stringify(selected.sort()) === JSON.stringify(q.answer.sort())) {
      score++;
    }
  }

  else if (q.type === "fill") {
    const input = document.getElementById("fillInput").value.trim();
    if (input.toLowerCase() === q.answer.toLowerCase()) score++;
  }

  currentQ++;

  if (currentQ < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById("quiz-box").classList.add("hidden");
  document.getElementById("result-box").classList.remove("hidden");
  document.getElementById("score").innerText = score + " / " + quizData.length;
}

function saveScore() {
  let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

  leaderboard.push({ name: username, score: score });

  // Sort descending
  leaderboard.sort((a, b) => b.score - a.score);

  // Keep top 5
  leaderboard = leaderboard.slice(0, 5);

  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

  showLeaderboard();
}

function showLeaderboard() {
  document.getElementById("result-box").classList.add("hidden");
  document.getElementById("leaderboard-box").classList.remove("hidden");

  const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  const list = document.getElementById("leaderboard");

  list.innerHTML = "";

  leaderboard.forEach((player, index) => {
    list.innerHTML += `<li> ${index + 1}. ${player.name} - ${player.score}</li>`;
  });
}

function restartQuiz() {
  currentQ = 0;
  score = 0;

  document.getElementById("leaderboard-box").classList.add("hidden");
  document.getElementById("start-box").classList.remove("hidden");
}