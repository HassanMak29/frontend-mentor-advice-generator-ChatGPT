import "./style.css";

const diceBtn = document.getElementById("dice");
const adviceID = document.getElementById("adviceID");
const advice = document.getElementById("advice");

const options = {
  method: "POST",
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
  },
  body: JSON.stringify({
    model: "text-davinci-003",
    prompt:
      "Give a random advice, make it shorter than 20 words. Add a 3-digit id number followed by a '-' at the begining of the quote",
    temperature: 1,
    max_tokens: 60,
    frequency_penalty: -1,
  }),
};
const getQuote = async () => {
  const response = await fetch(import.meta.env.VITE_OPENAI_API_URL, options);
  const data = await response.json();
  return data.choices[0].text.trim();
};

diceBtn.addEventListener("click", async () => {
  const slip = await getQuote();
  adviceID.textContent = slip.split("-")[0];
  advice.textContent = slip.split("-")[1].trim();
});
