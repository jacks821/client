import React, {useState} from "react";
import { useForm } from "react-hook-form";
import {
    Box,
    Button,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    useToast
} from "@chakra-ui/core";


export const AddReportModal = (props) => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [, setValue] = useState("");
    const {handleSubmit, register, formState} = useForm();
    const handleChange = event => setValue(event.target.value);
    const toast = useToast();
    const onSubmit = (data) => {
        let req = {
            author: data.author,
            issue: data.issue,
            id: props.reportedId,
            report_type: props.reportType,
        };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        };
        let response = fetch(`/report`, requestOptions)
            .then(response => console.log(response))
            .then(data => console.log(data));
        console.log(response);
        toast({
            title: "Report Created",
            description: `Thank you for reporting this issue.  We will review this entry for deletion.`,
            status: "success",
            isClosable: true,
        })
        onClose();
    };
    return (
    <Box>
        <Button onClick={onOpen}>Report</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    Report this for Review
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <FormLabel htmlFor="author">Author</FormLabel>
                    <Box>
                    <Input 
                        onChange={handleChange}
                        placeholder="Who is Reporting This Incident?" 
                        type="text" 
                        name="author"
                        size="sm"
                        ref={register({required: true})}
                    />
                    </Box>
                    <FormLabel htmlFor="issue">Why are you reporting this incident?</FormLabel>
                    <Input 
                        onChange={handleChange}
                        placeholder="Issue?" 
                        type="text" 
                        name="issue"
                        size="sm"
                        ref={register({required: true})}
                    />

                    <Button 
                        isLoading={formState.isSubmitting}
                        type="submit"
                    >
                        Report This Incident
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