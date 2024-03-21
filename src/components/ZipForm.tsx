import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, IFormField, ILead } from "@carybit/lead-generation-form";
import TagManager from 'react-gtm-module';

interface IProps {
    hidden?: boolean;
    updateLead?: (lead: ILead) => void;
    nextPage?: () => void;
}

export const ZipForm = ({ hidden, nextPage, updateLead }: IProps) => {
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const [error, setError] = useState<string>(null);

    const [fields, setFields] = useState<IFormField[]>([
        { name: "Zip", type: "number", id: "zip", isRequired: true, placeholder: '12345' }
    ]);

    const form = useForm();

    const handleSubmit = () => {
        const values = form.getValues();

        setError(null);

        updateLead({
            zip: values.zip
        });

        nextPage();
    };

    const validate = () => {
        const values = form.getValues();

        if (!values.zip) {
            return setIsFormValid(false);
        }

        if(values.zip.toString().length !== 5) {
            return setIsFormValid(false);
        }

        setIsFormValid(true);
    };

    useEffect(() => {
        validate();
    }, [form.watch()]);

    return (
        <Form
            title={"My ZIP code is..."}
            buttonText={"Continue"}
            form={form}
            hidden={hidden}
            fields={fields}
            onSubmit={handleSubmit}
            isSubmitHidden={!isFormValid}
            error={error}
            withoutAnimation={false}
        />
    );
};
