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
                    {/* <div className="input">
                        <input type={"number"} value={width} onChange={handleWidthChange} name={"width"} placeholder="Width (Feet)"/>
                    </div>

                    <div className="input">
                        <input type={"number"} value={depth} onChange={handleDepthChange} name={"depth"} placeholder="Depth (Feet)"/>
                    </div> */}

                    <div className="radio-group left-radio">
                        <label>
                            <input
                                type="radio"
                                name="leftRadio"
                                value="Stand Alone Freezer"
                                onChange={(e) => setType(e.target.value)}
                                checked={type === "Stand Alone Freezer"}
                            />
                            <span>Stand Alone Freezer</span>
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="leftRadio"
                                value="Stand Alone Cooler"
                                onChange={(e) => setType(e.target.value)}
                                checked={type === "Stand Alone Cooler"}
                            />
                            <span>Stand Alone Cooler</span>
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="leftRadio"
                                value="Freezer + Cooler with shared wall"
                                onChange={(e) => setType(e.target.value)}
                                checked={type === "Freezer + Cooler with shared wall"}
                            />
                            <span>Freezer + Cooler with shared wall</span>
                        </label>
                    </div>

                    <img src={"/img/answers/cooler.webp"} alt="Centered" className="center-image" width={300} />

                    <div className="radio-group right-radio">
                        <label>
                            <input
                                type="radio"
                                name="rightRadio"
                                value="Small 6'w x 10'd x 9'h"
                                onChange={(e) => setSize(e.target.value)}
                                checked={size === "Small 6'w x 10'd x 9'h"}
                            />
                            <span>Small 6'w x 10'd x 9'h</span>
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="rightRadio"
                                value="Medium 10'w x 10'd x 9'h"
                                onChange={(e) => setSize(e.target.value)}
                                checked={size === "Medium 10'w x 10'd x 9'h"}
                            />
                            <span>Medium 10'w x 10'd x 9'h</span>
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="rightRadio"
                                value="Large 12'w x 12'd x 9'h"
                                onChange={(e) => setSize(e.target.value)}
                                checked={size === "Large 12'w x 12'd x 9'h"}
                            />
                            <span>Large 12'w x 12'd x 9'h</span>
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
