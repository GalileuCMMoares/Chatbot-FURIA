import React, { useState } from 'react';
import axios from 'axios';

interface Message {
  from: 'user' | 'bot';
  text: string;
}

export default function Chat() {
  const [msgs, setMsgs] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const send = async () => {
    if (!input.trim()) return;
    setMsgs(prev => [...prev, { from: 'user', text: input }]);
    try {
      const response = await axios.post('http://localhost:3000/chat', { message: input });
      setMsgs(prev => [...prev, { from: 'bot', text: response.data.answer }]);
    } catch {
      setMsgs(prev => [...prev, { from: 'bot', text: 'Erro ao contatar o servidor.' }]);
    }
    setInput('');
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="border rounded p-2 h-96 overflow-auto mb-2">
        {msgs.map((m, i) => (
          <div key={i} className={m.from === 'user' ? 'text-right' : 'text-left'}>
            <span className={`inline-block px-2 py-1 rounded ${
              m.from === 'user' ? 'bg-blue-200' : 'bg-gray-200'
            }`}>{m.text}</span>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          className="flex-1 border rounded-l px-2"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
        />
        <button onClick={send} className="bg-blue-600 text-white px-4 rounded-r">Enviar</button>
      </div>
    </div>
  );
}