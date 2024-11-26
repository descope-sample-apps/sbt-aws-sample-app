import * as sbt from "@cdklabs/sbt-aws";
import * as apigateway from "aws-cdk-lib/aws-apigatewayv2";
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
      apiCorsConfig: {
        allowOrigins: ["https://sbt-aws-sample-app.preview.descope.org"],
        allowMethods: [apigateway.CorsHttpMethod.ANY],
        allowHeaders: [
          "Content-Type",
          "Authorization",
          "X-Amz-Date",
          "X-Api-Key",
          "X-Amz-Security-Token",
        ],
        allowCredentials: true,
      },
    });

    this.eventManager = controlPlane.eventManager;
    this.regApiGatewayUrl = controlPlane.controlPlaneAPIGatewayUrl;
  }
}
