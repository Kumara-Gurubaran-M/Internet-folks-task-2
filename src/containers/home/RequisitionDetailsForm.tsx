import { Button, Flex, Box } from "@chakra-ui/react";
import React ,{useEffect}from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormInput from "../../components/formComponents/FormInput";
import FormSelect from "../../components/formComponents/FormSelect";
import { IRequisitionDetails } from "../../interface/forms";
import { genderOptions, urgencyOptions } from "./constants";

interface RequisitionDetailsFormProps {
  formValues: IRequisitionDetails;
  setFormValues: React.Dispatch<React.SetStateAction<IRequisitionDetails>>;
  handleTabChange: (index: number) => void;
  formKey: string;
}

const RequisitionDetailsForm: React.FC<RequisitionDetailsFormProps> = ({formValues,setFormValues,handleTabChange,formKey}) => {
  const {
    handleChange,
    handleSubmit,
    errors,
    touched,
    handleBlur,
    values,
    setFieldTouched,
    setFieldValue,
  } = useFormik<IRequisitionDetails>({
    initialValues:formValues,
    validationSchema: Yup.object().shape({
      requisitionTitle: Yup.string().required("Requisition title is required"),
      noOfOpenings: Yup.number()
        .typeError("Enter a valid number")
        .required("Number of openings is required")
        .positive("Enter a valid number")
        .min(1, "Enter a valid number"),
      urgency: Yup.string().required("Urgency is required"),
      gender: Yup.string().required("Gender is required"),
    }),
    
    onSubmit: (values) => {
      setFormValues(values);
      handleTabChange(1);
      
    },
    

    
  });

  
  useEffect(() => {
    setFormValues(values);
  }, [values, setFormValues]);

  useEffect(() => {
    setFormValues(formValues);
  }, [formValues]);

  

  return (
    <Box key={formKey} width="100%" as="form" onSubmit={handleSubmit} >
      <Box width="100%">
        <FormInput
          label="Requisition Title"
          placeholder="Enter requisition title"
          name="requisitionTitle"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.requisitionTitle}
          error={errors?.requisitionTitle}
          touched={touched?.requisitionTitle}
        />
        <FormInput
          label="Number of openings"
          placeholder="Enter number of openings"
          name="noOfOpenings"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.noOfOpenings}
          error={errors?.noOfOpenings}
          touched={touched?.noOfOpenings}
        />
        <FormSelect
          label="Gender"
          name="gender"
          placeholder="Select gender"
          options={genderOptions}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          error={errors.gender}
          touched={touched.gender}
          value={values.gender}
        />
        <FormSelect
          label="Urgency"
          name="urgency"
          placeholder="Select urgency"
          options={urgencyOptions}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          error={errors.urgency}
          touched={touched.urgency}
          value={values.urgency}
        />
        <Flex w="100%" justify="flex-end" mt="4rem">
          <Button position='static' colorScheme="red" type="submit">
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default RequisitionDetailsForm;
