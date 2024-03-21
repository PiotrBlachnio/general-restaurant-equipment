import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, IFormField, IConfig, ILead, Api } from "@carybit/lead-generation-form";
import { IPlausible } from "../types";
import { Utils } from "../utils";

interface IProps {
    hidden?: boolean;
    api?: Api;
    updateLead?: (lead: ILead) => void;
    lead?: ILead;
    answers?: Record<string, string[]>;
    openAnswers?: Record<string, string>;
    nextPage?: () => void;
    setConfig: (config: IConfig) => void;
    config: IConfig;
    plausible: IPlausible;
}

export const EmailForm = ({ hidden, updateLead, nextPage, api, lead, answers, openAnswers, setConfig, config, plausible }: IProps) => {
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const [isCheckboxVisible, setIsCheckboxVisible] = useState<boolean>(false);
    const [error, setError] = useState<string>(null);

    const [fields, setFields] = useState<IFormField[]>([
        { name: "Email", type: "text", id: "email", isRequired: true, placeholder: "john.smith@gmail.com" }
    ]);

    const form = useForm();

    const handleSubmit = async () => {
        const values = form.getValues();

        setError(null);

        updateLead({
            email: values.email,
        });

        nextPage();

        if (!isSubmitted) {
            const leadData = {
                openAnswers,
                answers,
                lead: { ...lead, email: values.email, status: 'Uncompleted' },
                // zapier: {
                //     isIncluded: true,
                //     url: config.variables["zapierCreateLeadUrl"],
                //     customProperties: {
                //         category: category,
                //     },
                // },
            };

            const emailData = {
                emailTemplate: "email1",
                withEmail: "false",
                emailSubject: "",
            };

            try {
                const response: ILead = await api.createLead(leadData, emailData);

                if (response._id) {
                    localStorage.setItem("leadId", response._id);
                }
            } catch (error) {
                console.error("Failed to create lead", error);
            } finally {
                setIsSubmitted(true);

                plausible.trackEvent('Email Provided');
            }
        }
    };

    const validate = () => {
        const values = form.watch();

        if (!values.email) {
            return setIsFormValid(false);
        }

        if (
            !values.email
                ?.toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                )
        ) {
            return setIsFormValid(false);
        }


        setIsFormValid(true);
    };

    useEffect(() => {
        const subscription = form.watch((_, { name }) => {
            if (name === 'email') {
                validate();
            }
        });
    
        return () => subscription.unsubscribe();
    }, [form]);

    return (
        <Form
            title={"My email address is..."}
            buttonText={"Continue"}
            form={form}
            hidden={hidden}
            fields={fields}
            onSubmit={handleSubmit}
            isSubmitHidden={!isFormValid}
            error={error}
        />
    );
};
