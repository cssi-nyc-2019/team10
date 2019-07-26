// QUESTIONS

const questions = [
  {
    "question": "Do you consider your hair as curly?",
    "answer1": "Yes",
    "answer1Total": "1",
    "answer2": "No",
    "answer2Total": "2",
    "answer3": "Somewhat (Wavy)",
    "answer3Total": "3"

  },
  {
    "question": "What hair product(s) do you use to maintain your hair?",
    "answer1": "No product/dry shampoo",
    "answer1Total": "4",
    "answer2": "Oil spray and leave in",
    "answer2Total": "5",
    "answer3": "Leave-in conditioner, styler, gel, and oil",
    "answer3Total": "6"

  },
  {
     "question":
      "What best describes your hair?",
    "answer1": "Straight",
    "answer1Total": "7",
    "answer2": "Wavy",
    "answer2Total": "8",
    "answer3": "Curly and/or Kinky",
    "answer3Total": "9"

  },
  {
    "question": "What best describes your hair?(Only choose one)",
    "answer1": "Waves that are fine, silky, and easy to manage.",
    "answer1Total": "10",
    "answer2": "Wavy hair; shaped waves, gets frizzy but not necessarily bouncy.",
    "answer2Total": "11",
    "answer3":
      "None of the above.",
    "answer3Total": "0"
  },
  {
    "question": "What best describes your hair?(Only choose one)",
    "answer1": "Thick, wavy with a bit more curls. Use of gel is helpful.",
    "answer1Total": "13",
    "answer2": "Well defined curls that are big and loose.",
    "answer2Total": "14",
    "answer3": "None of the above.",
    "answer3Total": "0"
  },
  {
    "question":
      "What best describes your hair?(Only choose one)",
    "answer1":
      "Springy and well defined curls that are a little tighter. Somewhat like a spring.",
    "answer1Total": "16",
    "answer2": "Voluminous curls that are very tight and has a lot of strands.",
    "answer2Total": "17",
    "answer3": "None of the above.",
    "answer3Total": "0"
  },
  {
    "question": "Which best describes your hair?(Only choose one)",
    "answer1": "Tightly coiled hair with an 'S'pattern, wiry or fine textured.",
    "answer1Total": "19",
    "answer2": "Curl pattern is less defined and has more of a 'Z' pattern rather than curls.",
    "answer2Total": "20",
    "answer3": "None of the above.",
    "answer3Total": "0"
  }
]


let currentQuestion = 0;
let score = [];
let selectedAnswersData = [];
const totalQuestions =questions.length;

const container = document.querySelector('.quiz-container');
const questionEl = document.querySelector('.question');
const option1 = document.querySelector('.option1');
const option2 = document.querySelector('.option2');
const option3 = document.querySelector('.option3');
const nextButton = document.querySelector('.next');
const previousButton = document.querySelector('.previous');
const restartButton = document.querySelector('.restart');
const result = document.querySelector('.result');

//Function to generate question 
function generateQuestions (index) {
    //Select each question by passing it a particular index
    const question = questions[index];
    const option1Total = questions[index].answer1Total;
    const option2Total = questions[index].answer2Total;
    const option3Total = questions[index].answer3Total;
    //Populate html elements 
    questionEl.innerHTML = `${index + 1}. ${question.question}`
    option1.setAttribute('data-total', `${option1Total}`);
    option2.setAttribute('data-total', `${option2Total}`);
    option3.setAttribute('data-total', `${option3Total}`);
    option1.innerHTML = `${question.answer1}`
    option2.innerHTML = `${question.answer2}`
    option3.innerHTML = `${question.answer3}`
}


function loadNextQuestion () {
    const selectedOption = document.querySelector('input[type="radio"]:checked');
    //Check if there is a radio input checked
    if(!selectedOption) {
        alert('Please select your answer!');
        return;
    }
    //Get value of selected radio
    const answerScore = Number(selectedOption.nextElementSibling.getAttribute('data-total'));

    ////Add the answer score to the score array
    score.push(answerScore);

    selectedAnswersData.push()
    

    const totalScore = score.reduce((total, currentNum) => total + currentNum);

    //Finally we incement the current question number ( to be used as the index for each array)
    currentQuestion++;

        //once finished clear checked
        selectedOption.checked = false;
    //If quiz is on the final question
    if(currentQuestion == totalQuestions - 1) {
        nextButton.textContent = 'Finish';
    }
    //If the quiz is finished then we hide the questions container and show the results 
    if(currentQuestion == totalQuestions) {
        container.style.display = 'none';
        result.innerHTML =
         `<h1 class="final-score">Your score: ${totalScore}</h1>
         <div class="summary">
            <h1>Summary</h1>
            <p>Your hair type, based on your results/your score: </p>
            <p>13-15:Type 1</p>
            <p>26:Type 2a</p>
            <p>27:Type 2b</p>
            <p>28:Type 2c</p>
            <p>29:Type 3a</p>
            <p>30:Type 3b</p>
            <p>31:Type 3c</p>
            <p>35:Type 4a</p>
            <p>36:Type 4b</p>


        </div>
        <button class="restart">Restart Quiz</button>
         `;
        return;
    }
    generateQuestions(currentQuestion);
}

//Function to load previous question
function loadPreviousQuestion() {
    //Decrement quentions index
    currentQuestion--;
    //remove last array value;
    score.pop();
    //Generate the question
    generateQuestions(currentQuestion);
}

//Fuction to reset and restart the quiz;
function restartQuiz(e) {
    if(e.target.matches('button')) {
    //reset array index and score
    currentQuestion = 0;
    score = [];
    //Reload quiz to the start
    location.reload();
    }

}


generateQuestions(currentQuestion);
nextButton.addEventListener('click', loadNextQuestion);
previousButton.addEventListener('click',loadPreviousQuestion);
result.addEventListener('click',restartQuiz);