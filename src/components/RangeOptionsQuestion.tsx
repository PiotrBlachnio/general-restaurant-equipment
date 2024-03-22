import { useCallback, useEffect, useState } from "react";
import { IConfig, Page, Button, ArrowIcon, Answer } from "@carybit/lead-generation-form";
import { MappedPage } from "@carybit/lead-generation-form/dist/types";

interface IProps {
    setOpenAnswers?: (answers: Record<string, string>) => void;
    openAnswers?: Record<string, string>;
    nextPage?: () => void;
    currentPage?: number;
    config: IConfig;
    pages?: MappedPage[];
    updateAnswer?: (pageId: string, answer: string[]) => void;
}

export const RangeOptionsQuestion = ({ openAnswers, nextPage, setOpenAnswers, config, currentPage, pages, updateAnswer }: IProps) => {
    const [faucetsNumber, setFaucetsNumber] = useState("");
    const [page, setPage] = useState<MappedPage>(pages.find((p) => p.id === config?.variables?.rangeOptionsQuestionId));

    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);

    const selectAnswer = (id: string) => {
        if (selectedAnswers.includes(id)) {
            return setSelectedAnswers(selectedAnswers.filter((answer) => answer !== id));
        }

        setSelectedAnswers([...selectedAnswers, id]);
    };

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFaucetsNumber(event.target.value);
    };

    useEffect(() => {
        setPage(pages.find((p) => p.id === config?.variables?.rangeOptionsQuestionId));
    }, [pages]);

    return (
        <Page hidden={config?.variables?.rangeOptionsQuestionOrder !== config.orderedPages[currentPage]}>
            <div className="range-options">
                <h3>
                    Choose specific range options:
                    <span className="subtext">You Can Choose Mulitple Products</span>
                </h3>

                <div className="answers-and-button-container">
                    <div className={`answers elements-${page?.answers.length}`}>
                        {page?.answers.map((answer, index) => (
                            <Answer
                                key={index}
                                text={answer.text}
                                pageOrder={page?.order}
                                order={index + 1}
                                onClick={() => selectAnswer(answer.id)}
                                isMultichoice={true}
                                isSelected={selectedAnswers.includes(answer.id)}
                                className={`elements-${page?.answers.length}`}
                                pngImages={config?.pngImages || []}
                                isPageHidden={page.order.toString() !== config.orderedPages[currentPage]}
                                tooltip={answer.tooltip}
                                subtext={answer.subtext}
                                config={config}
                            />
                        ))}
                    </div>
                </div>

                {selectedAnswers.includes(config?.variables?.faucetsAnswerId) ? (
                    <select value={faucetsNumber} onChange={handleSelectChange} style={{ marginTop: "1rem", marginBottom: '3rem', color: "black", padding: '6px' }}>
                        <option value="">Number of faucets</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
                ) : (
                    ""
                )}

                {selectedAnswers.length > 0 && (
                    <div className={`button-container`}>
                        <Button text={"Continue"} onClick={() => {
                            setOpenAnswers({ ...openAnswers, [config?.variables?.faucetsNumberQuestionId]: faucetsNumber });

                            updateAnswer(page?._id, selectedAnswers);
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" style={{ marginLeft: "0.25rem" }}>
                                <path d="M23.12,9.91,19.25,6a1,1,0,0,0-1.42,0h0a1,1,0,0,0,0,1.41L21.39,11H1a1,1,0,0,0-1,1H0a1,1,0,0,0,1,1H21.45l-3.62,3.61a1,1,0,0,0,0,1.42h0a1,1,0,0,0,1.42,0l3.87-3.88A3,3,0,0,0,23.12,9.91Z" />
                            </svg>
                        </Button>
                    </div>
                )}
            </div>
        </Page>
    );
};
