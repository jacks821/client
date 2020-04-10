import React, {useState} from "react";
import { useForm } from "react-hook-form";
import {
    Button,
    Input,
    FormLabel,
    useToast,
} from "@chakra-ui/core";


const CreatePriorIncident = (props) => {
    const {drizzle, drizzleState, locationId} = props;
    const contract = drizzle.contracts.PriorIncidents;
    const [value, setValue] = useState("");
    const handleChange = event => setValue(event.target.value);
    const {handleSubmit, errors, register, formState} = useForm();
    const toast = useToast();
    const onSubmit = (data) => {
        console.log(data);
        const date = data.date;
        const fallType = data.fallType;
        const attorneyName = data.attorneyName;
        const stackId = contract.methods["createPriorIncident"].cacheSend(date, fallType, attorneyName, locationId, { from: drizzleState.accounts[0], gas: 5000000});
        console.log(stackId);
        toast({
            title: "Prior Incident created",
            description: `We created your Prior Incident for you`,
            status: "success",
            isClosable: true,
        })
    };
    return (
        <div>
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormLabel htmlFor="date">Date</FormLabel>
                <Input 
                    onChange={handleChange}
                    placeholder="Enter Date" 
                    type="text" 
                    name="date"
                    size="sm"
                    ref={register}
                />
                <FormLabel htmlFor="fallType">Incident Type</FormLabel>
                <Input 
                    onChange={handleChange}
                    placeholder="Slip or Trip?" 
                    type="text" 
                    name="fallType"
                    size="sm"
                    ref={register}
                />
                <FormLabel htmlFor="attorneyName">Attorney Name</FormLabel>
                <Input 
                    onChange={handleChange}
                    placeholder="Who Handled the Case?" 
                    type="text" 
                    name="attorneyName"
                    size="sm"
                    ref={register}
                />
                
                <Button 
                    isLoading={formState.isSubmitting}
                    type="submit"
                >
                    Add An Incident to This Location
                </Button>
              </form>
              </div>
        </div>
    );
}

export default CreatePriorIncident;