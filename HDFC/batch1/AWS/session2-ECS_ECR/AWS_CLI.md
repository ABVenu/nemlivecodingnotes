
## 🧠 **What is AWS CLI?**

**AWS CLI (Command Line Interface)** is a **unified tool** that allows you to manage and interact with AWS services directly from your terminal using commands — instead of navigating through the AWS Management Console.

It’s **fast, scriptable**, and essential for developers and DevOps engineers to automate tasks.

---

## ⚙️ **Installation**

### 🖥️ For macOS

```bash
brew install awscli
```

### 💻 For Windows

Download and install from:
👉 [https://aws.amazon.com/cli/](https://aws.amazon.com/cli/)

### 🐧 For Linux

```bash
sudo apt install awscli -y
```

### ✅ Check Installation

```bash
aws --version
```

Example output:

```
aws-cli/2.15.0 Python/3.11.2 Linux/5.10.16
```

---

## 🔑 **Configuration**

Once installed, configure the CLI with your **AWS credentials**.

```bash
aws configure
```

You’ll be prompted for:

| Field                 | Description                 |
| --------------------- | --------------------------- |
| AWS Access Key ID     | From IAM user               |
| AWS Secret Access Key | From IAM user               |
| Default region name   | e.g., `ap-south-1` (Mumbai) |
| Default output format | `json` (or `text`, `table`) |

🗂️ These settings are stored in:

```
~/.aws/credentials
~/.aws/config
```

You can edit them manually if needed.

---

## 👥 **Configuring Multiple Profiles**

If you manage multiple AWS accounts or roles, you can set profiles:

```bash
aws configure --profile dev
aws configure --profile prod
```

Use them like:

```bash
aws s3 ls --profile dev
```

---

## 🧩 **Basic AWS CLI Commands (Most Common)**

### 🔹 1. **S3 (Simple Storage Service)**

**List all buckets**

```bash
aws s3 ls
```

**Create a bucket**

```bash
aws s3 mb s3://my-bucket-name
```

**Upload a file**

```bash
aws s3 cp myfile.txt s3://my-bucket-name/
```

**Download a file**

```bash
aws s3 cp s3://my-bucket-name/myfile.txt ./
```

**Sync local folder to S3**

```bash
aws s3 sync ./local-folder s3://my-bucket-name
```

**Delete a bucket**

```bash
aws s3 rb s3://my-bucket-name --force
```

---

### 🔹 2. **EC2 (Elastic Compute Cloud)**

**List all instances**

```bash
aws ec2 describe-instances
```

**Start an instance**

```bash
aws ec2 start-instances --instance-ids i-0123456789abcdef0
```

**Stop an instance**

```bash
aws ec2 stop-instances --instance-ids i-0123456789abcdef0
```

**List all available regions**

```bash
aws ec2 describe-regions
```

---

### 🔹 3. **ECR (Elastic Container Registry)**

**List repositories**

```bash
aws ecr describe-repositories
```

**Create a repository**

```bash
aws ecr create-repository --repository-name my-backend
```

**Get login command (for Docker push/pull)**

```bash
aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.ap-south-1.amazonaws.com
```

---

### 🔹 4. **IAM (Identity and Access Management)**

**List all users**

```bash
aws iam list-users
```

**List all roles**

```bash
aws iam list-roles
```

**List attached policies for a user**

```bash
aws iam list-attached-user-policies --user-name myuser
```

---

### 🔹 5. **CloudWatch**

**List all log groups**

```bash
aws logs describe-log-groups
```

**View recent log streams in a group**

```bash
aws logs describe-log-streams --log-group-name /ecs/my-service
```

---

### 🔹 6. **ECS (Elastic Container Service)**

**List all clusters**

```bash
aws ecs list-clusters
```

**List services in a cluster**

```bash
aws ecs list-services --cluster my-cluster
```

**Describe a service**

```bash
aws ecs describe-services --cluster my-cluster --services my-service
```

**List running tasks**

```bash
aws ecs list-tasks --cluster my-cluster
```

---

### 🔹 7. **CloudFormation**

**List stacks**

```bash
aws cloudformation list-stacks
```

**Describe a specific stack**

```bash
aws cloudformation describe-stacks --stack-name my-stack
```

---

### 🔹 8. **Lambda**

**List functions**

```bash
aws lambda list-functions
```

**Invoke a function**

```bash
aws lambda invoke --function-name myFunction output.json
```

---

### 🔹 9. **STS (Security Token Service)**

**Get caller identity (verify credentials)**

```bash
aws sts get-caller-identity
```

Output example:

```json
{
  "UserId": "AIDABCDEFGH12345",
  "Account": "123456789012",
  "Arn": "arn:aws:iam::123456789012:user/demo"
}
```

---

## 💡 **Tips & Tricks**

* Use `--output table` for readable formatting:

  ```bash
  aws ec2 describe-instances --output table
  ```

* Get help for any command:

  ```bash
  aws s3 help
  aws ec2 describe-instances help
  ```

* Dry-run to check permissions (without executing):

  ```bash
  aws ec2 start-instances --instance-ids i-0abcd1234 --dry-run
  ```

---

## 📁 **AWS CLI File Locations**

| File        | Path                 | Purpose                       |
| ----------- | -------------------- | ----------------------------- |
| Credentials | `~/.aws/credentials` | Stores Access & Secret Keys   |
| Config      | `~/.aws/config`      | Stores region & output format |

---

## 🔒 **Security Note**

Never hardcode AWS keys in scripts or code.
Use:

* IAM roles (for EC2, ECS tasks)
* Environment variables
* AWS SSO (for enterprise)

---

## 🚀 **Common Use-Cases**

| Task                     | Example Command                                                                                                 |                             |
| ------------------------ | --------------------------------------------------------------------------------------------------------------- | --------------------------- |
| Upload website to S3     | `aws s3 sync ./website s3://my-site --acl public-read`                                                          |                             |
| Check running EC2s       | `aws ec2 describe-instances --query 'Reservations[*].Instances[*].[InstanceId,State.Name,Tags]' --output table` |                             |
| Push Docker image to ECR | `aws ecr get-login-password                                                                                     | docker login`+`docker push` |
| Fetch CloudWatch logs    | `aws logs get-log-events --log-group-name /ecs/my-app --log-stream-name <stream>`                               |                             |

---

## 🧾 **Summary**

| Step | Command                       | Description           |
| ---- | ----------------------------- | --------------------- |
| 1    | `aws --version`               | Check installation    |
| 2    | `aws configure`               | Configure credentials |
| 3    | `aws sts get-caller-identity` | Verify connection     |
| 4    | `aws s3 ls`                   | List S3 buckets       |
| 5    | `aws ec2 describe-instances`  | Check EC2 instances   |
| 6    | `aws ecr create-repository`   | Create ECR repo       |
| 7    | `aws ecs list-clusters`       | List ECS clusters     |

---


