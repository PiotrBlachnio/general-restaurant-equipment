import "../assets/scss/styles.scss";
import "@carybit/lead-generation-form/dist/index.css";
import configFile from "../../config.json";
import { LeadGenerationForm, IConfig } from "@carybit/lead-generation-form";
import { useEffect, useState } from "react";
import { EmailForm } from "./EmailForm";
import { Confirmation } from "./Confirmation";
import { ISubmission } from '../types';
import { ZipForm } from "./ZipForm";
import { AnswersTracker } from "./AnswersTracker";
import Plausible from 'plausible-tracker'
import { CoolerQuestion } from "./CoolerQuestion";
import { RangeOptionsQuestion } from "./RangeOptionsQuestion";

const plausible = Plausible({
    trackLocalhost: false,
    apiHost: 'https://api.carybit.com',
    domain: 'gre.carybit.com'
});

plausible.trackPageview();

const MainComponent = () => {
    const [config, setConfig] = useState<IConfig>(configFile as any);
    const [submissions, setSubmissions] = useState<ISubmission[]>([]);
    const [categoriesSelected, setCategoriesSelected] = useState([]);

    const selectCategory = (category: string) => {
        if(categoriesSelected.length === 0) {
            plausible.trackEvent('Category Selected');
        }


        if(!categoriesSelected.includes(category)) {
            plausible.trackEvent(`Category Selected (${category})`);

            setCategoriesSelected(categories => [...categories, category]);
        }
    };

    return (
        <LeadGenerationForm
            config={{ ...config }}
            onAnswerSelected={{
                [config.variables.fireplaceCategoryId]: () => selectCategory('F'),
                [config.variables.outdoorLivingCategoryId]: () => selectCategory('O'),
                [config.variables.kitchenAndBathCategoryId]: () => selectCategory('K')
            }}
            additionalPages={{
                zipForm: <ZipForm />,
                coolerQuestion: <CoolerQuestion config={config} />,
                rangeOptions: <RangeOptionsQuestion config={config} />,
                emailForm: <EmailForm setConfig={setConfig} config={config} plausible={plausible} />,
                confirmation: <Confirmation config={config} submissions={submissions} plausible={plausible} />,
            }}
            customAnswersTracker={<AnswersTracker submissions={submissions} />}
        />
    );
};

export default MainComponent;