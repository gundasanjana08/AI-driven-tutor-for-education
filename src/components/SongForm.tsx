import React, { useState } from 'react';
import { FolkSong } from '../types';
import { dialects } from '../data/dialects';
import { VoiceRecorder } from './VoiceRecorder';

interface SongFormProps {
  onSave: (song: FolkSong) => void;
}

export const SongForm: React.FC<SongFormProps> = ({ onSave }) => {
  const [song, setSong] = useState<FolkSong>({
    title: '',
    content: '',
    dialect: '',
    region: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(song);
    setSong({ title: '', content: '', dialect: '', region: '', notes: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSong(prev => ({ ...prev, [name]: value }));
  };

  const handleTranscription = (text: string) => {
    setSong(prev => ({ ...prev, content: prev.content + ' ' + text }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Song Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={song.title}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="dialect" className="block text-sm font-medium text-gray-700">
          Dialect
        </label>
        <select
          name="dialect"
          id="dialect"
          value={song.dialect}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        >
          <option value="">Select a dialect</option>
          {dialects.map(dialect => (
            <option key={dialect.name} value={dialect.name}>
              {dialect.name} ({dialect.region})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Song Content
        </label>
        <div className="mt-1 mb-2">
          <VoiceRecorder onTranscriptionComplete={handleTranscription} />
        </div>
        <textarea
          name="content"
          id="content"
          rows={6}
          value={song.content}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
          Additional Notes
        </label>
        <textarea
          name="notes"
          id="notes"
          rows={3}
          value={song.notes}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <button
        type="submit"
        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Save Song
      </button>
    </form>
  );
};