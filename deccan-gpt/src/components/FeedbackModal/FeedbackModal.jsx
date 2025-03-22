import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Rating, Typography } from '@mui/material';

const FeedbackModal = ({ open, onClose, onSubmit }) => {
  const [overallRating, setOverallRating] = useState(0);
  const [subjectivefeedback, setSubjectiveFeedback] = useState('');

  const handleSubmit = () => {
    // Do something with feedback
    onSubmit({ overallRating, subjectivefeedback });
    // Reset fields (optional)
    setOverallRating(0);
    setSubjectiveFeedback('');
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>We value your feedback!</DialogTitle>
      <DialogContent>
        <Typography>How was your experience?</Typography>
        <Rating
          name="user-rating"
          value={overallRating}
          onChange={(event, newValue) => setOverallRating(newValue)}
        />
        <TextField
          margin="dense"
          label="Additional feedback"
          multiline
          rows={4}
          fullWidth
          value={subjectivefeedback}
          onChange={(e) => setSubjectiveFeedback(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={overallRating === 0}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FeedbackModal;