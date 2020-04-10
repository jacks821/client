import React, {useState} from "react";
import { useForm } from "react-hook-form";
import {
    Button,
    Input,
    FormLabel,
    useToast,
} from "@chakra-ui/core";

interface CreateLocationProps {
    drizzle: any,
    drizzleState: any,
    id: any,
}

const CreateLocation = (props) => {
    const {drizzle, drizzleState, companyId} = props;
    const contract = drizzle.contracts.PriorIncidents;
    const [, setValue] = useState("");
    const toast = useToast();
    const handleChange = event => setValue(event.target.value);
    const {handleSubmit, errors, register, formState} = useForm();
    const onSubmit = (data) => {
        console.log(data);
        const streetNumber = data.streetNumber;
        const street = data.street;
        const city = data.city;
        const state = data.state;
        const zipCode = data.zipCode;
        const storeNumber = data.storeNumber;
        const stackId = contract.methods["createLocation"].cacheSend(streetNumber, street, city, state, zipCode, storeNumber, companyId, { from: drizzleState.accounts[0], gas: 5000000});
        console.log(stackId);
        toast({
            title: "Location created",
            description: `We created location #${data.storeNumber} for you`,
            status: "success",
            isClosable: true,
        })
    };
    return (
        <div>
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormLabel htmlFor="streetNumber">Street Number</FormLabel>
                <Input 
                    onChange={handleChange}
                    placeholder="Street Number" 
                    type="text" 
                    name="streetNumber"
                    size="sm"
                    ref={register}
                />
                <FormLabel htmlFor="street">Street Name</FormLabel>
                <Input 
                    onChange={handleChange}
                    placeholder="Street Name" 
                    type="text" 
                    name="street"
                    size="sm"
                    ref={register}
                />
                <FormLabel htmlFor="city">City</FormLabel>
                <Input 
                    onChange={handleChange}
                    placeholder="City" 
                    type="text" 
                    name="city"
                    size="sm"
                    ref={register}
                />
                <FormLabel htmlFor="state">State</FormLabel>
                <Input 
                    onChange={handleChange}
                    placeholder="State" 
                    type="text" 
                    name="state"
                    size="sm"
                    ref={register}
                />
                <FormLabel htmlFor="zipCode">Zip Code</FormLabel>
                <Input 
                    onChange={handleChange}
                    placeholder="Zip Code" 
                    type="text" 
                    name="zipCode"
                    size="sm"
                    ref={register}
                />
                <FormLabel htmlFor="storeNumber">Store Number</FormLabel>
                <Input 
                    onChange={handleChange}
                    placeholder="Store Number" 
                    type="text" 
                    name="storeNumber"
                    size="sm"
                    ref={register}
                />
                <Button 
                    isLoading={formState.isSubmitting}
                    type="submit"
                >
                    Add Location
                </Button>
              </form>
              </div>
        </div>
    );
}

export default CreateLocation;