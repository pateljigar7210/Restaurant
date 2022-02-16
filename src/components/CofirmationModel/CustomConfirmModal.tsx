import React from 'react';
import {Button, Modal, VStack, HStack, Text} from 'native-base';

type IProps = {
  open: boolean;
  message: JSX.Element | undefined;
  title: JSX.Element | undefined;
  submitLabel: string;
  cancelLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
  onClose: () => void;
};

function CustomConfirmModal(props: IProps) {
  const {open, message, title, submitLabel, cancelLabel, onCancel, onConfirm, onClose} = props;
  return (
    <Modal isOpen={open} onClose={onClose} size="lg">
      <Modal.Content maxWidth="350">
        {title && (
          <>
            <Modal.CloseButton onPress={onClose} />
            <Modal.Header>{title}</Modal.Header>
          </>
        )}

        <Modal.Body>
          <VStack space={3} pt={!title ? 3 : 0}>
            <HStack alignItems="center" justifyContent="space-between">
              <Text fontWeight="medium">{message}</Text>
            </HStack>
          </VStack>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group>
            <Button variant="ghost" colorScheme="blueGray" onPress={onCancel}>
              {cancelLabel}
            </Button>
            <Button onPress={onConfirm}>{submitLabel}</Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

export default CustomConfirmModal;
