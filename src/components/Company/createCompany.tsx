import React, {useState} from "react";
import { useForm } from "react-hook-form";
import {
    Button,
    Box,
    Input,
    FormLabel,
    useToast,
} from "@chakra-ui/core";

const CreateCompany = (props) => {
    const {drizzle, drizzleState} = props;
    const contract = drizzle.contracts.PriorIncidents;
    const [value, setValue] = useState("");
    const handleChange = event => setValue(event.target.value);
    const {handleSubmit, errors, register, formState} = useForm();
    const toast = useToast();

    function onSubmit() {
        console.log(value);
      const stackId = contract.methods["createCompany"].cacheSend(value, {
          from: drizzleState.accounts[0]
      });
      console.log(stackId);
      toast({
          title: "Company created",
          description: `We created company ${value} for you`,
          status: "success",
          isClosable: true,
      })
    }

    return (
        <Box textAlign="center"
            height={"50vh"}
            width={"50vw"}>

              <form onSubmit={handleSubmit(onSubmit)} style={{display: "inline-block", margin: "auto",}}>
                <FormLabel htmlFor="name">Company Name</FormLabel>
                <Input
                    left={0}
                    width={"50vw"}
                    position={"absolute"}
                    top="50%"
                />
                <Button 
                    position={"absolute"}
                    isLoading={formState.isSubmitting}
                    type="submit"
                >
                    Add Company
                </Button>
              </form>
        </Box>
            
    );
}

export default CreateCompany;