#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from '@aws-cdk/core'
import { lowLevelConstruct } from '../lib/low-level-construct'
import { highLevelConstruct } from '../lib/high-level-construct'

const app = new cdk.App()
new lowLevelConstruct(app, 'lowLevelConstruct')
new highLevelConstruct(app, 'highLevelConstruct')