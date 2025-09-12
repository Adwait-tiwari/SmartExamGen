import { useEffect, useState } from "react";
import Navbar from "../header/Navbar";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import api from "../../utils/api";

function DisplayQuestions() {
  const { subject } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await api.get("/api/questions/generate", {
          params: {
            subject,
            difficulty: state?.difficulty || null,
            type: state?.questionTypes || null,
            number: state?.questionNumber || null,
          },
        });
        console.log(res.data.questions);
        setQuestions(res.data.questions);

        // Initialize userAnswers
        const initialAnswers = {};
        res.data.questions.forEach((_, index) => {
          initialAnswers[index] = "";
        });
        setUserAnswers(initialAnswers);
      } catch (err) {
        console.error("Error fetching questions", err);
        setError("Unable to load questions. Please try again.");
      }
    };

    fetchQuestions();
  }, [subject, state]);

  const handleAnswerChange = (questionIndex, answer) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionIndex]: answer,
    }));
  };

  const normalizeAnswer = (answer) => {
    if (!answer) return "";
    let normalized = answer.toString().trim().toLowerCase();
    normalized = normalized.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
    normalized = normalized
      .replace(/\bpython\s*2\b/g, "python2")
      .replace(/\bpython\s*3\b/g, "python3")
      .replace(/\bhtml\s*5\b/g, "html5")
      .replace(/\bcss\s*3\b/g, "css3")
      .replace(/^(a|an|the)\s+/i, "");
    return normalized;
  };

  const isAnswerCorrect = (userAnswer, correctAnswer) => {
    const normalizedUser = normalizeAnswer(userAnswer);
    const normalizedCorrect = normalizeAnswer(correctAnswer);
    if (normalizedUser === normalizedCorrect) return true;
    if (Array.isArray(correctAnswer)) {
      return correctAnswer.some((ans) => normalizeAnswer(ans) === normalizedUser);
    }
    if (!isNaN(normalizedUser) && !isNaN(normalizedCorrect)) {
      return parseFloat(normalizedUser) === parseFloat(normalizedCorrect);
    }
    return (
      normalizedCorrect.includes(normalizedUser) || normalizedUser.includes(normalizedCorrect)
    );
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, index) => {
      if (isAnswerCorrect(userAnswers[index], q.answer)) {
        score += 1;
      }
    });
    return score;
  };

  const handleSubmit = async () => {
    const score = calculateScore();
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user._id) {
      setError("User ID not found. Please login again.");
      console.error("User ID missing. Local user:", user);
      return;
    }

    try {
      await api.post("/api/scores/submit", {
        userId: user._id,
        subject,
        score,
      });

      setSubmitted(true);
      setTimeout(() => {
        navigate("/result");
      }, 1000);
    } catch (err) {
      console.error("Error submitting score", err);
      setError("Failed to submit score. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Question Paper: {subject}</h1>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 border border-red-300 rounded">
            {error}
          </div>
        )}

        {submitted && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h2 className="text-xl font-semibold">
              Your Score: {calculateScore()} / {questions.length}
            </h2>
          </div>
        )}

        {questions.length > 0 ? (
          questions.map((q, i) => (
            <div key={i} className="bg-white shadow p-4 mb-4 rounded-lg">
              <p className="font-semibold">Q{i + 1}: {q.question}</p>

              {q.options && q.options.length > 0 ? (
                <div className="ml-4 mt-2">
                  {q.options.map((opt, idx) => (
                    <div key={idx} className="flex items-center mb-2">
                      <input
                        type="radio"
                        id={`q${i}-opt${idx}`}
                        name={`question-${i}`}
                        value={opt}
                        checked={userAnswers[i] === opt}
                        onChange={() => handleAnswerChange(i, opt)}
                        disabled={submitted}
                        className="mr-2"
                      />
                      <label htmlFor={`q${i}-opt${idx}`}>{opt}</label>
                      {submitted && isAnswerCorrect(opt, q.answer) && (
                        <span className="ml-2 text-green-600">✓ Correct Answer</span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-2">
                  <textarea
                    className="w-full p-2 border rounded"
                    rows="3"
                    placeholder="Type your answer here..."
                    value={userAnswers[i] || ""}
                    onChange={(e) => handleAnswerChange(i, e.target.value)}
                    disabled={submitted}
                  />
                  {submitted && q.answer && (
                    <div className="mt-2 p-2 bg-gray-50 rounded">
                      <p className="font-semibold">Correct Answer:</p>
                      <p>{q.answer}</p>
                    </div>
                  )}
                </div>
              )}

              {submitted && (
                <div
                  className={`mt-2 p-2 rounded ${
                    isAnswerCorrect(userAnswers[i], q.answer)
                      ? "bg-green-50"
                      : "bg-red-50"
                  }`}
                >
                  <p>Your answer: {userAnswers[i] || "No answer provided"}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No questions found for this subject.</p>
        )}

        {!submitted && questions.length > 0 && (
          <button
            onClick={handleSubmit}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit Answers
          </button>
        )}
      </div>
    </>
  );
}

export default DisplayQuestions;
