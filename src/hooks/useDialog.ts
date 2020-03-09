import { useState } from 'react';

export const useDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const setOpen = () => setIsOpen(true);
  const setClose = () => setIsOpen(false);

  return { setOpen, setClose, isOpen };
};
