# 🧬 Evolutionary Population Dynamics Simulator

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/node-%3E%3D14.0.0-green)

A web-based simulation tool that models the evolution of a population under environmental pressure. It demonstrates core biological concepts such as **Natural Selection**, **Mutation**, **Genetic Drift**, and **Carrying Capacity** using mathematical models.

---

## 🚀 Features

- **Real-time Visualization:** Watch the population evolve generation by generation.
- **Interactive Controls:** Adjust mutation rates, population size, and environmental harshness on the fly.
- **Scientific & Math Documentation:** Includes dedicated pages explaining the underlying biology and mathematics.
- **Dual Charts:**
  - 📈 **Population Size:** Logistic growth dynamics.
  - 🧬 **Average Fitness:** Adaptation level of the population.

---

## 🔬 Scientific Model

### 1. The Individual (Genotype)
Each individual is represented by a single continuous trait $x$ (e.g., body size, resistance).

- **Genotype:** A float value.
- **Mutation:** Modeled as a stochastic process using a Normal Distribution.

$$
x_{new} = x + \mathcal{N}(0, \sigma_m)
$$

### 2. Fitness Function (Natural Selection)
Fitness determines an individual's probability of survival and reproduction. We use a Gaussian Function (Bell Curve) centered around an optimal environmental value ($x_{opt}$).

$$
f(x) = e^{-\frac{(x - x_{opt})^2}{2\sigma_{env}^2}}
$$

- Individuals closer to $x_{opt}$ have higher fitness (max 1.0).
- $\sigma_{env}$ (Tolerance) determines how harsh the environment is.

### 3. Population Dynamics (Ecology)
The population size ($N$) is not static. It follows the Logistic Growth Model, constrained by the environment's Carrying Capacity ($K$).

$$
N_{t+1} = N_t + r N_t \left( 1 - \frac{N_t}{K} \right)
$$

- If $N < K$, the population grows.
- If $N > K$, the population shrinks due to competition.

---

## 🛠 Installation & Usage

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher)

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/YusufOztoprak/Evolutionary-Population-Dynamics-Simulator.git
   cd Evolutionary-Population-Dynamics-Simulator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

4. **Open the simulator**
   Go to `http://localhost:3000` in your browser.

---

## 📂 Project Structure

```
Evolutionary-Population-Dynamics-Simulator/
├── src/
│   ├── engine/          # Simulation logic (Population, Individual)
│   └── server.js        # Express backend API
├── public/
│   ├── index.html       # Main Simulator UI
│   ├── science.html     # Biological Background Page
│   ├── math.html        # Mathematical Model Page
│   └── js/              # Frontend logic (Charts, API calls)
├── package.json
└── README.md
```

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Developed by Yusuf Oztoprak** 🎓
