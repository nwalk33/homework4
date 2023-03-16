var question = document.querySelector('#question')
var choices = Array.from(document.querySelectorAll('.choice-text'))


var currentQuestion = {}
var acceptingAnswers = true
var questionCounter = 0
var availableQuestions = []

var questions = [
    {
        question: 'Array elements indices start at:',
        choice1: 'A. 1',
        choice2: 'B. 10',
        choice3: 'C. 0',
        choice4: 'D. 100',
        answer: 3,
    },
    {
        question: 'The following can be  abooleans:',
        choice1: 'A. True',
        choice2: 'B. Wrong',
        choice3: 'C. Right',
        choice4: 'D. None',
        answer: 1,
    },
    {
        question: 'Anything following // will be a:',
        choice1: 'A. Function',
        choice2: 'B. Object',
        choice3: 'C. Comment',
        choice4: 'D. Expression',
        answer: 3,
    },
    {
        question: 'Math.random() returns a random number between:',
        choice1: 'A. 0 and 1',
        choice2: 'B. 1 and 10',
        choice3: 'C. -1 and 1',
        choice4: 'D. 1 and 100',
        answer: 1,
    }
]

startGame = ()  => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}
getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question
   
    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
     })
     
     availableQuestions.splice(questionsIndex, 1)
     acceptingAnswers = true
}
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return
        
        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
        'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.ass(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        },1000)
        })
    })

    startGame()

