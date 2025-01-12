import React, { useState } from 'react';
import { QuestionForm } from './components/QuestionForm';
import { FeedbackCard } from './components/FeedbackCard';
import { Question, Feedback } from './types';

function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  const handleQuestionSubmit = (question: Question) => {
    setQuestions(prev => [...prev, question]);
    
    // Simulate AI feedback (in a real app, this would call an AI service)
    const mockFeedback: Feedback = {
      text: "Here's a detailed explanation of the concept...",
      culturalContext: "In many cultures, this concept is understood differently...",
      suggestions: [
        "Try breaking down the problem into smaller parts",
        "Practice with similar examples",
        "Review the fundamental concepts"
      ],
      resources: [
        "Khan Academy: Related Topics",
        "Local Language Resources",
        "Cultural Context Materials"
      ]
    };
    
    setFeedbacks(prev => [...prev, mockFeedback]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">
              AI Tutor
            </h1>
          </div>
        </header>
        
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="px-4 py-8 sm:px-0">
              <QuestionForm onSubmit={handleQuestionSubmit} />
              
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Your Questions & Feedback</h2>
                {questions.map((question, index) => (
                  <FeedbackCard
                    key={question.id}
                    question={question}
                    feedback={feedbacks[index]}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;