//const { TranscribeClient } = require("@aws-sdk/client-transcribe");
import { TranscribeClient } from "@aws-sdk/client-transcribe";
const transcribeClient = new TranscribeClient();
export { transcribeClient };
