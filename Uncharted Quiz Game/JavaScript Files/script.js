
const startButton = document.getElementById('start-btn');       // start button
const nextButton = document.getElementById('next-btn');         // next button
const intro = document.getElementById('myTitle');               // intro text
const userName = document.getElementById('myUsername');         // username placeholder
const score = document.getElementById('myScore');               // final score text
const message = document.getElementById('myMessage');           // message text


// when start button is clicked, go into the startGame() function
startButton.addEventListener('click', startGame);

nextButton.addEventListener('click', () => {
    
    currentQuestionIndex++;         // increment to next question
    setNextQuestion();              // call setNextQuestion() function
})

// Q&A container for displaying questions and answers
const questionContainerElement = document.getElementById('question-container');

// For randomizing order of questions and for knowing what the current questions is
let shuffledQuestions, currentQuestionIndex;

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let correctNum = 0;       // hold number of questions user gets correct

// Function for starting the game
function startGame() {
    
    alert("Are you ready to play? Click Ok");
    
    correctNum = 0;       // reset score
    
    // When start button is clicked, hide the button and intro text and username field and score and message
    startButton.classList.add('hide');
    intro.classList.add('hide');
    userName.classList.add('hide');
    myScore.classList.add('hide');
    myMessage.classList.add('hide');
    
    // Sort questions in random order every time the quiz begins
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    
    // For starting at the first quetsion in the array
    currentQuestionIndex = 0;
    
    // When start button is clicked, display the question and answers
    questionContainerElement.classList.remove('hide');
    
    // Goto setNextQuestion() function
    setNextQuestion();
}


// Function for going to the next question in the game
function setNextQuestion() {
    
    resetState();       // reset question whenever the next question is called
    
    // call showQuestion function which holds the current question in the array
    showQuestion(shuffledQuestions[currentQuestionIndex]);
    
}

// Function for showing each question
function showQuestion(question) {
    
    questionElement.innerText = question.question;  // for changing text of question
    
    // loop through questions
    question.answers.forEach(answer => {
        
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        
        // if user chose the correct answer
        if (answer.correct) {
            
            // add data attribute to correct
            button.dataset.correct = answer.correct;
        }
        
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
        
    })
}

// Function for resetting question every time the next question is chosen
function resetState() {
    
    nextButton.classList.add('hide');       // hide next button once user clicks it
    
    // If there is a child inside of the answer button elements, then remove it
    while (answerButtonsElement.firstChild) {
        
        // Remove answer buttons from question
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

// Function for selecting an answer in the game
function selectAnswer(e) {
    
    const selectedButton = e.target;                     // get button user clicks on
    const correct = selectedButton.dataset.correct;     // check to see if answer is correct
    setStatusClass(document.body, correct);             // set to correct or wrong
    
    // go through each button
    Array.from(answerButtonsElement.children).forEach(button => {
        
        // call setStatusClass function, to see if answer is correct
        setStatusClass(button, button.dataset.correct);
    });
    
    // if answer is correct
    if (selectedButton.dataset = correct) {
        
        // increment number of questions user got correct
        correctNum++;
    }
    
    // if user is not on the last question
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        
        // Then show next button
        nextButton.classList.remove('hide');
    }
    
    // if user is on the last question
    else {
        
        // Get username from userInput
        var userInput = document.getElementById('myUserInput').value;     // userinput

        // If user gets 0-4 questions correct
        if (correctNum <= 4) {
            intro.innerText = 'Game Over!';
            myScore.innerText = 'Final score for ' + userInput + ':  ' + correctNum + ' / 20. \n' + 'You are a failure. Get lost.';
        }
        
        // if user gets 5-11 questions correct
        else if (correctNum >= 5 && correctNum <= 11) {
            intro.innerText = 'Game Over!';
            myScore.innerText = 'Final score for ' + userInput + ':  ' + correctNum + ' / 20. \n' + 'Not bad. You can do better.';
        }
        
        // if user gets 12-16 questions correct
        else if (correctNum >= 12 && correctNum <= 16) {
            intro.innerText = 'Game Over!';
            myScore.innerText = 'Final score for ' + userInput + ':  ' + correctNum + ' / 20. \n' + 'You passed, you are an average player.';
        }
        
        // if user gets 17-19 questions correct
        else if (correctNum >= 17 && correctNum <= 19) {
            intro.innerText = 'Game Over!';
            myScore.innerText = 'Final score for ' + userInput + ':  ' + correctNum + ' / 20. \n' + 'Good job. You are a true Uncharted fan.';
        }
        
        // if user gets a perfect score (20 questions correct)
        else {
            intro.innerText = 'Game Over!';
            myScore.innerText = 'Final score for ' + userInput + ':  ' + correctNum + ' / 20. \n' + 'Perfect score! You are iBiza TwisT.';
        }

        
        startButton.innerText = 'Restart Quiz';
        message.innerText = 'Thanks for playing! For more information, visit our About page.';
        
        myMessage.classList.remove('hide');
        myScore.classList.remove('hide');
        intro.classList.remove('hide')
        startButton.classList.remove('hide');
        questionContainerElement.classList.add('hide');
        
    }
    
}

// Function for adding the class
function setStatusClass(element, correct) {
    
    // call clearStatusClass function
    clearStatusClass(element);
 
    // if correct
    if (correct){
        
        element.classList.add('correct');       // add correct class
    }
    
    // if wrong
    else {
        element.classList.add('wrong');         // add wrong class
    }
    
}

// Function for removing the classes
function clearStatusClass(element) {
    
    element.classList.remove('correct');
    element.classList.remove('wrong');
}


// List of questions with there answer choices stored into an array
const questions = [
    {
        question: 'Does Sully smoke? And what?',
        answers: [
                  {text: 'Yeah, he often smokes cigars. Would not be surprised if he had lung cancer', correct: true},
                  {text: 'No, he never smokes', correct: false},
                  {text: 'Yeah, he smokes cigarattes', correct: false},
                  {text: 'Yeah, he is a vape god', correct: false}
         ]
    },
    {
        question: 'Who does Nathan Drake believe he is a descendant of?',
        answers: [
                  {text: 'Marco Polo', correct: false},
                  {text: 'Ghenghis Khan', correct: false},
                  {text: 'Sir Francis Drake', correct: true},
                  {text: 'Henry Drake', correct: false}
        ]
    },
    {
        question: 'Who is Nathan Drakes love?',
        answers: [
                  {text: 'Rika Raja', correct: false},
                  {text: 'Chloe Frazer', correct: false},
                  {text: 'Elena Fisher', correct: true},
                  {text: 'Victor Sullivan', correct: false}
        ]
    },
    {
        question: 'Which character chooses his own side, neither good or bad?',
        answers: [
                  {text: 'Charlie Cutter', correct: false},
                  {text: 'Samuel Drake', correct: false},
                  {text: 'Eddy Raja', correct: false},
                  {text: 'Harry Flynn', correct: true}
        ]
    },
    {
        question: 'What does the mystical Shield Of Asgard do?',
        answers: [
                  {text: 'Increases health drastically', correct: true},
                  {text: 'Stops time', correct: false},
                  {text: 'Heals people', correct: false},
                  {text: 'Insta kills enemies in a 20 foot radius', correct: false}
        ]
    },
    {
        question: 'Who is the antagonist in Uncharted 4: A Thiefs end?',
        answers: [
                  {text: 'Zoran Lazarević', correct: false},
                  {text: 'Nadine Ross', correct: false},
                  {text: 'Rafe Adler', correct: true},
                  {text: 'Talbot', correct: false}
        ]
    },
    {
        question: 'Which characters were in Uncharted 3: Drakes Deception campaign?',
        answers: [
                  {text: 'Harry Flynn, Zoran Lazarević, Katherine Marlowe', correct: false},
                  {text: 'Eddy Raja, Tenzin, Nathan Drake, Elena Fisher', correct: false},
                  {text: 'Salim, Charlie Cutter, Chloe Frazer, Victor Sullivan', correct: true},
                  {text: 'Samuel Drake, Rafe Adler, Atoq Navarro, Charlie Cutter', correct: false}
        ]
    },
    {
        question: 'Which game did Elena Fisher first debut in?',
        answers: [
                  {text: 'Uncharted: Drakes Fortune', correct: true},
                  {text: 'Uncharted 3: Drakes Deception', correct: false},
                  {text: 'Uncharted: The Lost Legacy', correct: false},
                  {text: 'Uncharted 2: Among Thieves', correct: false}
        ]
    },
    {
        question: 'Which lost cities did Nathan Drake seek out to find during the Uncharted series?',
        answers: [
                  {text: 'Bermuda Triangle, El Dorado, The Pyramids, Borneo', correct: false},
                  {text: 'El Dorado, Shambhala, Atlantis of the Sands, Libertalia ', correct: true},
                  {text: 'Kathmandu, Shambhala, Rub Al-Khali', correct: false},
                  {text: 'Tikal, Mosque City of Bagerhat, Borneo, Rub Al-Khali', correct: false}
        ]
    },
    {
        question: 'How many kills is a Rampant?',
        answers: [
                  {text: '10', correct: false},
                  {text: '20', correct: true},
                  {text: '5', correct: false},
                  {text: '17', correct: false}
        ]
    },
    {
        question: 'What is Nathan Drakes main objective in all of the games?',
        answers: [
                  {text: 'To right his wrongs', correct: false},
                  {text: 'To please the gods', correct: false},
                  {text: 'Find the one who killed his family', correct: false},
                  {text: 'To find treasure', correct: true}
        ]
    },
    {
        question: 'What is the highest level you can reach on Uncharted 4 multiplayer?',
        answers: [
                  {text: '90', correct: true},
                  {text: '70', correct: false},
                  {text: 'No max level', correct: false},
                  {text: '99', correct: false}
        ]
    },
    {
        question: 'What are some of the game modes on Uncharted 4 multiplayer?',
        answers: [
                  {text: 'Elimination, Team Deathmatch, Plunder, Domination', correct: false},
                  {text: 'Free for all, Team Deathmatch, Elimination, Plunder, Command', correct: false},
                  {text: 'Team Deathmatch, Plunder, Command, King of the Hill, Ranked TDM', correct: true},
                  {text: 'Team Deathmatch, Team Objective, Three TDM, Plunder, King of the Hill', correct: false}
        ]
    },
    {
        question: 'Which Uncharted games, at one point, have had a multiplayer mode?',
        answers: [
                  {text: 'Uncharted 1, 3, and Golden Abyss', correct: false},
                  {text: 'Uncharted 2, 3, 4, and Lost Legacy', correct: true},
                  {text: 'Uncharted 1, 2, 3, 4', correct: false},
                  {text: 'All of the Uncharted games', correct: false}
        ]
    },
    {
        question: 'Does Sully have a wife?',
        answers: [
                  {text: 'Yes, it is Katherine Marlowe', correct: false},
                  {text: 'No, it was never mentioned in the series', correct: true},
                  {text: 'Yes, but they are divorced during the series', correct: false},
                  {text: 'Yes, but she passed away long ago', correct: false}
        ]
    },
    {
        question: 'Was Chloe Frazer, at one point, working with the antagonists in the Uncharted series?',
        answers: [
                  {text: 'No, she was always on the side of heros', correct: false},
                  {text: 'She is not a character in the Uncharted series', correct: false},
                  {text: 'Yes. In Uncharted 2, she was working with Harry Flynn', correct: true},
                  {text: 'Yes, she was the main villian in Uncharted 3', correct: false}
        ]
    },
    {
        question: 'What was the name of Drakes final mission in Uncharted 4?',
        answers: [
                  {text: 'A Heros End', correct: false},
                  {text: 'All Good Things Must Come To An End', correct: false},
                  {text: 'One Last Fight', correct: false},
                  {text: 'A Thiefs End', correct: true}
        ]
    },
    {
        question: 'What does Nathan Drake fear?',
        answers: [
                  {text: 'Clowns', correct: true},
                  {text: 'Snakes', correct: false},
                  {text: 'Monsters', correct: false},
                  {text: 'Death', correct: false}
        ]
    },
    {
        question: 'Nathan Drake is shown wearing Sir Francis Drakes ring. What does it say?',
        answers: [
                  {text: 'Le Treasure Hunter', correct: false},
                  {text: 'Legends never die', correct: false},
                  {text: 'The Drake Legacy', correct: false},
                  {text: 'Sic Parvis Magna', correct: true}
        ]
    },
    {
        question: 'What game do Nathan Drake and Elena Fisher play in Uncharted 4?',
        answers: [
                  {text: 'The Last of Us', correct: false},
                  {text: 'Crash Bandicoot', correct: true},
                  {text: 'God of War', correct: false},
                  {text: 'Infamous', correct: false}
        ]
    }
                   
]

// Loading screen function
setTimeout(() => {
    
  const loader = document.querySelector(".loader");  // get loader
  loader.className += " hidden";                     // gets rid of loader
}, 1000);                                           // time to stay on loading screen
