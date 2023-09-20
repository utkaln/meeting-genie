import { StartTranscriptionJobCommand } from "@aws-sdk/client-transcribe";
import { transcribeClient } from "./lib/transcribeClient.js";

export const params = {
  TranscriptionJobName: "UTKAL_TEST_TRANSCRIBE",
  LanguageCode: "en-US",
  MediaFormat: "m4a",
  Media: {
    MediaFileUri:
      "s3://cdkstack-transcribesourcebucket3217a4c6-1b9p60367goe6/aws-transcribe.m4a",
  },
  OutputBucketName: "cdkstack-transcribedestinationbucket781ff7bc-qcsxizxfkqce",
};

export const run = async () => {
  try {
    const data = await transcribeClient.send(
      new StartTranscriptionJobCommand(params)
    );
  } catch (err) {
    console.log("Error", err);
  }
};

run();
