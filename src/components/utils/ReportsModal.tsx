import React from "react";
import {
    Box,
    Button,
    List,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from "@chakra-ui/core";


export const ReportsModal = (props) => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    let reportList;
    if (props.reports == null) {
        reportList = <h2>This has not been reported</h2>
    } else {
        reportList = props.reports.map(report => (
            <li key={report.id}>
                {report.issue}
            </li>
        ))
    }
    return (
        <Box>
            <Button onClick={onOpen} my="3px" display={"inline-block"}>View Reports</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        Reports
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <List>
                            {reportList}
                        </List>
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