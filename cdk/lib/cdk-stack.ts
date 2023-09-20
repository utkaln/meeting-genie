import { Duration, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as iam from "aws-cdk-lib/aws-iam";
import * as kms from "aws-cdk-lib/aws-kms";
import * as s3 from "aws-cdk-lib/aws-s3";

export class CdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const s3Src = new s3.Bucket(this, "transcribeSourceBucket", {
      objectOwnership: s3.ObjectOwnership.BUCKET_OWNER_ENFORCED,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryptionKey: new kms.Key(this, "s3SrcKMSKey"),
    });

    s3Src.grantRead(new iam.AccountRootPrincipal());

    const s3Dest = new s3.Bucket(this, "transcribeDestinationBucket", {
      objectOwnership: s3.ObjectOwnership.BUCKET_OWNER_ENFORCED,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryptionKey: new kms.Key(this, "s3DestKMSKey"),
    });

    s3Dest.grantRead(new iam.AccountRootPrincipal());
  }
}
