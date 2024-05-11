import React from "react";

function QuestionItem({ question, onDeleteQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  const handleDelete = () => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete question");
        }
        onDeleteQuestion(id);
      })
      .catch((error) => {
        console.error("Error deleting question:", error);
      });
  };

  const handlePatch = (newCorrectIndex) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correctIndex: newCorrectIndex,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update question");
        }
      })
      .catch((error) => {
        console.error("Error updating question:", error);
      });
  };

  const handleCorrectAnswersChange = (e) => {
    const newCorrectIndex = parseInt(e.target.value);
    handlePatch(newCorrectIndex);
  };

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleCorrectAnswersChange}>
          {options}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
