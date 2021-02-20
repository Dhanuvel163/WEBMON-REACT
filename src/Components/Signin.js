import React from 'react'
import {
  Button,FormControl,FormLabel,Heading,Input,Stack,Divider
} from '@chakra-ui/react';
import {
  Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton,useDisclosure
} from "@chakra-ui/react"
export default function Signin() {
  const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>Sign in to your account</Heading>
          <Divider/>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" />
          </FormControl>
          <Stack spacing={6}>
            <Button colorScheme={'blue'} variant={'solid'}>
              Sign in
            </Button>
            <Divider/>
            <Button onClick={onOpen} colorScheme={'green'} variant={'solid'}>
              Sign up
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Signup</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <FormControl id="email">
                    <FormLabel>Username</FormLabel>
                    <Input type="email" />
                  </FormControl>
                  <FormControl id="email">
                    <FormLabel>Email address</FormLabel>
                    <Input type="email" />
                  </FormControl>
                  <FormControl id="password">
                    <FormLabel>Password</FormLabel>
                    <Input type="password" />
                  </FormControl>
                  <FormControl id="password">
                    <FormLabel>Password</FormLabel>
                    <Input type="password" />
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button variant="ghost" colorScheme="red" mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button colorScheme={'green'}>Signup</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Stack>
        </Stack> 
    )
}
