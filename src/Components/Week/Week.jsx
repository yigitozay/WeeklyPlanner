import React, { useEffect, useState } from "react";
import Day from './Day'; 
import styles from './WeekView.module.css';
import {getStartOfWeek ,formatDate} from  "../../dateutils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Paper, Grid, Typography, Button } from '@mui/material';
import Box from '@mui/material/Box';
import { addNote as saveNoteToFirebase, getNotes } from '../../firebase'; 
import { auth } from "../../firebase";

  const WeekView = ({onSignOut}) => {
    const [currentStartDate, setCurrentStartDate] = useState(getStartOfWeek(new Date()));
    const [notes, setNotes] = useState([]); 

    const goToNextWeek = () => {
      setCurrentStartDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth(), prevDate.getDate() + 7));
    };
  
    const goToPreviousWeek = () => {
      setCurrentStartDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth(), prevDate.getDate() - 7));
    };
    const updateNotesState = (newNotes) => {
      setNotes(newNotes);
    };
    const days = Array.from({ length: 7 }, (_, i) => {
      return new Date(currentStartDate.getFullYear(), currentStartDate.getMonth(), currentStartDate.getDate() + i);

    });
    const handleAddNote = async (newNoteContent) => {
      const user = auth.currentUser;
      if (user) {
        const newNote = {
          content: newNoteContent,
          date: formatDate(newNoteContent.date), 
          userId: user.uid,
        };
    
        const savedNote = await saveNoteToFirebase(newNote);
        
        const updatedNotes = await getNotes(user.uid);
        setNotes(updatedNotes);
      } else {
        console.log("User is not logged in.");
      }
    };
    
    const getDayOfWeek = (date) => {
      return date.toLocaleDateString('default', { weekday: 'long' });
    };
    return (
      <div className={styles.pageBackground}>
      <Paper elevation={24} className={styles.newStyles} sx={{ padding: 4, margin: 'auto', maxWidth: 1300 }}>
      <Grid container spacing={2} alignItems="center" justifyContent="center" >
        <Grid item>
          <Button  onClick={goToPreviousWeek} sx={{ minWidth: 'auto' }}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </Button >
        </Grid>
        <Grid item xs>
          <Typography variant="h4" align="center"  sx={{ mx: 2 }}>
            Week: {formatDate(days[0])} - {formatDate(days[6])}
          </Typography>
        </Grid>
        <Grid item>
          <Button  onClick={goToNextWeek} sx={{ minWidth: 'auto' }}>
            <FontAwesomeIcon icon={faArrowRight} />
          </Button >
        </Grid>
        <Grid item xs={12}>
      <Box display="flex" justifyContent="flex-end">
      <Button onClick={onSignOut} style={{ backgroundColor: '#ff4b5a', color: 'white', padding: '8px 16px', marginRight: '20px', borderRadius: '20px' }} variant="outlined" color="secondary">
          Logout
        </Button>
      </Box>
    </Grid>
      </Grid>
      
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
  {days.map((day, index) => (
    <Grid key={index} item xs={12} sm={6} md={4} lg={1.714}>
      <Paper elevation={3} sx={{ padding: 0.25 }}>
        <Box sx={{
          padding: '8px',
          backgroundColor: 'background.paper',
          borderRadius: '8px',
          boxShadow: 1,
          textAlign: 'center',
          marginBottom: '16px'
        }}>
          <Typography variant="h6" component="div">
            {day.toLocaleDateString('default', { weekday: 'long' })} 
          </Typography>
          <Typography variant="subtitle1" component="div">
            {formatDate(day)} 
          </Typography>
        </Box>
        <Day 
          date={day} 
          notes={notes.filter(note => formatDate(new Date(note.date)) === formatDate(day))} 
          addNote={handleAddNote} 
          updateNotes = {updateNotesState}
        />
      </Paper>
    </Grid>
  ))}
</Grid>
    </Paper>
    </div>
    );
  };
  
  export default WeekView;