import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import lowLevelConstruct = require('../lib/low-level-construct');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new lowLevelConstruct.lowLevelConstruct(app, 'MyTestStack');
    // THEN
});
