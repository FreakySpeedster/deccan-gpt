import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ShareChatModal = ({ open, onClose, generatedLink }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 sec
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Share Conversation</DialogTitle>

      <DialogContent>
        <Typography sx={{ mb: 2 }}>
          Share this link to allow others to view your conversation.
        </Typography>

        <TextField
          label="Shareable Link"
          value={generatedLink}
          fullWidth
          InputProps={{
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleCopy} edge="end" color={copied ? 'success' : 'primary'}>
                  {copied ? <CheckCircleIcon /> : <ContentCopyIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {copied && (
          <Typography variant="caption" color="success.main" sx={{ mt: 1, display: 'block' }}>
            Link copied!
          </Typography>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShareChatModal;
