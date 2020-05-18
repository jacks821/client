import React, {useState} from "react";
import { useForm } from "react-hook-form";
import {
    Box,
    Button,
    FormLabel,
    Icon,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
    useToast
} from "@chakra-ui/core";


export const AddCompanyModal = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [, setValue] = useState("");
    const {handleSubmit, register, errors, formState} = useForm();
    const handleChange = event => setValue(event.target.value);
    const toast = useToast();
    const onSubmit = (data) => {
        let req = {name: data.name};
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        };
        let response = fetch("/company", requestOptions)
            .then(response => console.log(response))
            .then(data => console.log(data));
        console.log(response);
      toast({
          title: "Company created",
          description: `We created company ${data.name} for you`,
          status: "success",
          isClosable: true,
      })
        onClose();
    };
    return (
    <Box>
        <Button onClick={onOpen} my={"5px"}>Add a Company</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    Add A New Company
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                <form onSubmit={handleSubmit(onSubmit)} style={{margin: "auto",}}>
                    <FormLabel htmlFor="name">Company Name</FormLabel>
                    <Input onChange={handleChange} 
                        placeholder="Company Name" 
                        type="text" 
                        name="name"
                        size="sm"
                        ref={register({required: true})}
                        px={"5px"}
                    />
                    {errors.name && <Box py={"2px"}><Icon name="warning" size="12px" px={"2px"}color="red.500" display={"inline"} /><Text display={"inline"}>Must provide a name</Text></Box>}
                    <Button 
                        position={"absolute"}
                        mt={"10px"}
                        isLoading={formState.isSubmitting}
                        type="submit"
                    >
                        Add Company
                    </Button>
                  </form>
                </ModalBody>
                <ModalFooter>
                    <Button variantColor="blue" mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </Box>
    );
}