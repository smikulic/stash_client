import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FormSubmit from '../../components/form-submit';
require('./dialog-wrapper.scss');

const customDialogStyle = {
  position: 'absolute',
  top: '5%',
  width: '50%',
  maxWidth: 'none',
  transform: 'translate(50%, 64px)',
};

class DialogWrapper extends Component {
  render() {
    const {
      open,
      onRequestClose,
      submitText,
      onSubmit,
      children,
    } = this.props;

    return (
      <Dialog
        modal={false}
        bodyClassName="dialog-body"
        contentStyle={customDialogStyle}
        open={open}
        onRequestClose={onRequestClose}
      >
        <form onSubmit={onSubmit}>
          {children}
          <div className="row">
            <div className="col-xs-5 col-xs-push-7">
              <FormSubmit text={submitText} />
            </div>
          </div>
        </form>
      </Dialog>
    );
  }
}

export default DialogWrapper;
