#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkAg2TestStack } from '../lib/cdk-ag2-test-stack';

const app = new cdk.App();
new CdkAg2TestStack(app, 'CdkAg2TestStack');
