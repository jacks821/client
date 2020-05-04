import React, {useState} from "react";
import { useForm } from "react-hook-form";
import {
    Button,
    Input,
    FormLabel,
    useToast,
} from "@chakra-ui/core";
import {Container} from "../utils/Container"

const CreateCompany = (props) => {
    const [name, setName] = useState("");
    const handleChange = event => setName(event.target.value);
    const {handleSubmit, register, errors, formState} = useForm();
    const toast = useToast();

    function onSubmit() {
        let req = {name: name};
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
          description: `We created company ${name} for you`,
          status: "success",
          isClosable: true,
      })
    }


    return (
        <Container>
                
                  <form onSubmit={handleSubmit(onSubmit)} style={{margin: "auto",}}>
                    <FormLabel htmlFor="name">Company Name</FormLabel>
                    <Input onChange={handleChange} 
                        placeholder="Company Name" 
                        type="text" 
                        name="name"
                        size="sm"
                        ref={register({required: true})}
                    />
                    {errors.name && <p>Must provide a name</p>}
                    <Button 
                        position={"absolute"}
                        isLoading={formState.isSubmitting}
                        type="submit"
                    >
                        Add Company
                    </Button>
                  </form>
        </Container>
            
    );
}

export default CreateCompany;