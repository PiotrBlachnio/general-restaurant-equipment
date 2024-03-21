import { IPage } from "@carybit/lead-generation-form";
import { IAnswer } from "@carybit/lead-generation-form/dist/types";
import { ISubmission } from "../types";

interface IProps {
    answers?: Record<string, string[] | number>;
    openAnswers?: Record<string, string>;
    submissions: ISubmission[];
    pages?: (IPage & { answers: IAnswer[] })[];
}

export const AnswersTracker = ({ answers, openAnswers, pages, submissions }: IProps) => {
    return (
        <div className="answers-tracker shadow">
            {
                [{ answers: answers, openAnswers }, ...submissions].map((submission, index) => (
                    <div key={`submission-${index}`}>
                        {submissions.length > 0 && index !== 0 && <div className="custom-chip">Customization Round {index}</div>}
                        

                        <div style={{ marginTop: '0rem', marginBottom: Object.values(submission.answers).length === 0 || (Object.values(submission.answers)[0] as string[]).length === 0 ? '0' : '3rem' }}>
                        {pages
                            .filter(
                                (page) =>
                                    (Object.keys(submission.answers).includes(page._id) && (typeof submission.answers[page._id] === 'object' ? (submission.answers[page._id] as string[]).length > 0 : !!submission.answers[page._id]?.toString())) ||
                                    (Object.keys(submission.openAnswers).includes(page._id) && submission.openAnswers[page._id] !== ""),
                            )
                            .map((page, index) => (
                                <div className="tracker-page" key={page._id}>
                                    <div className="tracker-question">
                                        {index + 1}. {page.text}
                                    </div>
                                    <div className="tracker-answer">
                                        {submission.answers[page._id] && typeof submission.answers[page._id] === 'object'
                                            ? page.answers
                                                .filter((answer) => (submission.answers[page._id] as string[]).includes(answer._id))
                                                .map((answer) => answer.text)
                                                .join("/")
                                            : submission.answers[page._id] ? submission.answers[page._id]?.toString() : submission.openAnswers[page._id]}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            }
        </div>
    );
};