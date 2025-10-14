const display = document.querySelector('input[name="display"]');
display.addEventListener('keydown', (e) => e.preventDefault());

// AI MODAL LOGIC
const aiModalBackdrop = document.getElementById('ai-modal-backdrop');
const aiModal = document.getElementById('ai-modal');
const aiInput = document.getElementById('ai-input');
const aiCalculateBtn = document.getElementById('ai-calculate-btn');
const aiCloseBtn = document.getElementById('ai-close-btn');
const aiResultContainer = document.getElementById('ai-result-container');
const aiResult = document.getElementById('ai-result');
const aiUseResultBtn = document.getElementById('ai-use-result-btn');

// Open Modal
function openAiModal() {
  aiModalBackdrop.classList.remove('hidden');
  aiModal.classList.remove('hidden');
}

// Close Modal
function closeAiModal() {
  aiModalBackdrop.classList.add('hidden');
  aiModal.classList.add('hidden');
  aiInput.value = '';
  aiResultContainer.classList.add('hidden');
}

aiCloseBtn.addEventListener('click', closeAiModal);
aiModalBackdrop.addEventListener('click', closeAiModal);

// GEMINI AI CALL
async function getAiCalculation(query) {
  aiResult.textContent = '⏳ Calculating...';
  aiResultContainer.classList.remove('hidden');

  const GEMINI_API_KEY = "AIzaSyDS4pKSRyrKB36Ec3NlpQmiGprxqQLVKdg";
  const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

  const body = {
    contents: [{ parts: [{ text: `Solve this strictly as a math problem: ${query}. Give only the final numerical answer.` }] }]
  };

  try {
    const res = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Error";
    aiResult.textContent = text;
  } catch (err) {
    aiResult.textContent = "Error";
    console.error(err);
  }
}

aiCalculateBtn.addEventListener('click', () => {
  const q = aiInput.value.trim();
  if (q) getAiCalculation(q);
});

// Use Result in Calculator
aiUseResultBtn.addEventListener('click', () => {
  const result = aiResult.textContent.trim();
  if (result && result !== 'Error') {
    display.value = result;
  }
  closeAiModal();
});
