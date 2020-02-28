import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import lowRevelConstruct = require('../lib/low-revel-construct');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new lowRevelConstruct.lowRevelConstruct(app, 'MyTestStack');
    // THEN
});
