import {
  Container,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Heading,
  Box,
  Grid,
} from "@chakra-ui/react";
import React, { useState,ReactNode } from "react";
import InterviewSettingsForm from "./InterviewSettingsForm";
import JobDetailsForm from "./JobDetailsForm";
import RequisitionForm from "./RequisitionDetailsForm";
import DisplayCard from "./PreviewCard";
import { IRequisitionDetails } from "@src/interface/forms";
import { IJobDetails } from "@src/interface/forms";
import { IInterViewSettings } from "../../interface/forms";

interface CustomTabProps {
  index: number;
  onClick: () => void;
  children: ReactNode;
  activeIndex:number;
}

const CustomTab: React.FC<CustomTabProps> = ({
  index,
  onClick,
  children,
  activeIndex,
}) => {

  const [isHovered, setHovered] = useState(false);


  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    
  };
  return (
    <button onClick={handleClick}
    style={{ padding: "1rem", fontFamily: "Poppins", border: "none", borderBottom: (isHovered || index === activeIndex) ? "2px solid #63b3ed" : "2px solid transparent", color: (isHovered || index === activeIndex) ? "#63b3ed" : "inherit", outline: "none",}}>
      {children}
    </button>
  );
};

const HomeLayout = () => {
  const [activeTab, setActiveTab] = useState(0);

  const [formValues, setFormValues] = useState<IRequisitionDetails>({
    requisitionTitle: "",
    noOfOpenings: 0,
    urgency: "",
    gender: "",
  });
  const [formValues2, setFormValues2] = useState<IJobDetails>({
    jobTitle: "",
    jobDetails: "",
    jobLocation: "",
  });
  const [formValues3, setFormValues3] = useState<IInterViewSettings>({
    interviewMode: "",
    interviewDuration: "",
    interviewLanguage: "",
  });

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  return (
    <Box w="100%">
      <Container maxW="1200px">
        <Heading fontFamily="Poppins" fontSize="1.5rem" my="2rem">
          Create Candidate Requisition
        </Heading>
        <Tabs index={activeTab} onChange={(index) => handleTabChange(index)}>
          <TabList>
            <CustomTab index={0} activeIndex={activeTab} onClick={() => handleTabChange(0)}>Requisition Details</CustomTab>
            <CustomTab index={1} activeIndex={activeTab} onClick={() => handleTabChange(1)}>Job Details</CustomTab>
            <CustomTab index={2} activeIndex={activeTab} onClick={() => handleTabChange(2)}>Interview Settings</CustomTab>
          </TabList>
          <Grid display="grid" gridTemplateColumns="3fr 2fr" gap="24px">
            <TabPanels>
              <TabPanel>
                <RequisitionForm formValues={formValues} setFormValues={setFormValues} handleTabChange={() => handleTabChange(1)} formKey="requisition"/>
              </TabPanel>
              <TabPanel>
                <JobDetailsForm formValues2={formValues2} setFormValues2={setFormValues2} handleTabChange={handleTabChange} formKey="jobdetails"/>
              </TabPanel>
              <TabPanel>
                <InterviewSettingsForm formValues3={formValues3} setFormValues3={setFormValues3} handleTabChange={handleTabChange} formKey="interview"/>
              </TabPanel>
            </TabPanels>
            <DisplayCard formValues={formValues} formValues2={formValues2} formValues3={formValues3}/>
          </Grid>
        </Tabs>
      </Container>
    </Box>
  );
};

export default HomeLayout;


