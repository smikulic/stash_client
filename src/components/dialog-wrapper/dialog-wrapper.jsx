import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import FormSubmit from '../../components/form-submit';
require('./dialog-wrapper.scss');

export default function DialogWrapper({ open, onRequestClose, submitText, onSubmit, children }) {
  return (
    <Dialog
      fullWidth={true}
      maxWidth="xs"
      open={open}
      onClose={onRequestClose}
    >
      <form
        className="dialog-body-form"
        autoComplete="off"
        onSubmit={onSubmit}
      >
        {children}
        <FormSubmit text={submitText} />
      </form>
    </Dialog>
  );
}
