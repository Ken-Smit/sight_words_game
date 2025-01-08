document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll(".button");
    const submitButton = document.getElementById("submit");
    const feedback = document.createElement("p");
    const container = document.querySelector(".container");
    container.appendChild(feedback);

    // Arrays for sight words and non-sight words
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

    // Helper function to check if a word is a sight word
    const isSightWord = (word) => sightWords.includes(word);

    // Display random words in buttons
    buttons.forEach(button => {
        const wordArray = Math.random() < 0.5 ? sightWords : notSightWords;
        const randomWord = wordArray[Math.floor(Math.random() * wordArray.length)];
        button.textContent = randomWord;
    });

    const selectedWords = new Set(); // Track multiple selected words

    // Add click event to each button for toggling selection
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const word = button.textContent;

            if (selectedWords.has(word)) {
                selectedWords.delete(word); // Deselect the word
                button.classList.remove("selected"); // Remove highlight
            } else {
                selectedWords.add(word); // Select the word
                button.classList.add("selected"); // Highlight the button
            }
        });
    });

    // Add click event to the submit button
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
        } else if (correctCount > 0) {
            feedback.textContent = `You got ${correctCount} correct out of ${selectedWords.size}. Try again!`;
            feedback.style.color = "orange";
        } else {
            feedback.textContent = "None of the selected words are correct. Try again!";
            feedback.style.color = "red";
        }

        // Reset selection
        buttons.forEach(btn => btn.classList.remove("selected"));
        selectedWords.clear();
    });
});