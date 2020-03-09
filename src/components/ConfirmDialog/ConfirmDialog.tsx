import React, { FC } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, DialogContentText, useTheme, useMediaQuery,
} from '@material-ui/core';

interface Props {
  title?: string;
  isOpen: boolean;
  close: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
}

export const ConfirmDialog: FC<Props> = ({
  title, children, isOpen, close, onConfirm,
  confirmText = 'Potwierdź', cancelText = 'Anuluj',
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
        <Button
          onClick={() => close()}
          color="inherit"
        >
          {cancelText}
        </Button>
        <Button
          onClick={() => {
            close();
            onConfirm();
          }}
          color="secondary"
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
