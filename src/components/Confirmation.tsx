import { useEffect, useState } from "react";
import dealersDirectory from "../../dealers.json";
import { IConfig, ILead, Api, Page, IPage } from "@carybit/lead-generation-form";
import { TailSpin } from "react-loader-spinner";
import { IPlausible, ISubmission } from "../types";
import { Utils } from "../utils";
import { generateDiscountCodeEmail } from "../assets/emails/discount-code";
import { IAnswer } from "@carybit/lead-generation-form/dist/types";

/** //? Categories
 * 0: Kitchen & Bath
 * 1: Outdoor Living
 * 2: Fireplace
 */
interface IDealer {
    id: string;
    name: string;
    street: string;
    street2: string;
    city: string;
    state: string;
    country: string;
    phone: string;
    website: string;
    categories: number[];
    zip: string;
}

interface IProps {
    lead?: ILead;
    answers?: Record<string, string[] | number>;
    openAnswers?: Record<string, string>;
    submissions: ISubmission[];
    pages?: (IPage & { answers: IAnswer[] })[];
    api?: Api;
    hidden?: boolean;
    config: IConfig;
    plausible: IPlausible;
}

export const Confirmation = ({ lead, answers, api, hidden, openAnswers, config, submissions, pages, plausible }: IProps) => {
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [dealers, setDealers] = useState<IDealer[]>(dealersDirectory);
    const [matchedDealers, setMatchedDealers] = useState<IDealer[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const execute = async () => {
            if (!hidden && !isSubmitted) {
                const leadData = {
                    openAnswers,
                    answers,
                    submissions,
                    leadId: localStorage.getItem("leadId"),
                    lead: {
                        ...lead,
                    },
                    // customerEmail: {
                    //     body: emailBody,
                    //     subject: '"Dream With Stoll" Product Request Confirmation',
                    // },
                    // zapier: {
                    //     isIncluded: true,
                    //     url: config.variables["zapierUpdateLeadUrl"],
                    //     customProperties: {
                    //         category: categories[answers[config.variables.categoryQuestionId][0]]
                    //     },
                    // },
                };

                //! EMAILS DISABLED
                const emailData = {
                    emailTemplate: "email2",
                    withEmail: "false",
                    emailSubject: "New Lead: {{name}}",
                };

                try {
                    await api.updateLead(leadData, emailData);
                } catch (error) {
                    console.error("Failed to update lead", error);
                } finally {
                    setIsSubmitted(true);

                    setIsLoading(false);
                }
            }
        };

        execute();
    }, [hidden]);

    return (
        <Page hidden={hidden}>
            <div className="form last-page confirmation">
                {isLoading ? (
                    <TailSpin height={80} width={80} color={config.primaryColor} wrapperStyle={{ display: "block" }} />
                ) : (
                    <>
                        <div>
                            {/* <h3><span className="emoji">🎉</span> Your Dream Space Awaits! <span className="emoji">🎉</span></h3> */}

                            <span
                                style={{
                                    color: "black",
                                    padding: "0 3rem",
                                    marginBottom: "2rem",
                                    display: "block",
                                    maxWidth: "500px",
                                    fontSize: "1.2rem",
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                }}
                            >
                                [...to be added]
                                {/* <br /> <br />
                                💡 <strong>Bonus:</strong> An exclusive discount is coming your way via email! Make sure to check your SPAM folder.
                                <br /> <br />
                                📞 <strong>Next Steps:</strong> A dealer will contact you by the next business day. Let's bring your vision to life! */}
                            </span>
                        </div>
                    </>
                )}
            </div>
        </Page>
    );
};
