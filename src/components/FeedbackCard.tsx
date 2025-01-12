import React from 'react';
import { Question, Feedback } from '../types';

interface FeedbackCardProps {
  question: Question;
  feedback: Feedback;
}

export const FeedbackCard: React.FC<FeedbackCardProps> = ({ question, feedback }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-4">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-900">Question</h3>
        <p className="mt-1 text-gray-600">{question.question}</p>
      </div>

      <div className="mb-4">
        <h4 className="text-md font-medium text-gray-900">Feedback</h4>
        <p className="mt-1 text-gray-600">{feedback.text}</p>
      </div>

      {feedback.culturalContext && (
        <div className="mb-4">
          <h4 className="text-md font-medium text-gray-900">Cultural Context</h4>
          <p className="mt-1 text-gray-600">{feedback.culturalContext}</p>
        </div>
      )}

      {feedback.suggestions && feedback.suggestions.length > 0 && (
        <div className="mb-4">
          <h4 className="text-md font-medium text-gray-900">Suggestions</h4>
          <ul className="mt-1 list-disc list-inside text-gray-600">
            {feedback.suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
      )}

      {feedback.resources && feedback.resources.length > 0 && (
        <div>
          <h4 className="text-md font-medium text-gray-900">Additional Resources</h4>
          <ul className="mt-1 list-disc list-inside text-gray-600">
            {feedback.resources.map((resource, index) => (
              <li key={index}>{resource}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};