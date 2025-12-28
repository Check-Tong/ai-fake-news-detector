const checkBtn = document.getElementById("checkBtn");
const newsInput = document.getElementById("newsText");
const resultDiv = document.getElementById("result");

checkBtn.addEventListener("click", async () => {
  const text = newsInput.value.trim();

  if (!text) {
    resultDiv.innerText = "⚠️ Please enter news text";
    resultDiv.style.color = "orange";
    return;
  }

  resultDiv.innerText = "⏳ Checking...";
  resultDiv.style.color = "black";

  try {
    const response = await fetch("http://localhost:3000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    const data = await response.json();

    if (data.label === "FAKE") {
      resultDiv.innerText = `❌ FAKE NEWS (${(data.score * 100).toFixed(2)}%)`;
      resultDiv.style.color = "red";
    } else {
      resultDiv.innerText = `✅ REAL NEWS (${(data.score * 100).toFixed(2)}%)`;
      resultDiv.style.color = "green";
    }
  } catch {
    resultDiv.innerText = "❌ Cannot connect to backend";
    resultDiv.style.color = "red";
  }
});
