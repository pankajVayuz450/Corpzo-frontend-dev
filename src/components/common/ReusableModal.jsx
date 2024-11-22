import React from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from '@material-tailwind/react';
import { TailSpin } from 'react-loader-spinner';

const ReusableModal = ({ isOpen, onClose, title, children, onConfirm, confirmText = 'Confirm', cancelText = 'Cancel', size = "xs", isConfirmVisible = false, loader }) => {
  return (
    <Dialog open={isOpen} handler={onClose} size={size}>
      <DialogHeader>{title}</DialogHeader>
      <DialogBody divider>
        {children}
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" onClick={onClose} className="mr-2">
          {cancelText}
        </Button>
        {/* Confirm button now triggers the onConfirm function */}
        {/* {isConfirmVisible && <Button variant="text" color="green" onClick={onConfirm}>
          {confirmText}
        </Button>} */}
        {isConfirmVisible && (
          <Button
            variant="text"
            color="green"
            onClick={onConfirm}
            disabled={loader} // Disable the button while loading (optional)
          >
            {loader ? (
              <div className="flex items-center">
                <TailSpin/>
              </div>
            ) : (
              confirmText
            )}
          </Button>
        )}

      </DialogFooter>
    </Dialog>
  );
};

export default ReusableModal;
