import * as sbt from "@cdklabs/sbt-aws";
import { Stack } from "aws-cdk-lib";
import { Construct } from "constructs";
import { DescopeAuth } from "sbt-aws-descope";

export class ControlPlaneStack extends Stack {
  public readonly regApiGatewayUrl: string;
  public readonly eventManager: sbt.IEventManager;

  constructor(scope: Construct, id: string, props?: any) {
    super(scope, id, props);
    const descopeAuth = new DescopeAuth(this, "DescopeAuth", {
      projectId: "P2OkfVnJi5Ht7mpCqHjx17nV5epH",
      clientSecretSSMMgmtKey: "/descope/management_key",
    });

    const controlPlane = new sbt.ControlPlane(this, "ControlPlane", {
      auth: descopeAuth,
      systemAdminEmail: "support@descope.com",
    });

    this.eventManager = controlPlane.eventManager;
    this.regApiGatewayUrl = controlPlane.controlPlaneAPIGatewayUrl;
  }
}
