import { useState } from "react";
import { Heart, Trophy } from "lucide-react";

export const Trivia = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const triviaQuestions = [
    {
      question: "¿Dónde se conocieron por primera vez?",
      options: ["En la universidad", "En el trabajo", "En una fiesta", "En línea"],
      correct: 1,
    },
    {
      question: "¿Cuál es su restaurante favorito?",
      options: ["Italiano", "Mexicano", "Japonés", "Francés"],
      correct: 0,
    },
    {
      question: "¿Cuántos años llevan juntos?",
      options: ["2 años", "3 años", "4 años", "5 años"],
      correct: 2,
    },
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex.toString());
    setShowResult(true);
    if (answerIndex === triviaQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
    setTimeout(() => {
      if (currentQuestion < triviaQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      }
    }, 2000);
  };

  const resetTrivia = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
  };

  return (
    <section className="py-16 px-4 bg-wedding-blue-50 relative">
      {/* Decorative elements */}
      <div className="absolute top-8 left-8 opacity-10">
        <Heart className="w-14 h-14 text-wedding-blue-300 transform rotate-12" />
      </div>
      <div className="absolute bottom-8 right-8 opacity-10">
        <Heart className="w-10 h-10 text-wedding-blue-400 transform -rotate-45" />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-4">
            <div className="w-16 h-0.5 bg-wedding-blue-300"></div>
            <Trophy className="w-6 h-6 text-wedding-blue-400 mx-4" />
            <div className="w-16 h-0.5 bg-wedding-blue-300"></div>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-wedding-blue-900">
            Trivia de la Pareja
          </h2>
          <div className="flex justify-center items-center mt-4">
            <div className="w-16 h-0.5 bg-wedding-blue-300"></div>
            <Trophy className="w-6 h-6 text-wedding-blue-400 mx-4" />
            <div className="w-16 h-0.5 bg-wedding-blue-300"></div>
          </div>
        </div>

        {currentQuestion < triviaQuestions.length ? (
          <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-wedding-blue-400 relative overflow-hidden">
            <div className="absolute top-2 right-2 opacity-10">
              <Heart className="w-8 h-8 text-wedding-blue-300" />
            </div>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-wedding-blue-600">
                  Pregunta {currentQuestion + 1} de {triviaQuestions.length}
                </span>
                <span className="text-sm text-wedding-blue-600">
                  Puntuación: {score}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-wedding-blue-900 mb-6">
                {triviaQuestions[currentQuestion].question}
              </h3>
              <div className="space-y-3">
                {triviaQuestions[currentQuestion].options.map(
                  (option, index) => {
                    let buttonClass =
                      "w-full p-3 text-left rounded-lg border transition-colors ";
                    if (showResult) {
                      if (index === triviaQuestions[currentQuestion].correct) {
                        buttonClass += "bg-green-100 border-green-500 text-green-800";
                      } else if (selectedAnswer === index.toString()) {
                        buttonClass += "bg-red-100 border-red-500 text-red-800";
                      } else {
                        buttonClass +=
                          "bg-gray-100 border-gray-300 text-gray-600";
                      }
                    } else {
                      buttonClass +=
                        "bg-wedding-blue-50 border-wedding-blue-200 text-wedding-blue-800 hover:bg-wedding-blue-100";
                    }

                    return (
                      <button
                        key={index}
                        onClick={() => !showResult && handleAnswerSelect(index)}
                        disabled={showResult}
                        className={buttonClass}
                      >
                        {option}
                      </button>
                    );
                  }
                )}
              </div>
            </div>
            <div className="absolute bottom-2 left-2 opacity-10">
              <Heart className="w-6 h-6 text-wedding-blue-300" />
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-6 text-center border-t-4 border-wedding-blue-400 relative overflow-hidden">
            <div className="absolute top-2 right-2 opacity-10">
              <Heart className="w-8 h-8 text-wedding-blue-300" />
            </div>
            <Trophy className="w-16 h-16 text-wedding-blue-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-wedding-blue-900 mb-4">
              ¡Trivia Completada!
            </h3>
            <p className="text-lg text-wedding-blue-700 mb-6">
              Tu puntuación: {score} de {triviaQuestions.length}
            </p>
            <button
              onClick={resetTrivia}
              className="bg-wedding-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-wedding-blue-700 transition-colors"
            >
              Jugar de Nuevo
            </button>
            <div className="absolute bottom-2 left-2 opacity-10">
              <Heart className="w-6 h-6 text-wedding-blue-300" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};