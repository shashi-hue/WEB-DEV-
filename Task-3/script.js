
const questions = [
  {
    question: "Which language is used for web development?",
    options: ["Python", "JavaScript", "C++", "Java"],
    answer: "JavaScript"
  },
  {
    question: "What does HTML stand for?",
    options: ["HighText Machine Language", "HyperText Markup Language", "Home Tool Markup Language", "HyperTransfer Markup Language"],
    answer: "HyperText Markup Language"
  },
  {
    question: "What year was JavaScript created?",
    options: ["1995", "2000", "1985", "1990"],
    answer: "1995"
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const scoreEl = document.getElementById("score");

function showQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  answersEl.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => checkAnswer(option);
    answersEl.appendChild(btn);
  });
}

function checkAnswer(selected) {
  const correct = questions[currentQuestion].answer;
  if (selected === correct) {
    score++;
  }

  nextBtn.style.display = "inline-block";
  document.querySelectorAll("#answers button").forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correct) {
      btn.style.background = "lightgreen";
    } else if (btn.textContent === selected) {
      btn.style.background = "lightcoral";
    }
  });
}

nextBtn.onclick = () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
    nextBtn.style.display = "none";
  } else {
    showScore();
  }
};

function showScore() {
  questionEl.textContent = "Quiz Completed!";
  answersEl.innerHTML = "";
  nextBtn.style.display = "none";
  scoreEl.textContent = `You scored ${score} out of ${questions.length}`;
}

showQuestion();



function getJoke() {
  fetch("https://official-joke-api.appspot.com/random_joke")
    .then(res => res.json())
    .then(data => {
      document.getElementById("setup").textContent = data.setup;
      document.getElementById("punchline").textContent = data.punchline;
    })
    .catch(err => {
      document.getElementById("setup").textContent = "Oops! Couldn't fetch a joke.";
      document.getElementById("punchline").textContent = "";
    });
}
