import { useEffect, useState } from "react";
import { IConfig, ILead, Api, Page, IPage } from "@carybit/lead-generation-form";
import { TailSpin } from "react-loader-spinner";
import { IPlausible, ISubmission } from "../types";
import { IAnswer } from "@carybit/lead-generation-form/dist/types";
import { generateNewLeadEmail } from "../assets/emails/new-lead";
import { generateCustomerNotificationEmail } from "../assets/emails/customer-notification";

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
    const [isLoading, setIsLoading] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);
    
    useEffect(() => {
        if (!hidden) {
            const timer = setTimeout(() => {
                setIsLoaded(true);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [hidden]);


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
                        status: "Completed",
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

                //! DEFAULT EMAILS DISABLED
                const emailData = {
                    emailTemplate: "email2",
                    withEmail: "false",
                    emailSubject: "New Lead: {{name}}",
                };

                const leadDataEmail = {
                    Name: lead?.name,
                    Restaurant: lead?.company,
                    Email: lead?.email,
                    Phone: lead?.phone
                };
    
                pages
                    .filter(
                        (page) =>
                            (Object.keys(answers).includes(page._id) &&
                                (typeof answers[page._id] === "object" ? (answers[page._id] as string[]).length > 0 : !!answers[page._id]?.toString())) ||
                            (Object.keys(openAnswers).includes(page._id) && openAnswers[page._id] !== ""),
                    )
                    .map((page, index) => {
                        const answer =
                            answers[page._id] && typeof answers[page._id] === "object"
                                ? page.answers
                                      .filter((answer) => (answers[page._id] as string[]).includes(answer._id))
                                      .map((answer) => answer.text)
                                      .join("/")
                                : answers[page._id]
                                ? answers[page._id]?.toString()
                                : openAnswers[page._id];
                        leadDataEmail[page.text] = answer;
                    });

                try {
                    await api.updateLead(leadData, emailData);
                } catch (error) {
                    console.error("Failed to update lead", error);
                } finally {
                    setIsSubmitted(true);

                    setIsLoading(false);

                    plausible.trackEvent('Completed');

                    await api.sendEmail({
                        userId: config.variables.userId,
                        to: config.variables.notificationsEmail,
                        body: generateNewLeadEmail({ leadData: leadDataEmail, leadId: localStorage.getItem("leadId") }),
                        subject: `New Lead: ${lead?.name}`,
                    });

                    await api.sendEmail({
                        userId: config.variables.userId,
                        to: lead.email,
                        body: generateCustomerNotificationEmail({ leadData: leadDataEmail, firstName: lead?.name?.split(" ")[0] || "" }),
                        subject: `Restaurant Equipment - Confirmation`,
                    });
                }
            }
        };

        execute();
    }, [hidden]);

    return (
        <Page hidden={hidden}>
            <div className="form last-page confirmation">
                {isLoading || !isLoaded ? (
                    <TailSpin height={80} width={80} color={config.primaryColor} wrapperStyle={{ display: "block" }} />
                ) : (
                    <>
                        <div>
                            <h3>
                                Your Dream Restaurant Awaits…
                            </h3>

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
                                Thanks for sharing your vision with us. You're one step closer to your dream space.
                                <br /> <br />
                                <strong>Next Steps:</strong> Our commercial kitchen designer will contact you by the next business day. Let's bring
                                your vision to life!
                                <br />
                                <br />
                                <i>In a rush, feel free to call our customer service line: (323) 225-1522 Make sure you mention that you generated a
                                configuration on our website.</i>
                                <br />
                                <br />
                                <br />
                                <br />
                                <i style={{ fontSize: '0.9rem' }}>General Restaurant Equipment Co. 1740 Albion Street Los Angeles, CA 90031</i>
                            </span>
                        </div>
                    </>
                )}
            </div>
        </Page>
    );
};
