import { useState, useRef } from 'react';

const ALLOWED = ['.pdf', '.docx', '.txt', '.png', '.jpg', '.jpeg'];
const MAX_SIZE = 10 * 1024 * 1024;

export function useFileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(f: File): boolean {
    const ext = '.' + f.name.split('.').pop()?.toLowerCase();
    if (!ALLOWED.includes(ext)) { setError(`Allowed: ${ALLOWED.join(', ')}`); return false; }
    if (f.size > MAX_SIZE) { setError('Max 10 MB'); return false; }
    setError(''); setFile(f); return true;
  }

  return {
    file, error, isDragging, inputRef,
    handleFile,
    handleDrop: (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); },
    handleDragOver: (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); },
    handleDragLeave: () => setIsDragging(false),
    clearFile: () => { setFile(null); setError(''); },
    openFileDialog: () => inputRef.current?.click(),
  };
}