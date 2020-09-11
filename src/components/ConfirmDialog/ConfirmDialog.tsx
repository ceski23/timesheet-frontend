import React, { FC, useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, DialogContentText, useTheme, useMediaQuery, CircularProgress, styled,
} from '@material-ui/core';

// #region styles
const StyledProgress = styled(CircularProgress)(({ theme }) => ({
  marginRight: theme.spacing(1),
}));
// #endregion

interface Props {
  title?: string;
  isOpen: boolean;
  close: () => void;
  onConfirm: () => Promise<unknown> | void;
  confirmText?: string;
  cancelText?: string;
}

export const ConfirmDialog: FC<Props> = ({
  title, children, isOpen, close, onConfirm,
  confirmText = 'Potwierdź', cancelText = 'Anuluj',
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [isLoading, setLoading] = useState(false);

  const handleConfirmClick = async () => {
    setLoading(true);
    try {
      await Promise.resolve(onConfirm());
      close();
    } catch (error) {
      // Dummy error
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => close()}
      aria-labelledby="confirm-dialog"
      fullScreen={fullScreen}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{children}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => close()} color="inherit">
          {cancelText}
        </Button>
        <Button onClick={handleConfirmClick} color="secondary">
          {isLoading && <StyledProgress color="secondary" size={16} />}
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
