import React, { useEffect, useRef, useState } from 'react';
import Note from '../Note/Note';
import styles from './Day.module.css';
import { formatDate } from '../../dateutils'; 
import { auth, addNote as saveNoteToFirebase, getNotes } from '../../firebase'; 

const Day = ({ date,notes,addNote,updateNotes }) => {
  const [items, setItems] = useState([]);
  const [addingNote, setAddingNote] = useState(false); 
  const [editingIndex, setEditingIndex] = useState(null); 
  const noteRef = useRef();
  const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());
  const [triggerFetch, setTriggerFetch] = useState(false);

  const handleAddNote = async (newNoteContent) => {
    const user = auth.currentUser;
    if (user) {
      const formattedDate = formatDate(new Date(newNoteContent.date)); 
      const newNote = {
        content: newNoteContent.content,
        date: formattedDate,
        userId: user.uid,
        color: newNoteContent.color, 

      };
  
      try {
        const savedNote = await saveNoteToFirebase(newNote);
        updateNotes((prevNotes) => [
          ...prevNotes,
          { ...newNote, id: savedNote.id },

        ]);
        setTriggerFetch(prev => !prev); 

      } catch (error) {
        console.error("Failed to add note:", error);
      }
    } else {
      console.log("User is not logged in.");
    }
  };
  
  useEffect(() => {
    function handleClickOutside(event) {
      if (noteRef.current && !noteRef.current.contains(event.target)) {
        setLastInteractionTime(Date.now()); 

        setAddingNote(false);
        setEditingIndex(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  

  useEffect(() => {
    const fetchNotes = async () => {
      const user = auth.currentUser;
      if (user) {
        const userNotes = await getNotes(user.uid);
        updateNotes(userNotes)      }
    };

    fetchNotes();
  }, [triggerFetch]);
  const handleAreaClick = () => {
    if (!addingNote && editingIndex === null && (Date.now() - lastInteractionTime > 200)) {
      setAddingNote(true);
    }
  };
  const handleEditClick = (index, event) => {
    event.stopPropagation();
    setEditingIndex(index);
    setAddingNote(true);
  };
  const handleCancelEdit = () => {
    setEditingIndex(null);
    setAddingNote(false);
  };
  const dayNotes = notes.filter(note => {
    const noteDate = new Date(note.date);
    return noteDate.toDateString() === date.toDateString();
  });
  console.log('Rendering notes for the day:', notes);

  return (
    <div className={styles.itemsContainer} onClick={handleAreaClick}>
    {notes.map((note, index) => (
      <div key={note.id || index} className={styles.item} style={{ backgroundColor: note.color }} onClick={(event) => handleEditClick(index, event)}>
            {console.log('Note content:', note.content.text)}

            {note.content.text ? note.content.text : note.content}
      </div>
    ))}
      {(addingNote || editingIndex !== null) && (
        <div ref={noteRef}>
            <Note
          onSave={handleAddNote}
          date={date}
          existingNote={editingIndex !== null ? items[editingIndex] : null}
          cancelEdit={handleCancelEdit}
          />
        </div>
      
      )}
    </div>
  );
};


export default Day;
