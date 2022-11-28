import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_s3_deployment as s3Deploy, aws_s3 as s3 } from 'aws-cdk-lib';
import {aws_cloudfront as cloudfront} from 'aws-cdk-lib';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const websiteBucket = new s3.Bucket(this, 'cdkDemoBucket', {
      websiteIndexDocument: 'index.html',
      publicReadAccess: true,
    });

    new s3Deploy.BucketDeployment(this, 'deployS3Demo', {
      sources: [s3Deploy.Source.asset('../build')],
      destinationBucket: websiteBucket
    });

    // Creates a distribution from an S3 bucket.
    new cloudfront.CloudFrontWebDistribution(this, 'cdkDemoDist', {
      originConfigs: [
        {
          s3OriginSource: {
          s3BucketSource: websiteBucket,
          },
          behaviors : [ {isDefaultBehavior: true}],
        },
      ],
   });

  } 


}