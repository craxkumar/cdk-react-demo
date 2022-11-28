#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkStackTesting } from '../lib/testing/cdk-stack-testing';
import { CdkStackDev } from '../lib/dev/cdk-stack-dev';


const app = new cdk.App();

// Testing 
new CdkStackTesting(app, 'rk-testing-stack', {

  env:{
    region: "us-east-2"
  }

});

// Dev 
new CdkStackDev(app, 'rk-dev-stack', {

  env:{
    region: "us-east-2"
  }

});


