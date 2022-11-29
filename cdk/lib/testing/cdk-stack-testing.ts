import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_s3_deployment as s3Deploy, aws_s3 as s3 } from 'aws-cdk-lib';
import {aws_cloudfront as cloudfront} from 'aws-cdk-lib';
import {aws_cloudfront_origins as origins} from 'aws-cdk-lib';
import {aws_certificatemanager as acm, aws_route53 as route53} from 'aws-cdk-lib';
import * as dotenv from 'dotenv'
dotenv.config()


// declare const hostedZone: route53.HostedZone;

export class CdkStackTesting extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // creating new s3 bucket 
    const websiteBucket = new s3.Bucket(this, 'cdkDemoBucketTest', {
      websiteIndexDocument: 'index.html',
      publicReadAccess: true,
    });

    // Deploying files to s3 
    new s3Deploy.BucketDeployment(this, 'deployS3DemoTest', {
      sources: [s3Deploy.Source.asset('../build')],
      destinationBucket: websiteBucket
    });

    // DnsValidatedCertificate 
    // const testingCertificateDemo = new acm.DnsValidatedCertificate(this, 'demoCDKCert', {
    //   domainName: 'cdkdemo.tk',
    //   hostedZone,
    // });


    // Creates a distribution from an S3 bucket
    new cloudfront.Distribution(this, 'cdkTestingDist', {
      defaultBehavior: { origin: new origins.S3Origin(websiteBucket) },
      // domainNames: ['cdkdemo.tk',],
      // certificate: testingCertificateDemo,
      });
  } 

}