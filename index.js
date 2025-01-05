// Wait for the document to finish loading
document.addEventListener('DOMContentLoaded', () => {
    // Get all buttons
    const buttons = document.querySelectorAll(".button");

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

    // Display random words in buttons
    buttons.forEach(button => {
        const selector = Math.random() < 0.5 ? sightWords : notSightWords;
        const randomWord = selector[Math.floor(Math.random() * selector.length)];
        button.textContent = randomWord;
    });
});