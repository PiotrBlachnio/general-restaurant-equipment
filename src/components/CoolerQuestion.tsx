import { useCallback, useEffect, useState } from "react";
import { IConfig, Page, Button, ArrowIcon } from "@carybit/lead-generation-form";

interface IProps {
    setOpenAnswers?: (answers: Record<string, string>) => void;
    openAnswers?: Record<string, string>;
    nextPage?: () => void;
    currentPage?: number;
    config: IConfig;
}

export const CoolerQuestion = ({ openAnswers, nextPage, setOpenAnswers, config, currentPage }: IProps) => {
    const [type, setType] = useState("Stand Alone Freezer");
    const [size, setSize] = useState("Small 6'w x 10'd x 9'h");

    const handleTypeChange = useCallback((type: string) => {
        setType(type);
    }, []);

    const handleSizeChange = useCallback((size: string) => {
        setSize(size);
    }, []);

    useEffect(() => {
        setOpenAnswers({ ...openAnswers, [config?.variables?.coolerQuestionId]: `${type} - ${size}` });
    }, [type, size]);

    return (
        <Page hidden={config?.variables?.coolerQuestionOrder !== config.orderedPages[currentPage]}>
            <h3>What type of Walk-In Cooler or Freezer needed?</h3>

            <div className="form cooler-question">
                <div className="container">
                    <div className="radio-group left-radio">
                        <label className="custom-radio-button">
                            <input
                                type="radio"
                                name="type"
                                value="Stand Alone Freezer"
                                onChange={(e) => handleTypeChange(e.target.value)}
                                checked={type === "Stand Alone Freezer"}
                                style={{ display: "none" }}
                            />
                            <span className="checkmark"></span>
                            <span className="label-text">Stand Alone Freezer</span>
                        </label>

                        <label className="custom-radio-button">
                            <input
                                type="radio"
                                name="type"
                                value="Stand Alone Cooler"
                                onChange={(e) => handleTypeChange(e.target.value)}
                                checked={type === "Stand Alone Cooler"}
                                style={{ display: "none" }}
                            />
                            <span className="checkmark"></span>
                            <span className="label-text">Stand Alone Cooler</span>
                        </label>

                        <label className="custom-radio-button">
                            <input
                                type="radio"
                                name="type"
                                value="Freezer + Cooler with shared wall"
                                onChange={(e) => handleTypeChange(e.target.value)}
                                checked={type === "Freezer + Cooler with shared wall"}
                                style={{ display: "none" }}
                            />
                            <span className="checkmark"></span>
                            <span className="label-text">Freezer + Cooler with shared wall</span>
                        </label>
                    </div>

                    <img src={"/img/answers/cooler.webp"} alt="Centered" className="center-image" width={400} />

                    <div className="radio-group right-radio">
                        <label className="custom-radio-button">
                            <input
                                type="radio"
                                name="size"
                                value="Small 6'w x 10'd x 9'h"
                                onChange={(e) => handleSizeChange(e.target.value)}
                                checked={size === "Small 6'w x 10'd x 9'h"}
                                style={{ display: "none" }}
                            />
                            <span className="checkmark"></span>
                            <span className="label-text">Small 6'w x 10'd x 9'h</span>
                        </label>

                        <label className="custom-radio-button">
                            <input
                                type="radio"
                                name="size"
                                value="Medium 10'w x 10'd x 9'h"
                                onChange={(e) => handleSizeChange(e.target.value)}
                                checked={size === "Medium 10'w x 10'd x 9'h"}
                                style={{ display: "none" }}
                            />
                            <span className="checkmark"></span>
                            <span className="label-text">Medium 10'w x 10'd x 9'h</span>
                        </label>

                        <label className="custom-radio-button">
                            <input
                                type="radio"
                                name="size"
                                value="Large 12'w x 12'd x 9'h"
                                onChange={(e) => handleSizeChange(e.target.value)}
                                checked={size === "Large 12'w x 12'd x 9'h"}
                                style={{ display: "none" }}
                            />
                            <span className="checkmark"></span>
                            <span className="label-text">Large 12'w x 12'd x 9'h</span>
                        </label>
                    </div>
                </div>
            </div>

            <div className="button-container">
                <Button
                    text={"Continue"}
                    onClick={() => {
                        setOpenAnswers({ ...openAnswers, [config?.variables?.coolerQuestionId]: `${type} - ${size}` });

                        nextPage();
                    }}
                >
                    <ArrowIcon />
                </Button>
            </div>
        </Page>
    );
};
