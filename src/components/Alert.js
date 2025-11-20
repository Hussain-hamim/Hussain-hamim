import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useAlertContext } from "../context/alertContext";
import { useRef } from "react";

function Alert() {
  const { isOpen, type, message, onClose } = useAlertContext();
  const cancelRef = useRef();
  const isSuccess = type === "success";

  const handleClose = () => {
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={handleClose}
      closeOnOverlayClick={true}
      closeOnEsc={true}
      isCentered
      motionPreset="slideInBottom"
    >
      <AlertDialogOverlay>
        <AlertDialogContent
          py={4}
          backgroundColor={isSuccess ? "#81C784" : "#FF8A65"}
        >
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {isSuccess ? "All good!" : "Oops!"}
          </AlertDialogHeader>
          <AlertDialogBody>{message}</AlertDialogBody>
          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              onClick={handleClose}
              colorScheme={isSuccess ? "green" : "orange"}
              variant="solid"
              ml={3}
              type="button"
              zIndex={1000}
              position="relative"
              cursor="pointer"
              _hover={{
                opacity: 0.8,
              }}
            >
              Close
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

export default Alert;
