import { Utils } from "../../utils";

interface IContext {
    firstName: string;
    discountCode: string;
    dealers: {
        name: string;
        address: string;
        phone: string;
    }[];
    configurations: Record<string, string>[];
}

export const generateDiscountCodeEmail = ({ firstName, discountCode, dealers, configurations }: IContext) => {
    return `<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>Stoll Industries</title>
        <style type="text/css">
            @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&display=swap');

            body,
            table,
            td,
            a {
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
            }

            table,
            td {
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
            }

            body {
                margin: 0;
                padding: 0;
                font-family: 'Montserrat', sans-serif !important;
                mso-line-height-rule: exactly;
            }
        </style>
    </head>
    <body>
        <div id=":rt" class="a3s aXjCH">
            <u></u>
            <div marginwidth="0" marginheight="0">
                <div id="m_-6798059765791806010wrapper" dir="ltr" style="background-color: #f7f7f7; margin: 0; padding: 70px 0 70px 0; width: 100%">
                    <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%">
                        <tbody>
                            <tr>
                                <td align="center" valign="top">
                                    <div id="m_-6798059765791806010template_header_image"></div>
                                    <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        width="600"
                                        id="m_-6798059765791806010template_container"
                                        style="background-color: #ffffff; border: 1px solid #dedede; border-radius: 3px;font-size:16px;"
                                    >
                                        <tbody>
                                            <tr>
                                                <td align="center" valign="top">
                                                    <table
                                                        border="0"
                                                        cellpadding="0"
                                                        cellspacing="0"
                                                        width="600"
                                                        id="m_-6798059765791806010template_header"
                                                        style="
                                                            background-color: #f7f7f7;
                                                            color: #ffffff;
                                                            border-bottom: 0;
                                                            font-weight: bold;
                                                            line-height: 100%;
                                                            vertical-align: middle;
                                                            font-family: Helvetica Neue, Helvetica, Roboto, Arial, sans-serif;
                                                            border-radius: 3px 3px 0 0;
                                                        "
                                                    >
                                                        <tbody>
                                                            <tr>
                                                                <td id="m_-6798059765791806010header_wrapper" style="padding: 36px 48px; display: block" align="center">
                                                                    <img
                                                                        src="https://carybit.s3.us-east-1.amazonaws.com/clients/Stoll%20Industries/logo2.png"
                                                                        style="
                                                                            width: 100%;
                                                                            max-width: 300px;
                                                                            height: auto;
                                                                            display: block;
                                                                            border: none;
                                                                            outline: none;
                                                                            text-decoration: none;
                                                                        "
                                                                        width="300"
                                                                        alt="Stoll Industries Logo"
                                                                    />
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td valign="top" style="border: 2rem solid #fff; text-align: center; font-family: 'Montserrat', sans-serif !important">
                                                    <p>Hello ${firstName}! We truly appreciate you sharing your vision with us. You're just one step away from your dream space. A dealer will be in touch with you within the next business day.</p>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td valign="top" style="border: 2rem solid #fff; border-top: 0; text-align: center; font-family: 'Montserrat', sans-serif !important">
                                                    <p>Discount Code: <strong>${discountCode}</strong></p>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td align="center" valign="top">
                                                    <table align="center" style="margin-bottom: 30px; font-family: 'Montserrat', sans-serif !important">
                                                        ${dealers.length > 0 ? `<tr>
                                                            <td align="center" style="font-size: 25px;font-family: 'Montserrat', sans-serif !important;">Dealers Near You</td>
                                                        </tr>` : `
                                                        
                                                        <tr>
                                                            <td align="center" style="font-family: 'Montserrat', sans-serif !important;">While we locate a dealer for you, feel free to directly contact our Stoll Customer Service team for more information at 833-200-7237</td>
                                                        </tr>
                                                    `}

                                                        ${dealers
                                                            .map(
                                                                (dealer, index) => `
                                                                <div>
                                                                    <tr style="height: 20px"></tr>
                                                
                                                                    <tr>
                                                                        <td align="center;" style="font-family: 'Montserrat', sans-serif !important;text-align: center;"><strong>${index + 1}. ${dealer.name}</strong></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td align="center;" style="font-family: 'Montserrat', sans-serif !important;text-align: center;">${Utils.toTitleCase(dealer.address)}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td align="center;" style="font-family: 'Montserrat', sans-serif !important;text-align: center;">${Utils.toTitleCase(dealer.phone)}</td>
                                                                    </tr>
                                                                </div>`,
                                                            )
                                                            .join("")
                                                        }
                                                    </table>
                                                </td>
                                            </tr>

                                            ${configurations.map((configuration, index) => `
                                                <tr>
                                                    <td align="center" valign="top">
                                                        <table border="1" cellspacing="0" cellpadding="10" style="width: 100%; border-collapse: collapse;">
                                                            <thead>
                                                                <tr>
                                                                    <th colspan="2" style="background-color: #9f1c34; color: #fff; text-align: center;font-family: 'Montserrat', sans-serif !important;">${configurations.length === 1 ? `Configuration` : `Configuration Round ${index + 1}`}</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                ${Object.keys(configuration).map(question => `
                                                                    <tr>
                                                                        <td style="width: 50%; padding: 20px;font-family: 'Montserrat', sans-serif !important;">${question}</td>
                                                                        <td style="width: 50%; padding: 20px;font-family: 'Montserrat', sans-serif !important;">${configuration[question]}</td>
                                                                    </tr>`
                                                                ).join("")}
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            `).join("")}

                                            <tr style="height: 20px"></tr>

                                            <tr>
                                                <td valign="top" style="text-align: center; font-family: 'Montserrat', sans-serif !important; font-size: 14px !important; border-left: 2rem solid #fff; border-right: 2rem solid #fff;">
                                                    <p><i>Disclaimer: Discount Codes must be presented at time of purchase and are only valid at participating dealers in GA, TX, NC, SC, and TN during the promotional period. May not be combined with any other offers. Not valid on sale merchandise. Expires Jan 31st, 2024.
                                                    </i></p>
                                                </td>
                                            </tr>
                                                        
                                            <tr style="height: 20px"></tr>

                                            <tr>
                                                <td valign="top" style="border: 1rem solid #fff; text-align: center; font-family: 'Montserrat', sans-serif !important;font-size: 14px;">
                                                    ©2023 Stoll Industries
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </body>
</html>
`;
};
