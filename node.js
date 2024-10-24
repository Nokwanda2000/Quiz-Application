const readline = require('readline');

// JavaScript quiz questions and answers
const quiz = [
    { question: 'Which type of variable is NOT block-scoped?', options: ['a) var', 'b) let', 'c) const', 'd) all are block-scoped'], answer: 'a' },
    { question: 'Which method is used to add elements to the end of an array?', options: ['a) push()', 'b) pop()', 'c) shift()', 'd) unshift()'], answer: 'a' },
    { question: 'What is the output of `console.log(typeof null)`?', options: ['a) "null"', 'b) "undefined"', 'c) "object"', 'd) "boolean"'], answer: 'c' },
    { question: 'How do you write a comment in JavaScript?', options: ['a) // This is a comment', 'b) /* This is a comment */', 'c) <!-- This is a comment -->', 'd) Both a and b'], answer: 'd' },
    { question: 'Which of the following values is considered falsy in JavaScript?', options: ['a) "false"', 'b) 0', 'c) []', 'd) "0"'], answer: 'b' },
    { question: 'What is the result of `2 + "2"` in JavaScript?', options: ['a) 22', 'b) 4', 'c) NaN', 'd) "NaN"'], answer: 'a' },
    { question: 'Which keyword is used to define a constant in JavaScript?', options: ['a) var', 'b) let', 'c) const', 'd) define'], answer: 'c' },
    { question: 'What is the default value of an uninitialized variable in JavaScript?', options: ['a) null', 'b) undefined', 'c) 0', 'd) NaN'], answer: 'b' },
    { question: 'Which method is used to convert a JSON string into an object?', options: ['a) JSON.parse()', 'b) JSON.stringify()', 'c) JSON.object()', 'd) JSON.toObject()'], answer: 'a' },
    { question: 'What is a closure in JavaScript?', options: ['a) A function with its own scope', 'b) A function with access to its parent scope', 'c) A function without scope', 'd) None of the above'], answer: 'b' }
];

// Initialize readline for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let currentQuestion = 0;
let score = 0;
let overallTimer;
let questionTimer;

// Function to ask a question and handle the answer
function askQuestion() {
    if (currentQuestion >= quiz.length) {
        endQuiz();
        return;
    }

    console.log(`\nQuestion ${currentQuestion + 1}: ${quiz[currentQuestion].question}`);
    quiz[currentQuestion].options.forEach(option => console.log(option));

    // Start a 10-second timer for the question
    let timeLeft = 10;
    questionTimer = setInterval(() => {
        timeLeft--;
        process.stdout.write(`Time left for this question: ${timeLeft}s\r`);

        if (timeLeft === 0) {
            clearInterval(questionTimer);
            console.log('\nTime’s up for this question!');
            nextQuestion();  
        }
    }, 1000);

    // Handle user input asynchronously
    rl.question('Your answer (a/b/c/d): ', answer => {
        clearInterval(questionTimer); 

        if (answer.toLowerCase() === quiz[currentQuestion].answer.toLowerCase()) {
            console.log('Correct!');
            score++;
        } else {
            console.log('Wrong answer!');
        }

        nextQuestion();  
    });
}

// Function to move to the next question
function nextQuestion() {
    currentQuestion++;
    askQuestion();
}

// Function to end the quiz
function endQuiz() {
    clearInterval(overallTimer);  
    rl.close();  
    console.log(`\nQuiz ended! Your final score is: ${score}/${quiz.length}`);
}

// Start the overall timer for 100 seconds
let overallTimeLeft = 100;
overallTimer = setInterval(() => {
    overallTimeLeft--;
    process.stdout.write(`Overall time left: ${overallTimeLeft}s\r`);

    if (overallTimeLeft === 0) {
        console.log('\nTime’s up for the whole quiz!');
        endQuiz();  // End the quiz
    }
}, 1000);

// Start the quiz
askQuestion();
