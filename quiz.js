document.addEventListener('DOMContentLoaded', () => {
    const quizForm = document.getElementById('greenCardQuiz');
    const cardResultDiv = document.getElementById('cardResult');
    const greenCardDiv = document.getElementById('greenCard');
    const ecoScoreSpan = document.getElementById('ecoScore');
    const resultTextP = document.getElementById('resultText');
    const downloadCardBtn = document.getElementById('downloadCardBtn');
    const shareLinkedInBtn = document.getElementById('shareLinkedInBtn');
    const shareXBtn = document.getElementById('shareXBtn');

    quizForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let totalScore = 0;
        const formData = new FormData(quizForm);

        for (let i = 1; i <= 10; i++) {
            const answer = formData.get(`q${i}`);
            if (answer) {
                totalScore += parseInt(answer);
            } else {
                alert(`Please answer question ${i}`);
                return;
            }
        }

        displayResult(totalScore);
    });

    // Set current date on card
    const currentDateSpan = document.getElementById('currentDate');
    const today = new Date();
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    currentDateSpan.textContent = today.toLocaleDateString('en-GB', options);

    function displayResult(score) {
        ecoScoreSpan.textContent = score;
        let resultText = '';
        let cardColorClass = '';

        if (score >= 80 && score <= 100) {
            resultText = '🌟 Eco-Warrior';
            cardColorClass = 'green';
        } else if (score >= 50 && score <= 79) {
            resultText = '🌼 Eco-Aware';
            cardColorClass = 'yellow';
        } else if (score >= 0 && score <= 49) {
            resultText = '⚠️ Needs Work';
            cardColorClass = 'red';
        } else {
            resultText = 'Score out of range';
            cardColorClass = 'red';
        }

        resultTextP.textContent = resultText;
        greenCardDiv.className = `green-card ${cardColorClass}`;

        cardResultDiv.style.display = 'block';

        // Scroll to the result
        cardResultDiv.scrollIntoView({ behavior: 'smooth' });
    }

    // Download card as image
    downloadCardBtn.addEventListener('click', () => {
        html2canvas(greenCardDiv).then(canvas => {
            const link = document.createElement('a');
            link.download = 'green-card.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
    });

    // Share on social media
    shareLinkedInBtn.addEventListener('click', () => {
        const text = `My Eco-Score is ${ecoScoreSpan.textContent}! ${resultTextP.textContent}. Get your own Green Card: [Your Website URL here]`;
        const url = encodeURIComponent(window.location.href);
        const linkedinShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&summary=${encodeURIComponent(text)}`;
        window.open(linkedinShareUrl, '_blank');
    });

    shareXBtn.addEventListener('click', () => {
        const text = `Check out my Eco-Score: ${ecoScoreSpan.textContent}! ${resultTextP.textContent}. #GetYourGreenCard #EcoWarrior`;
        const xShareUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`;
        window.open(xShareUrl, '_blank');
    });
}); 