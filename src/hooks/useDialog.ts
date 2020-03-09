import { useState } from 'react';

export function useDialog<T>() {
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
