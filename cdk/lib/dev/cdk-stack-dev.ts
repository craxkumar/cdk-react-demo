import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_s3_deployment as s3Deploy, aws_s3 as s3 } from 'aws-cdk-lib';
import {aws_cloudfront as cloudfront} from 'aws-cdk-lib';

export class CdkStackDev extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // creating new s3 bucket 
    const websiteBucket = new s3.Bucket(this, 'cdkDemoBucketDev', {
      websiteIndexDocument: 'index.html',
      publicReadAccess: true,
    });

    // Deploying files to s3 
    new s3Deploy.BucketDeployment(this, 'deployS3DemoDev', {
      sources: [s3Deploy.Source.asset('../build')],
      destinationBucket: websiteBucket
    });

    // Creates a distribution from an S3 bucket.
    new cloudfront.CloudFrontWebDistribution(this, 'cdkDemoDistDev', {
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