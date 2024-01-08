import { Button, Flex, Box } from "@chakra-ui/react";
import React,{useEffect} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import FormSelect from "../../components/formComponents/FormSelect";
import { IInterViewSettings } from "../../interface/forms";
import {
  interviewDurationOptions,
  interviewLanguageOptions,
  interviewModeOptions,
} from "./constants";

interface InterviewSettingsFormProps {
  formValues3: IInterViewSettings;
  setFormValues3: React.Dispatch<React.SetStateAction<IInterViewSettings>>;
  handleTabChange: (index: number) => void;
  formKey:string;
  
}

const InterviewDetailsForm: React.FC<InterviewSettingsFormProps> = ({formValues3,setFormValues3,handleTabChange,formKey}) => {
  const {
    errors,
    touched,
    handleSubmit,
    values,
    setFieldTouched,
    setFieldValue,
  } = useFormik<IInterViewSettings>({
    initialValues: formValues3,
    validationSchema: Yup.object().shape({
        interviewMode: Yup.string().required("interview Mode is required"),
        interviewDuration: Yup.string().required("interview Duration is required"),
        interviewLanguage: Yup.string().required("interview Language is required"),
    }),
    onSubmit: (values) => {
      console.log({ values });
      
    },
  });
  const handleSubmitBtn =  () => {
    if ( values.interviewLanguage !== "" && values.interviewDuration !== "" && values.interviewMode !== "") {
      alert("Form successfully submitted");
  }
  };

  const handlePreviousClick = () => {
    setFormValues3(values);
    handleTabChange(1);
  };
  

  useEffect(() => {
    setFormValues3(values);
  }, [values, setFormValues3,]);

  useEffect(() => {
    setFormValues3(formValues3);
  }, [formValues3]);
  
  


  return (
    <Box width="100%" as="form" position='static' onSubmit={handleSubmit}>
      <Box width="100%">
        <FormSelect
          label="Interview Mode"
          placeholder="Select interview mode"
          name="interviewMode"
          options={interviewModeOptions}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          value={values?.interviewMode}
          error={errors?.interviewMode}
          touched={touched?.interviewMode}
        />
        <FormSelect
          label="Interview Duration"
          placeholder="Select interview duration"
          name="interviewDuration"
          options={interviewDurationOptions}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          value={values?.interviewDuration}
          error={errors?.interviewDuration}
          touched={touched?.interviewDuration}
        />
        <FormSelect
          label="Interview Language"
          name="interviewLanguage"
          placeholder="Select interview language"
          options={interviewLanguageOptions}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          error={errors.interviewLanguage}
          touched={touched.interviewLanguage}
          value={values.interviewLanguage}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button position='static' colorScheme="gray" type="button" onClick={handlePreviousClick} >
            Previous
          </Button>
          <Button position='static' colorScheme="red" type="submit" onClick={handleSubmitBtn}>
            Submit
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default InterviewDetailsForm;
