import * as cdk from '@aws-cdk/core';

import * as apigateway from '@aws-cdk/aws-apigatewayv2';
import * as apigatewayIntegrations from '@aws-cdk/aws-apigatewayv2-integrations';
import * as lambda from '@aws-cdk/aws-lambda';

export class CdkAg2TestStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: cdk.StackProps, lambdaStack1: LambdaStack, lambdaStack2: LambdaStack) {
    super(scope, id, props);

    const api = new apigateway.HttpApi(this, 'api');

    api.addRoutes({
      path: '/lambda1',
      integration: new apigatewayIntegrations.LambdaProxyIntegration({
        handler: lambdaStack1.lambda,
        payloadFormatVersion: apigateway.PayloadFormatVersion.VERSION_2_0
      })
    });

    api.addRoutes({
      path: '/lambda2',
      integration: new apigatewayIntegrations.LambdaProxyIntegration({
        handler: lambdaStack2.lambda,
        payloadFormatVersion: apigateway.PayloadFormatVersion.VERSION_2_0
      })
    });
  }
}

export class LambdaStack extends cdk.Stack {
  lambda: lambda.Function;
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    this.lambda = new lambda.Function(this, 'lambda', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`exports.handler = async function(event, context) { return { statusCode: 200, body: "Stack: ${id}" }; };`),
    });
  }
}