interface IContext {
    firstName: string;
    leadData: Record<string, string>;
}

export const generateCustomerNotificationEmail = ({ leadData, firstName }: IContext) => {
    return `<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>eMail</title>
        <style type="text/css">
            @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&display=swap');
    
            body, table, td, a {
                -webkit-text-size-adjust: 100%; 
                -ms-text-size-adjust: 100%; 
            }
            
            table, td {
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
        <div id=":rt" class="a3s aXjCH "><u></u>
            <div marginwidth="0" marginheight="0">
                <div id="m_-6798059765791806010wrapper" dir="ltr"
                    style="background-color:#f7f7f7;margin:0;padding:70px 0 70px 0;width:100%">
                    <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%">
                        <tbody>
                            <tr>
                                <td align="center" valign="top">
                                    <div id="m_-6798059765791806010template_header_image">
                                    </div>
                                    <table border="0" cellpadding="0" cellspacing="0" width="600"
                                        id="m_-6798059765791806010template_container"
                                        style="background-color:#ffffff;border:1px solid #dedede;border-radius:3px">
                                        <tbody>
                                            <tr>
                                                <td align="center" valign="top">
    
                                                    <table border="0" cellpadding="0" cellspacing="0" width="600"
                                                        id="m_-6798059765791806010template_header"
                                                        style="background-color:#ffffff;color:#ffffff;border-bottom:1px solid rgb(218, 216, 216);font-weight:bold;line-height:100%;vertical-align:middle;font-family:'Montserrat',sans-serif;border-radius:3px 3px 0 0">
                                                        <tbody>
                                                            <tr>
                                                                <td id="m_-6798059765791806010header_wrapper"
                                                                    style="padding: 36px 48px;display:block" align="center">
                                                                    <img src="https://carybit.s3.us-east-1.amazonaws.com/clients/GRE/logo.png" style="width:100%; max-width:300px; height:auto; display:block; border:none; outline:none; text-decoration:none;" width="300" alt="General Restaurant Logo">
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
    
                                                </td>
                                            </tr>
                                            <tr>
                                                <td valign="top" style="border: 2rem solid #fff; text-align: center; font-family: 'Montserrat', sans-serif !important">
                                                    <p>Hello ${firstName}! We truly appreciate you sharing your vision with us. You're just one step away from your dream restaurant. Our commercial kitchen designer will contact you by the next business day.</p>
                                                </td>
                                            </tr>

                                            <tr style="height: 20px"></tr>

                                            <tr>
                                                <td align="center" valign="top">
                                                    <table border="1" cellspacing="0" cellpadding="10" style="width: 100%; border-collapse: collapse;">
                                                        <thead>
                                                            <tr>
                                                                <th colspan="2" style="background-color: #eb2127; color: #fff; text-align: center;font-family: 'Montserrat', sans-serif !important;">Lead Details</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            ${Object.keys(leadData).map(key => `
                                                                <tr>
                                                                    <td style="width: 50%; padding: 20px;font-family: 'Montserrat', sans-serif !important;">${key}</td>
                                                                    <td style="width: 50%; padding: 20px;font-family: 'Montserrat', sans-serif !important;">${leadData[key]}</td>
                                                                </tr>`
                                                            ).join("")}
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>

                                            <tr style="height: 20px"></tr>

                                            <tr>
                                                <td
                                                    valign="top"
                                                    style="
                                                        border: 1rem solid #fff;
                                                        text-align: center;
                                                        font-family: 'Montserrat', sans-serif !important;
                                                        font-size: 14px;
                                                    "
                                                >
                                                    © 2024 General Restaurant Equipment Co.
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
