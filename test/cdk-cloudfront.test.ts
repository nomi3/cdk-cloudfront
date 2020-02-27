import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import CdkCloudfront = require('../lib/cdk-cloudfront-stack');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new CdkCloudfront.CdkCloudfrontStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
