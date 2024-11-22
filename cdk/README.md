# CDK Project for Descope and AWS SBT Integration

This project demonstrates how to deploy an AWS CDK application written in TypeScript. The CDK stack provisions resources required for integrating **Descope** and **AWS SaaS Builder Toolkit (SBT)**.

The `cdk.json` file specifies how the CDK Toolkit should execute your app.

---

## 📂 Project Structure

- **`bin/`**: Entry point for your CDK app.
- **`lib/`**: Contains the CDK stack definitions.
- **`cdk.json`**: Configures the CDK CLI for this project.

---

## 🔧 Prerequisites

Before running the CDK commands, ensure you have:

1. **Node.js**: Install the latest LTS version of Node.js.
2. **AWS CLI**: Install and configure the AWS CLI with credentials for the target account.
3. **CDK Toolkit**: Install the AWS CDK globally:
   ```bash
   npm install -g aws-cdk
   ```
4. **Dependencies**: Install the project dependencies:
   ```bash
   npm install
   ```

---

## 🚀 Getting Started

### **1. Build the Project**
Compile TypeScript to JavaScript:
```bash
npm run build
```

### **2. Synthesize the CloudFormation Template**
Generate a CloudFormation template based on your CDK app:
```bash
npx cdk synth
```

### **3. Deploy the CDK Stack**
Deploy the stack to your default AWS account and region:
```bash
npx cdk deploy
```

- You’ll be prompted to confirm changes if any IAM resources are created or updated.

---

## 📋 Useful Commands

| Command               | Description                                                                                 |
|-----------------------|---------------------------------------------------------------------------------------------|
| `npm run build`       | Compile TypeScript to JavaScript.                                                           |
| `npm run watch`       | Watch for changes in your TypeScript files and recompile automatically.                     |
| `npm run test`        | Run unit tests with Jest.                                                                   |
| `npx cdk synth`       | Emit the synthesized CloudFormation template to verify your stack configuration.            |
| `npx cdk deploy`      | Deploy the stack to your AWS account and region.                                            |
| `npx cdk diff`        | Compare the deployed stack with your local changes to understand what will be updated.      |
| `npx cdk destroy`     | Destroy the deployed stack, removing all AWS resources.                                     |

---

## 🛠️ Development Workflow

1. **Make Changes**:
   Modify your CDK stack in the `lib/` directory.

2. **Build**:
   Compile the TypeScript changes:
   ```bash
   npm run build
   ```

3. **Test Locally**:
   Validate the synthesized CloudFormation template:
   ```bash
   npx cdk synth
   ```

4. **Deploy**:
   Deploy your updated stack:
   ```bash
   npx cdk deploy
   ```

---

## 📚 Additional Resources

- **AWS CDK Documentation**: [https://docs.aws.amazon.com/cdk](https://docs.aws.amazon.com/cdk)
- **Descope Documentation**: [https://docs.descope.com](https://docs.descope.com)