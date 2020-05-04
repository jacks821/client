import React, {useState} from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import {
    Box,
    Button,
    Input,
    FormLabel,
    Select,
    useToast,
} from "@chakra-ui/core";
import "react-datepicker/dist/react-datepicker.css"

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

const CreatePriorIncident = (props) => {
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
    };
    return (
        <div>
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormLabel htmlFor="date">Date</FormLabel>
                <Box>
                    <DatePicker selected={startDate} onChange={date=>setStartDate(date)}/>
                </Box>
                <FormLabel htmlFor="fallType">Incident Type</FormLabel>
                <Select 
                    onChange={handleChange}
                    placeholder="Slip or Trip?" 
                    name="fallType"
                    size="sm"
                    ref={register({pattern: /[st][lr]ip{1}/})}
                >
                    <option value="slip">Slip</option>
                    <option value="trip">Trip</option>
                </Select>
                {errors.fallType && <p>Choose Slip or Trip</p>}
                <FormLabel htmlFor="attorneyName">Attorney Name</FormLabel>
                <Input 
                    onChange={handleChange}
                    placeholder="Who Handled the Case?" 
                    type="text" 
                    name="attorneyName"
                    size="sm"
                    ref={register({required: 'Must enter an Attorney Name'})}
                />
                
                <Button 
                    isLoading={formState.isSubmitting}
                    type="submit"
                >
                    Add An Incident to This Location
                </Button>
              </form >
              </div>
        </div>
    );
}

export default CreatePriorIncident;