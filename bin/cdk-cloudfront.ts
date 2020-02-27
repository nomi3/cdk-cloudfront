#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkCloudfrontStack } from '../lib/cdk-cloudfront-stack';

const app = new cdk.App();
new CdkCloudfrontStack(app, 'CdkCloudfrontStack');
