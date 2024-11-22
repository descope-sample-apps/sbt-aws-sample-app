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

### **What is the SaaS Builder Toolkit (SBT)?**

The **SaaS Builder Toolkit (SBT)** is an open-source developer toolkit designed to help you implement SaaS best practices and increase developer velocity. Built on top of the AWS Cloud Development Kit (CDK), SBT provides high-level abstractions and reusable infrastructure constructs that encapsulate SaaS principles.

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