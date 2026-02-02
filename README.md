# 🧬 Evolutionary Population Dynamics Simulator

## Overview
This project is an **API-first backend product** that simulates the evolution of a population under environmental pressures. It combines **Evolutionary Biology** (Natural Selection, Mutation) with **Population Dynamics** (Logistic Growth, Carrying Capacity).

The simulation is scientifically grounded, using mathematical models to represent biological processes.

---

## 🔬 Scientific Model

### 1. The Individual (Genotype)
Each individual is represented by a single continuous trait $x$ (e.g., body size, resistance).
- **Genotype:** A float value.
- **Mutation:** Modeled as a stochastic process using a Normal Distribution.
  $$ x_{new} = x + \mathcal{N}(0, \sigma_m) $$

### 2. Fitness Function (Natural Selection)
Fitness determines an individual's probability of survival and reproduction. We use a **Gaussian Function** (Bell Curve) centered around an optimal environmental value ($x_{opt}$).
$$ f(x) = e^{-\frac{(x - x_{opt})^2}{2\sigma_{env}^2}} $$
- Individuals closer to $x_{opt}$ have higher fitness (max 1.0).
- $\sigma_{env}$ (Tolerance) determines how harsh the environment is.

### 3. Population Dynamics (Ecology)
The population size ($N$) is not static. It follows the **Logistic Growth Model**, constrained by the environment's Carrying Capacity ($K$).
$$ N_{t+1} = N_t + r N_t \left( 1 - \frac{N_t}{K} \right) $$
- If $N < K$, the population grows.
- If $N > K$, the population shrinks due to competition.

---

## 🛠 Technical Architecture

### Backend (Node.js + Express)
- **Engine:** Pure JavaScript implementation of the mathematical models (`src/engine`).
- **API:** RESTful endpoints to control the simulation state.
- **State Management:** In-memory storage of the current population and history.

### Frontend (HTML + Chart.js)
- **Visualization:** Real-time plotting of Population Size and Average Fitness.
- **Control:** Interface to adjust parameters ($r$, $K$, Mutation Rate) dynamically.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/YusufOztoprak/Evolutionary-Population-Dynamics-Simulator.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Evolutionary-Population-Dynamics-Simulator
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application
Start the server:
```bash
npm start
```
Open your browser and navigate to:
`http://localhost:3000`

---

## 📡 API Reference

### 1. Start Simulation
Initialize a new population with specific parameters.
- **Endpoint:** `POST /api/simulation/start`
- **Body:**
  ```json
  {
    "popSize": 50,
    "carryingCapacity": 500,
    "growthRate": 0.8,
    "optimalValue": 20.0,
    "mutationRate": 0.2,
    "mutationSigma": 1.0
  }
  ```

### 2. Step Forward
Advance the simulation by $n$ generations.
- **Endpoint:** `POST /api/simulation/step`
- **Body:** `{ "steps": 1 }`

### 3. Get Statistics
Retrieve the current state of the population.
- **Endpoint:** `GET /api/simulation/stats`

### 4. Reset
Clear the current simulation.
- **Endpoint:** `DELETE /api/simulation/reset`

---

## 👨‍💻 Author
Developed by **YusufOztoprak** as a scientific simulation tool.
