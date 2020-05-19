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
import {handleErrors} from "./errorHandling";

const states = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming']


export const AddLocationModal = (props) => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [, setValue] = useState("");
    const toast = useToast();
    const handleChange = event => setValue(event.target.value);
    const {handleSubmit, register, errors, formState} = useForm();
    const onSubmit = data => {
        let req = {
            street_number: data.streetNumber,
            street: data.street,
            city: data.city,
            state: data.state,
            zip_code: data.zipCode,
            store_number: data.storeNumber,
            company_id:  props.companyId,
        };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        };
        let response = fetch("https://glacial-meadow-19107.herokuapp.com/company/location", requestOptions)
            .then(handleErrors)
            .then(response => console.log("ok") )
            .catch(error => console.log(error) );
            toast({
                title: "Location created",
                description: `We created ${data.storeNumbe} for you`,
                status: "success",
                isClosable: true,
            })
              onClose();
    };
    return (
    <Box>
        <Button onClick={onOpen} mt={"5px"} mb={"2.5px"} color="#142850" backgroundColor="#dae1e7" >Add a Location</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader color="#142850">
                    Add A New Location
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                <FormLabel htmlFor="streetNumber" color="#142850">Street Number</FormLabel>
                <Input 
                    onChange={handleChange}
                    placeholder="Street Number" 
                    type="text" 
                    name="streetNumber"
                    size="sm"
                    ref={register({required: true})}
                    px={"5px"}
                    borderColor="#DAE1E7"
                />
                <FormLabel htmlFor="street" color="#142850">Street Name</FormLabel>
                <Input 
                    onChange={handleChange}
                    placeholder="Street Name" 
                    type="text" 
                    name="street"
                    size="sm"
                    ref={register({required: true})}
                    px={"5px"}
                    borderColor="#DAE1E7"
                />
                <FormLabel htmlFor="city" color="#142850">City</FormLabel>
                <Input 
                    onChange={handleChange}
                    placeholder="City" 
                    type="text" 
                    name="city"
                    size="sm"
                    ref={register({required: true})}
                    px={"5px"}
                    borderColor="#DAE1E7"
                />
                <FormLabel htmlFor="state" color="#142850">State</FormLabel>
                <Select 
                    onChange={handleChange}
                    placeholder="State" 
                    name="state"
                    size="sm"
                    ref={register({required: true, validate: value => states.includes(value)})}
                    px={"5px"}
                    borderColor="#DAE1E7"
                >
                    {states.map(state =>
                        <option value={state} color="#142850">{state}</option>
                    )}
                </Select>
                {errors.state && <Box py={"2px"}><Icon name="warning" size="12px" color="red.500" display={"inline"} /><Text display={"inline"}>Choose a State</Text></Box>}
                <FormLabel htmlFor="zipCode" color="#142850">Zip Code</FormLabel>
                <Input 
                    onChange={handleChange}
                    placeholder="Zip Code" 
                    type="text" 
                    name="zipCode"
                    size="sm"
                    ref={register({required: true, pattern: {value: /[0-9]{5}/, message: "Must have 5 Numerical Digits"}})}
                    px={"5px"}
                    borderColor="#DAE1E7"
                />
                {errors.zipCode && <Box py={"2px"}><Icon name="warning" size="12px" color="red.500" display={"inline"} /><Text display={"inline"}>Need 5 Numeric Digits</Text></Box>}
                <FormLabel htmlFor="storeNumber" color="#142850">Store Number</FormLabel>
                <Input 
                    onChange={handleChange}
                    placeholder="Store Number" 
                    type="text" 
                    name="storeNumber"
                    size="sm"
                    ref={register({required: true})}
                    px={"5px"}
                    borderColor="#DAE1E7"
                />
                <Button 
                    isLoading={formState.isSubmitting}
                    type="submit"
                    my={"10px"}
                    color="#142850" backgroundColor="#dae1e7"
                >
                    Add Location
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