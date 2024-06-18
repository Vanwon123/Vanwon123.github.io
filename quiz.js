let questions;

fetch('cpp_questions.json')
    .then(response => response.json())
    .then(data => {
        questions = data;
        const quizContainer = document.getElementById('quiz-container');
        questions.forEach((question, index) => {
            const questionElement = document.createElement('div');
            questionElement.innerHTML = `
                <p>${index + 1}. ${question.question}</p>
                ${question.options.map((option, i) => `
                    <label>
                        <input type="radio" name="question${index}" value="${option}">
                        ${option}
                    </label><br>
                `).join('')}
            `;
            quizContainer.appendChild(questionElement);
        });
    });

function submitQuiz() {
    let score = 0;
    questions.forEach((question, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        const questionElement = document.querySelector(`input[name="question${index}"]`).closest('div');
        const correctAnswerElement = document.createElement('p');
        correctAnswerElement.classList.add('correct-answer');
        correctAnswerElement.innerText = `Correct answer: ${question.answer}`;
        questionElement.appendChild(correctAnswerElement);
        if (selectedOption && selectedOption.value === question.answer) {
            score++;
        }
    });
    document.getElementById('result').innerText = `Your score is ${score} out of ${questions.length}`;
}