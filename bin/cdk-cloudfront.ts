#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from '@aws-cdk/core'
import { lowRevelConstruct } from '../lib/low-revel-construct'
import { highRevelConstruct } from '../lib/high-revel-construct'

const app = new cdk.App()
new lowRevelConstruct(app, 'lowRevelConstruct')
new highRevelConstruct(app, 'highRevelConstruct')