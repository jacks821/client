import React from "react";
import {
    Box,
    Button,
    List,
    ListItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
} from "@chakra-ui/core";


export const ReportsModal = (props) => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    let reportList;
    if (props.reports == null) {
        reportList = <Text>This has not been reported</Text>
    } else {
        reportList = props.reports.map(report => (
            <ListItem>
                {report.issue}
            </ListItem>
        ))
    }
    return (
        <Box>
            <Button onClick={onOpen} my="3px" color="#142850" backgroundColor="#dae1e7">View Reports</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        Reports
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <List as="ol">
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