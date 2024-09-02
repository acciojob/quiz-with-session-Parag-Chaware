//your JS code here.
const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

// Save progress in session storage
function saveProgress() {
  for (let i = 0; i < questions.length; i++) {
    const selectedOption = document.querySelector(`input[name="question-${i}"]:checked`);
    if (selectedOption) {
      userAnswers[i] = selectedOption.value;
    }
  }
  sessionStorage.setItem("progress", JSON.stringify(userAnswers));
}

// Calculate and display the score
function calculateScore() {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }
  return score;
}

// Submit the quiz and store the score in local storage
function submitQuiz() {
  saveProgress();
  const score = calculateScore();
  localStorage.setItem("score", score);
  document.getElementById("score").innerText = `Your score is ${score} out of 5.`;
}

// Event listener for submit button
submitButton.addEventListener("click", submitQuiz);

// Save progress whenever a choice is selected
questionsElement.addEventListener("change", saveProgress);

// Render the questions when the page loads
renderQuestions();

// Do not change code below this line
// This code will just display the questions to the screen
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Display the quiz questions and choices
function renderQuestions() {
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);
      if (userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", true);
      }
      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }
    questionsElement.appendChild(questionElement);
  }
}
renderQuestions();
