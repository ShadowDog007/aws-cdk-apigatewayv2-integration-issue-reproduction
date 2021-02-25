#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkAg2TestStack, LambdaStack } from '../lib/cdk-ag2-test-stack';

const app = new cdk.App();
const lambdaStack1 = new LambdaStack(app, 'LambdaStack1');
const lambdaStack2 = new LambdaStack(app, 'LambdaStack2');
new CdkAg2TestStack(app, 'CdkAg2TestStack', {}, lambdaStack1, lambdaStack2);
