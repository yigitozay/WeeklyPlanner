// Note.jsx
import React, { useState, useRef, useEffect } from 'react';
import styles from './Note.module.css'; 
import { faBan, faPalette, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Note = ({ onSave, existingNote, cancelEdit,date   }) => {
  const [noteText, setNoteText] = useState('');
  const [noteColor, setNoteColor] = useState('rgb(203, 190, 190)'); 
  const colorInputRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (noteText.trim()) {
      const noteToAdd = {
        content: noteText,
        date: date,
        color: noteColor, 
      };
      onSave(noteToAdd); 
      setNoteText('');
      setNoteColor('#ffffff');
    }
  };

  useEffect(() => {
    if (existingNote) {
      setNoteText(existingNote.text);
      setNoteColor(existingNote.color);
    }
  }, [existingNote]);
  const handleColorButtonClick = () => {
    colorInputRef.current.click(); 
  };

  return (
    <div className={styles.noteContainer} style={{ backgroundColor: noteColor }}>
    <form onSubmit={handleSubmit} className={styles.noteForm}>
      <textarea
        className={styles.noteInput}
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        placeholder="Type your note here..."
      />
      <input
        type="color"
        ref={colorInputRef}
        value={noteColor}
        onChange={(e) => setNoteColor(e.target.value)}
        className={styles.colorPicker}
        style={{ display: 'none' }}
      />
      <div className={styles.buttonsContainer}>
      <button type="button" className={styles.cancelButton} onClick={cancelEdit}>
  <FontAwesomeIcon icon={faBan} /> 
</button>
<button type="button" className={styles.changeColorButton} onClick={handleColorButtonClick}>
  <FontAwesomeIcon icon={faPalette} /> 
</button>
<button type="submit" className={styles.saveButton}>
  <FontAwesomeIcon icon={faSave} /> 
</button>
      </div>
    </form>
  </div>
  );
};

export default Note;
