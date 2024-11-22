#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { ControlPlaneStack } from "../lib/control-plane";
// import { AppPlaneStack } from '../lib/app-plane';

const app = new cdk.App();
const controlPlaneStack = new ControlPlaneStack(app, "ControlPlaneStack");
// const appPlaneStack = new AppPlaneStack(app, 'AppPlaneStack', {
//   eventManager: controlPlaneStack.eventManager,
// });
