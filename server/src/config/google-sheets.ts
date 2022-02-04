import {GoogleSpreadsheet} from "google-spreadsheet";
import {config} from "dotenv";

config();

function jsonEscape(str: string) {
    return str.replace(/\n/g, "\\\\n").replace(/\r/g, "\\\\r").replace(/\t/g, "\\\\t");
}

const doc = new GoogleSpreadsheet("1A0uAur7Fl0QVbXe6e4doUYEKSC_1l7mhrgFY2p2hm-w");

const keysEnvVar = process.env["CREDS"];
if (!keysEnvVar) {
    throw new Error("The $CREDS environment variable was not found!");
}
const keys = JSON.parse(jsonEscape(keysEnvVar));

doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || "",
    private_key: keys.private_key.replace(/\\n/g, "\n")
})
    .then(() => {
        doc.loadInfo();
    });


export default doc;