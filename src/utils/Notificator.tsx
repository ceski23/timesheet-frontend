// https://github.com/iamhosseindhv/notistack/issues/30#issuecomment-542863653

import {
  useSnackbar, VariantType, WithSnackbarProps, OptionsObject,
} from 'notistack';
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
  success(msg: string, options?: OptionsObject) {
    this.toast(msg, 'success', options);
  },
  warning(msg: string, options?: OptionsObject) {
    this.toast(msg, 'warning', options);
  },
  info(msg: string, options?: OptionsObject) {
    this.toast(msg, 'info', options);
  },
  error(msg: string, options?: OptionsObject) {
    this.toast(msg, 'error', options);
  },
  toast(msg: string, variant: VariantType = 'default', options?: OptionsObject) {
    useSnackbarRef.enqueueSnackbar(msg, {
      variant,
      style: { whiteSpace: 'pre-line' },
      ...options,
    });
  },
};
