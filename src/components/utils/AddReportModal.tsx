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
import {handleErrors} from "./errorHandling";


export const AddReportModal = (props) => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [, setValue] = useState("");
    const {handleSubmit, register, formState} = useForm();
    const handleChange = event => setValue(event.target.value);
    const toast = useToast();
    async function onSubmit(data) {
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
        let response = fetch(`https://glacial-meadow-19107.herokuapp.com/report`, requestOptions)
                        .then(handleErrors)
                        .then(response => console.log("ok") )
                        .catch(error => console.log(error) );
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
        <Button onClick={onOpen} my={"2px"} color="#142850" backgroundColor="#dae1e7">Report</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader color="#142850">
                    Report this for Review
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <FormLabel htmlFor="author">Author</FormLabel>
                    <Box>
                    <Input
                        px={"5px"} 
                        onChange={handleChange}
                        placeholder="Who is Reporting This Incident?" 
                        type="text" 
                        name="author"
                        size="sm"
                        ref={register({required: true})}
                        borderColor="#DAE1E7"
                    />
                    </Box>
                    <FormLabel htmlFor="issue">Why are you reporting this incident?</FormLabel>
                    <Input 
                        px={"5px"}
                        onChange={handleChange}
                        placeholder="Issue?" 
                        type="text" 
                        name="issue"
                        size="sm"
                        ref={register({required: true})}
                        borderColor="#DAE1E7"
                    />

                    <Button 
                        isLoading={formState.isSubmitting}
                        type="submit"
                        my={"5px"}
                        color="#142850"
                        backgroundColor="#dae1e7"
                    >
                        Report This Incident
                    </Button>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="#142850" backgroundColor="#dae1e7" mr={3} onClick={onClose} my={"5px"}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </Box>
    );
}