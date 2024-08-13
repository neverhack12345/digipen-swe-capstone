"use client";

import { Button } from "@nextui-org/button";
import { NavbarItem } from "@nextui-org/navbar";

import { logoutUser } from "@/app/api/route";
import { 
  Modal, ModalBody, ModalContent, ModalFooter, 
  ModalHeader, useDisclosure } from "@nextui-org/react";

export const LogoutButton = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <NavbarItem>
      <Button
        color="default"
        radius="full"
        size="md"
        variant="bordered"
        onPress={onOpen}
      >
        Log out
      </Button>
      <Modal isOpen={isOpen} placement="top" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log out</ModalHeader>
              <ModalBody>
                <p>Are you sure you want to log out?</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onClick={async () => {
                    await logoutUser();
                  }}
                >
                  Log out
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </NavbarItem>
  );
};
