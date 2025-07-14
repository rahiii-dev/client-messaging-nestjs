# 📨 Client-to-Client Messaging using Kafka and NestJS

A microservices-based messaging system simulating two clients (Client A and Client B) communicating asynchronously through Kafka using NestJS. The system showcases event-driven architecture principles including message production, consumption, retry logic, and dead-letter queue (DLQ) handling.

---

## 🚀 Features

-  **Microservice architecture** with `client-a-service` and `client-b-service`
- **Kafka integration** with NestJS microservices transport layer
- **Client A** sends messages to Kafka
- **Client B** consumes and filters messages intended for it
- **MongoDB integration** to persist valid messages
- **Custom retry mechanism** using decorators and base class abstraction
- **Dead-letter queue (DLQ)** support for failed messages

---

## 🧱 Tech Stack

- **NestJS**
- **Kafka (via KafkaJS)**
- **MongoDB**
- **Docker**
- **Typescript**

---

## 🛠️ Getting Started

### 1. Start Kafka using Docker Compose

Kafka and Zookeeper are already configured. Simply run the following command from the root directory where the `docker-compose.yml` is located:

```bash
docker-compose up -d
```

This will spin up Kafka and Zookeeper on default ports (`9092` and `2181`).

### 2. Setup Environment Variables

Each service (`client-a-service` and `client-b-service`) includes a `.env-example` file.

> **Steps for both services:**

```bash
# Navigate into the service directory
cd client-a-service    # or cd client-b-service

# Copy the env example
cp .env-example .env
```

Then update the `.env` file as needed.


### 3. Install Dependencies

Install packages individually in each service directory:

```bash
# For client-a-service
cd client-a-service
npm install

# For client-b-service
cd ../client-b-service
npm install
```


### 4. Run Services

Start each service in its own terminal:

```bash
# Terminal 1: client-a-service
cd client-a-service
npm run start:dev

# Terminal 2: client-b-service
cd client-b-service
npm run start:dev
```

## 📮 API Endpoint (Client A)

### `POST /send-message`

Send a message from Client A to Client B.

#### Payload:

```json
{
  "sender": "clientA",
  "reciever": "clientB",
  "message": "Hello from A!"
}
```



