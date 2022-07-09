import { Modal, Button, Group, Text } from "@mantine/core";

interface DangerousActionModalProps {
  opened: boolean;
  message: string;
  title: string;
  confirmText?: string;
  cancelText?: string;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export const DangerousActionModal = ({
  opened,
  onClose,
  onConfirm,
  title,
  message,
  cancelText = "No",
  confirmText = "Yes",
}: DangerousActionModalProps) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={title}
      closeButtonLabel={cancelText}
    >
      <Text size="sm">{message}</Text>
      <Group mt="md" position="right" spacing="sm">
        <Button variant="outline" onClick={onClose}>
          {cancelText}
        </Button>
        <Button color="red" onClick={onConfirm}>
          {confirmText}
        </Button>
      </Group>
    </Modal>
  );
};
