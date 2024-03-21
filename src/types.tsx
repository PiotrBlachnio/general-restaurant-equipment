export interface ISubmission {
    answers: Record<string, string[]>;
    openAnswers: Record<string, string>;
}

export interface IPlausible {
    trackEvent: (
        name: string,
        options?: {
            props: Record<string, string>;
        },
    ) => void;
}

declare global {
    interface Window {
      gtag_report_conversion: () => void;
    }
}