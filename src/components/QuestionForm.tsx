import React, { useState } from 'react';
import { Question, Language } from '../types';
import { languages } from '../data/languages';
import { VoiceRecorder } from './VoiceRecorder';

interface QuestionFormProps {
  onSubmit: (question: Question) => void;
}

export const QuestionForm: React.FC<QuestionFormProps> = ({ onSubmit }) => {
  const [question, setQuestion] = useState<Question>({
    id: crypto.randomUUID(),
    subject: '',
    question: '',
  });
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(question);
    setQuestion({
      id: crypto.randomUUID(),
      subject: '',
      question: '',
    });
  };

  const handleVoiceInput = (text: string) => {
    setQuestion(prev => ({ ...prev, question: text }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          value={question.subject}
          onChange={(e) => setQuestion(prev => ({ ...prev, subject: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="language" className="block text-sm font-medium text-gray-700">
          Preferred Language
        </label>
        <select
          id="language"
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.nativeName} ({lang.name})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Ask Your Question
        </label>
        <div className="mt-1">
          <VoiceRecorder onTranscriptionComplete={handleVoiceInput} />
        </div>
        <textarea
          value={question.question}
          onChange={(e) => setQuestion(prev => ({ ...prev, question: e.target.value }))}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      <button
        type="submit"
        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Get Help
      </button>
    </form>
  );
};