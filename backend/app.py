from flask import Flask, request, jsonify
import openai

app = Flask(__name__)

# Add your API key
openai.api_key = "YOUR_OPENAI_API_KEY"

@app.route("/predict", methods=["POST"])
def predict():
    user_input = request.json.get("text", "")

    # Call OpenAI GPT model
    response = openai.ChatCompletion.create(
        model="gpt-4.1-mini",
        messages=[{"role": "user", "content": user_input}]
    )

    reply = response.choices[0].message["content"]

    return jsonify({"response": reply})

if __name__ == "__main__":
    app.run(port=8000)

import os
openai.api_key = os.getenv("364adf414e406839c173fe6901af335a")