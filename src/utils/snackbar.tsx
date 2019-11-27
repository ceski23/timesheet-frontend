// https://github.com/iamhosseindhv/notistack/issues/30#issuecomment-542863653

import { useSnackbar, VariantType, WithSnackbarProps } from 'notistack';
import React from 'react';

interface Props {
  setUseSnackbarRef: (showSnackbar: WithSnackbarProps) => void;
}

const InnerSnackbarUtilsConfigurator: React.FC<Props> = (props: Props) => {
  // eslint-disable-next-line react/destructuring-assignment
  props.setUseSnackbarRef(useSnackbar());
  return null;
};

let useSnackbarRef: WithSnackbarProps;
const setUseSnackbarRef = (useSnackbarRefProp: WithSnackbarProps) => {
  useSnackbarRef = useSnackbarRefProp;
};

export const SnackbarUtilsConfigurator = () => (
  <InnerSnackbarUtilsConfigurator setUseSnackbarRef={setUseSnackbarRef} />
);

export default {
  success(msg: string) {
    this.toast(msg, 'success');
  },
  warning(msg: string) {
    this.toast(msg, 'warning');
  },
  info(msg: string) {
    this.toast(msg, 'info');
  },
  error(msg: string) {
    this.toast(msg, 'error');
  },
  toast(msg: string, variant: VariantType = 'default') {
    useSnackbarRef.enqueueSnackbar(msg, { variant });
  },
};
