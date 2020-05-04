import React, {useState} from "react";
import { useForm } from "react-hook-form";
import {
    Button,
    Box,
    Input,
    FormLabel,
    Select,
    useToast,
} from "@chakra-ui/core";

interface CreateLocationProps {
    id: any,
}

const states = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming']


const CreateLocation = (props) => {
    const [, setValue] = useState("");
    const toast = useToast();
    const handleChange = event => setValue(event.target.value);
    const {handleSubmit, register, errors, formState} = useForm();
    const onSubmit = (data) => {
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
        let response = fetch("/company/location", requestOptions)
            .then(response => console.log(response))
            .then(data => console.log(data));
        console.log(response);
        toast({
            title: "Location created",
            description: `We created location #${data.storeNumber} for you`,
            status: "success",
            isClosable: true,
        })
    };
    return (
        <Box maxW="xl" mx="auto" textAlign="center">
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormLabel htmlFor="streetNumber">Street Number</FormLabel>
                <Input 
                    onChange={handleChange}
                    placeholder="Street Number" 
                    type="text" 
                    name="streetNumber"
                    size="sm"
                    ref={register({required: true})}
                />
                <FormLabel htmlFor="street">Street Name</FormLabel>
                <Input 
                    onChange={handleChange}
                    placeholder="Street Name" 
                    type="text" 
                    name="street"
                    size="sm"
                    ref={register({required: true})}
                />
                <FormLabel htmlFor="city">City</FormLabel>
                <Input 
                    onChange={handleChange}
                    placeholder="City" 
                    type="text" 
                    name="city"
                    size="sm"
                    ref={register({required: true})}
                />
                <FormLabel htmlFor="state">State</FormLabel>
                <Select 
                    onChange={handleChange}
                    placeholder="State" 
                    name="state"
                    size="sm"
                    ref={register({required: true, validate: value => states.includes(value)})}
                >
                    {states.map(state =>
                        <option value={state}>{state}</option>
                    )}
                </Select>
                {errors.state && <p>Choose a State</p>}
                <FormLabel htmlFor="zipCode">Zip Code</FormLabel>
                <Input 
                    onChange={handleChange}
                    placeholder="Zip Code" 
                    type="text" 
                    name="zipCode"
                    size="sm"
                    ref={register({required: true, pattern: {value: /[0-9]{5}/, message: "Must have 5 Numerical Digits"}})}
                />
                {errors.zipCode && <p>Need 5 Numeric Digits</p>}
                <FormLabel htmlFor="storeNumber">Store Number</FormLabel>
                <Input 
                    onChange={handleChange}
                    placeholder="Store Number" 
                    type="text" 
                    name="storeNumber"
                    size="sm"
                    ref={register({required: true})}
                />
                <Button 
                    isLoading={formState.isSubmitting}
                    type="submit"
                    mt={"10px"}
                >
                    Add Location
                </Button>
              </form>
        </Box>
    );
}

export default CreateLocation;