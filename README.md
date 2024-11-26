<img width="1400" alt="Screenshot 2024-11-26 at 10 12 51 AM" src="https://github.com/user-attachments/assets/3805b0b5-f43b-48d0-9b39-8616df983499">

# Descope + AWS SBT Sample App

This sample app demonstrates how to build a SaaS application using the **Descope authentication platform** and the **AWS SaaS Builder Toolkit (SBT)**. It combines the flexibility of AWS SBT for SaaS best practices with Descope’s seamless authentication to create a robust, developer-friendly solution for modern SaaS applications.

---

## 🚀 Features

- **Authentication with Descope**: User login, session management, and secure API interactions powered by Descope’s authentication flows.
- **AWS SaaS Integration**: Leverages AWS SBT to implement SaaS best practices in the application’s control plane and user management services.
- **User Management**: Basic CRUD operations for managing user data using AWS resources.
- **Responsive UI**: Built with React and **shadcn**, offering a polished user experience.
- **Environment Configurations**: Easy setup with environment variables to integrate both Descope and AWS components.

---

## 🛠️ Setup Instructions

### Prerequisites

- **Node.js**: Version ≥ 14.15.0
- **AWS CLI**: Installed and configured
- **CDK**: Installed globally
- **Descope Account**: [Sign up here](https://www.descope.com/)
- **SBT Developer Guide**: Familiarize yourself with [SBT Developer Guide](https://aws.amazon.com/saas/sbt-developer-guide/).

---

### Step 1: Create a Descope Project

1. **Log into the Descope Console**: Visit [Descope Console](https://app.descope.com/) and log in or create an account.
2. **Create a New Project**:
   - Navigate to the **Project Settings** section, and copy the **Project ID** displayed in the project settings; you'll need it later.

---

### Step 2: Generate a Descope Management Key

1. **Go to Management Keys**:
   - In the Descope Console, go to **Company → Management Keys**.
2. **Create a New Key**:
   - Click on **Create Key** and provide a name for the key (e.g., `SBT Management Key`).
   - Copy the key value securely. **You won’t be able to retrieve it again.**
3. **Store the Key in AWS Parameter Store**:
   - Use the AWS CLI to save the management key as an SSM parameter:
     ```bash
     aws ssm put-parameter \
       --name "/descope/management_key" \
       --value "<your-management-key>" \
       --type "SecureString"
     ```

---

### Step 3: Update Your CDK Code

In your CDK code under `control-plane.ts`, set up the `DescopeAuth` construct with your **Project ID** and the SSM parameter path for the management key.

Example (in `ControlPlaneStack.ts`):

```typescript
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
      projectId: "<Your-Project-ID>", // Replace this with your Project ID
      clientSecretSSMMgmtKey: "/descope/management_key", // Ensure the SSM parameter is set up
    });

    const controlPlane = new sbt.ControlPlane(this, "ControlPlane", {
      auth: descopeAuth,
      systemAdminEmail: "<Your-Email>", // Replace this with your Email
    });

    this.eventManager = controlPlane.eventManager;
    this.regApiGatewayUrl = controlPlane.controlPlaneAPIGatewayUrl;
  }
}
```

---

### Backend Setup (AWS SBT)

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/descope-sample-apps/aws-sbt-sample-app
   cd aws-descope-sbt-sample/cdk-example
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Define SaaS Resources**:

   > You'll need to ensure that you're signed in with the correct AWS credentials in the CLI before you do this step. Also make sure that your Docker Daemon is running.

   Update the CDK stack to use AWS SBT constructs for SaaS resource provisioning.

4. **Deploy CDK Stack**:

   ```bash
   cdk deploy
   ```

5. Save the **API Gateway URL** from the output for later use.

---

### Frontend Setup (Next App)

1. **Navigate to the Frontend Directory**:

   ```bash
   cd ../main-app
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a copy of the `.env.local.example` file and add the following:

   ```env
   # DESCOPE ENV VARIABLES
   NEXT_PUBLIC_DESCOPE_PROJECT_ID="<Your Descope Project ID>"
   NEXT_PUBLIC_DESCOPE_FLOW_ID="<Your Descope Flow ID>"

   # AWS SBT URL
   NEXT_PUBLIC_AWS_URL="<Your API Gateway URL>"
   ```

4. **Run the Application**:
   ```bash
   npm start
   ```

---

## 🌟 Use Cases

### 1. **Authentication with Descope**

- Easy-to-configure login flows and session management.
- Securely integrates with the backend to handle authenticated requests.

### 2. **SaaS Resource Management**

- Built using AWS SBT, which simplifies implementing control plane and application plane services.
- Codifies SaaS best practices, ensuring scalability and maintainability.

### 3. **User Management**

- Perform CRUD operations on user data via AWS Lambda functions.
- Authenticate API requests using JWTs from Descope.

### 4. **Modern UI Design**

- Built with **shadcn** for a sleek, responsive design.
- Optimized for a professional user experience.

---

## 🤝 Contributing

We welcome contributions! Please fork the repository, make your changes, and open a pull request.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 📧 Support

For issues or questions, open an issue in the repository or contact support. For help with AWS SBT, refer to the [AWS SBT Developer Guide](https://aws.amazon.com/saas/sbt-developer-guide/). For Descope, visit [Descope Docs](https://docs.descope.com/).
