import React from 'react';
import { FolkSong } from '../types';

interface SongListProps {
  songs: FolkSong[];
}

export const SongList: React.FC<SongListProps> = ({ songs }) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Saved Folk Songs</h2>
      <div className="space-y-4">
        {songs.map((song, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900">{song.title}</h3>
            <p className="text-sm text-gray-500 mt-1">Dialect: {song.dialect}</p>
            <div className="mt-3 whitespace-pre-wrap text-gray-700">{song.content}</div>
            {song.notes && (
              <div className="mt-4 text-sm text-gray-600">
                <strong>Notes:</strong>
                <p>{song.notes}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};