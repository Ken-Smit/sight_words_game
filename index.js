document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll(".button");
    const submitButton = document.getElementById("submit");
    const feedback = document.createElement("p");
    const container = document.querySelector(".container");
    const scoreBoard = document.createElement("p");
    container.appendChild(feedback);
    container.appendChild(scoreBoard);

    const sightWords = ["all", "am", "are", "at", "ate", "be", "black", "brown", "but", "came", "did", "do", "eat",
        "four", "get", "good", "have", "he", "into", "like", "must", "new", "no", "now", "on", "our", "out", "please",
        "pretty", "ran", "ride", "saw", "say", "she", "so", "soon", "that", "there", "they", "this", "too", "under", 
        "want", "was", "well", "went", "what", "white", "who", "will", "with", "yes"
    ];

    const notSightWords = ["cat", "dog", "bat", "rug", "pen", "hat", "box", "bug", "sun", "log", "cup", "pig", "fox", 
        "cow", "hen", "cub", "pan", "jam", "ram", "bed", "rat", "van", "net", "bin", "mop", "lid", "gum", "web", "pod", 
        "fan", "zip", "map", "tap", "cap", "dot", "fin", "gem", "hut", "wig", "yam", "zap", "kit", "nut", "pot", "bag", 
        "pet", "sled", "nest", "flag", "frog", "kite", "sock", "bell", "crab", "ship"
    ];

    const isSightWord = (word) => sightWords.includes(word);

    let currentScore = 0;
    let highScore = parseInt(localStorage.getItem("highScore")) || 0;

    const updateScoreBoard = () => {
        scoreBoard.textContent = `Score: ${currentScore} | High Score: ${highScore}`;
    };

    const selectedWords = new Set();

    const refreshWords = () => {
        buttons.forEach(button => {
            const wordArray = Math.random() < 0.5 ? sightWords : notSightWords;
            const randomWord = wordArray[Math.floor(Math.random() * wordArray.length)];
            button.textContent = randomWord;
            button.classList.remove("selected");
        });
        selectedWords.clear();
        feedback.textContent = "";
    };

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const word = button.textContent;

            if (selectedWords.has(word)) {
                selectedWords.delete(word);
                button.classList.remove("selected");
            } else {
                selectedWords.add(word);
                button.classList.add("selected");
            }
        });
    });

    submitButton.addEventListener("click", () => {
        if (selectedWords.size === 0) {
            feedback.textContent = "Please select at least one word before submitting!";
            feedback.style.color = "red";
            return;
        }

        let correctCount = 0;
        selectedWords.forEach(word => {
            if (isSightWord(word)) {
                correctCount++;
            }
        });

        if (correctCount === selectedWords.size) {
            feedback.textContent = "Congratulations! All selected words are correct.";
            feedback.style.color = "green";
            currentScore += correctCount; // Increment score
        } else if (correctCount > 0) {
            feedback.textContent = `You got ${correctCount} correct out of ${selectedWords.size}. Try again!`;
            feedback.style.color = "orange";
            currentScore += correctCount; // Increment score partially
        } else {
            feedback.textContent = "None of the selected words are correct. Try again!";
            feedback.style.color = "red";
            currentScore = Math.max(0, currentScore - 1); // Penalize score, but don't go negative
        }

        // Update high score
        if (currentScore > highScore) {
            highScore = currentScore;
            localStorage.setItem("highScore", highScore); // Save high score
        }

        updateScoreBoard(); // Refresh scoreboard
        setTimeout(refreshWords, 2000); // Refresh words after a delay
    });

    updateScoreBoard(); // Initial display of scores
    refreshWords(); // Initial load of words
});