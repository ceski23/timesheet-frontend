import { useState } from 'react';

export function useDialog<T>(): DialogHook<T> {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<T>();

  const setOpen = (args?: T) => {
    setIsOpen(true);
    setData(args);
  };

  const setClose = () => setIsOpen(false);

  return {
    setOpen, setClose, isOpen, data,
  };
}

export interface DialogHook<T> {
  setOpen: (data?: T) => void;
  setClose: () => void;
  isOpen: boolean;
  data?: T;
}
