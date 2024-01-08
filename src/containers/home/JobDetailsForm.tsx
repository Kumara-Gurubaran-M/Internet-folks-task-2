import { Button, Flex, Box } from "@chakra-ui/react";
import React,{useEffect} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormInput from "../../components/formComponents/FormInput";
import { IJobDetails } from "../../interface/forms";



interface JobDetailsFormProps {
  formValues2: IJobDetails;
  setFormValues2: React.Dispatch<React.SetStateAction<IJobDetails>>;
  handleTabChange: (index: number) => void;
  formKey: string;
}

const JobDetailsForm: React.FC<JobDetailsFormProps> = ({formValues2,setFormValues2,handleTabChange,formKey}) => {
  

  const { handleChange, errors, touched, handleBlur, handleSubmit, values,isValid,submitForm} =
    useFormik<IJobDetails>({
      initialValues:formValues2,
      validationSchema: Yup.object().shape({
        jobTitle: Yup.string().required("Job Title is required"),
        jobDetails: Yup.string().required("Job Details is required"),
        jobLocation: Yup.string().required("Job Location is required"),
        jobPosition: Yup.string().required("Job position is required"),
      }),
      
      onSubmit: (values) => {
        setFormValues2(values);
      },
    });
    
    const handleNextClick =  () => {
      if ( values.jobTitle !== "" && values.jobDetails !== "" && values.jobLocation !== "") {
        handleTabChange(2);
    }
    };
  
    useEffect(() => {
      setFormValues2(values);
    }, [values, setFormValues2]);

    useEffect(() => {
      setFormValues2(formValues2);
    }, [formValues2]);
    


  return (
    <Box width="100%" as="form" onSubmit={handleSubmit}>
      <Box width="100%">
        <FormInput
          label="Job Title"
          placeholder="Enter job title"
          name="jobTitle"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.jobTitle}
          error={errors?.jobTitle}
          touched={touched?.jobTitle}
        />
        <FormInput
          label="Job Details"
          placeholder="Enter job details"
          name="jobDetails"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.jobDetails}
          error={errors?.jobDetails}
          touched={touched?.jobDetails}
        />
        <FormInput
          label="Job Location"
          name="jobLocation"
          placeholder="Enter job location"
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.jobLocation}
          touched={touched.jobLocation}
          value={values.jobLocation}
        />
        <Flex w="100%"  justify="flex-end" mt="4rem" gap="20px">
          <Button colorScheme="gray" type="button" onClick={() => handleTabChange(0)} >
            Previous
          </Button>
          <Button colorScheme="red" type="submit" onClick={handleNextClick}  >
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default JobDetailsForm;
