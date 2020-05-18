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
    Select,
    Text,
    useDisclosure,
    useToast
} from "@chakra-ui/core";
import "react-datepicker/dist/react-datepicker.css"
import DatePicker from "react-datepicker";

const formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}


export const AddPriorIncidentModal = (props) => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [, setValue] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const handleChange = event => setValue(event.target.value);
    const {handleSubmit, register, errors, formState} = useForm();
    const toast = useToast();
    const onSubmit = (data) => {
        let req = {
            date: formatDate(startDate),
            fall_type: data.fallType,
            attorney_name: data.attorneyName,
            location_id: props.locationId,
        };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        };
        let response = fetch("/company/location/priorincident", requestOptions)
            .then(response => console.log(response))
            .then(data => console.log(data));
        console.log(response);
        toast({
            title: "Prior Incident created",
            description: `We created this ${data.fallType} Prior Incident for you`,
            status: "success",
            isClosable: true,
        })
        onClose();
    };
    return (
    <Box>
        <Button onClick={onOpen} my={"5px"} display="inline">Add an Incident</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    Add An Incident
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                <FormLabel htmlFor="date">Date</FormLabel>
                <Box px={"5px"}>
                    <DatePicker selected={startDate} onChange={date=>setStartDate(date)}/>
                </Box>
                <FormLabel htmlFor="fallType">Incident Type</FormLabel>
                <Select 
                    onChange={handleChange}
                    placeholder="Slip or Trip?" 
                    name="fallType"
                    size="sm"
                    ref={register({pattern: /[st][lr]ip{1}/})}
                    px={"5px"}
                >
                    <option value="slip">Slip</option>
                    <option value="trip">Trip</option>
                </Select>
                {errors.fallType && <Box py={"2px"}><Icon name="warning" size="12px" color="red.500" display={"inline"} /><Text display={"inline"}>Choose a Fall Type</Text></Box>}
                <FormLabel htmlFor="attorneyName">Attorney Name</FormLabel>
                <Input 
                    onChange={handleChange}
                    placeholder="Who Handled the Case?" 
                    type="text" 
                    name="attorneyName"
                    size="sm"
                    ref={register({required: 'Must enter an Attorney Name'})}
                    px={"5px"}
                />
                
                <Button 
                    isLoading={formState.isSubmitting}
                    type="submit"
                    mt={"10px"}
                >
                    Add An Incident to This Location
                </Button>
              </form >
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