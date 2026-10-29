import { topoData } from "./js/data.js";

let currentCategory = null;
let score = Number(localStorage.getItem("score")) || 0;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const scoreElement = document.getElementById("score");

updateScore();

document
.querySelectorAll(".category-btn")
.forEach(button => {

    button.addEventListener("click", () => {

        currentCategory = button.dataset.category;

        loadQuestion();

    });

});

function updateScore() {

    scoreElement.textContent = `Score: ${score}`;

}

function loadQuestion() {

    const questions = topoData[currentCategory];

    const randomQuestion =
        questions[Math.floor(Math.random() * questions.length)];

    questionElement.textContent =
        randomQuestion.question;

    answersElement.innerHTML = "";

    // Alle mogelijke antwoorden uit deze categorie
    let allAnswers =
        questions.map(q => q.answer);

    // Duplicaten verwijderen
    allAnswers =
        [...new Set(allAnswers)];

    // Goed antwoord toevoegen
    let options = [randomQuestion.answer];

    // Foute antwoorden verzamelen
    const wrongAnswers =
        allAnswers.filter(
            answer => answer !== randomQuestion.answer
        );

    // Schudden
    wrongAnswers.sort(() => Math.random() - 0.5);

    // Maximaal 4 antwoorden tonen
    options.push(
        ...wrongAnswers.slice(0, 3)
    );

    // Nogmaals schudden
    options.sort(() => Math.random() - 0.5);

    options.forEach(option => {

        const button =
            document.createElement("button");

        button.className = "answer-btn";

        button.textContent = option;

        button.addEventListener("click", () => {

            const buttons =
                document.querySelectorAll(".answer-btn");

            buttons.forEach(btn => {
                btn.disabled = true;
            });

            if (option === randomQuestion.answer) {

                button.classList.add("correct");

                score++;

            } else {

                button.classList.add("wrong");

                buttons.forEach(btn => {

                    if (
                        btn.textContent === randomQuestion.answer
                    ) {
                        btn.classList.add("correct");
                    }

                });

            }

            localStorage.setItem(
                "score",
                score
            );

            updateScore();

            setTimeout(() => {
                loadQuestion();
            }, 1500);

        });

        answersElement.appendChild(button);

    });

}