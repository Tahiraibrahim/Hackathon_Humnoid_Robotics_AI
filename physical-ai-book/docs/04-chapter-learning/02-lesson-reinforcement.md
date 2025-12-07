---
title: "Reinforcement Learning Intro"
description: "Teach robots to learn through reward signals and trial-and-error interaction"
sidebar_position: 2
difficulty: "Advanced"
duration_minutes: 100
prerequisites: ["Classification (Lesson 4.1)"]
hardware_budget: "Included"
keywords: ["Q-learning", "rewards", "policy", "reinforcement learning"]
---

import { PersonalizationContextButton } from '@site/src/components/PersonalizationContextButton';

<PersonalizationContextButton />

## Learning Objectives

- Understand agent-environment interaction model
- Implement Q-learning algorithm
- Design reward functions
- Train robot to complete tasks via trial-and-error
- Handle real-world RL challenges

## Core Concepts

### RL Framework

**Agent-Environment Loop:**
1. Agent observes state
2. Agent takes action
3. Environment provides reward
4. Environment transitions to new state
5. Repeat

**Q-Learning:**
- Learns "value" of each action in each state
- Updates based on reward received
- Eventually converges to optimal policy

## Code Example: Q-Learning Robot

```python
"""
Q-Learning: Robot learns to reach goal using rewards
"""

import numpy as np

class QLearningAgent:
    def __init__(self, n_states=10, n_actions=4):
        # Q-table: value[state][action]
        self.Q = np.zeros((n_states, n_actions))
        self.learning_rate = 0.1
        self.discount = 0.99
        self.epsilon = 0.1  # Exploration rate

    def choose_action(self, state):
        """Epsilon-greedy: explore randomly or exploit best"""
        if np.random.random() < self.epsilon:
            return np.random.randint(0, 4)  # Random action (explore)
        else:
            return np.argmax(self.Q[state])  # Best known action (exploit)

    def learn(self, state, action, reward, next_state):
        """Update Q-table based on experience"""
        current_q = self.Q[state, action]
        max_next_q = np.max(self.Q[next_state])

        # Q-learning update rule
        new_q = current_q + self.learning_rate * (
            reward + self.discount * max_next_q - current_q
        )
        self.Q[state, action] = new_q

def train_robot():
    """Train robot to reach goal"""
    agent = QLearningAgent()
    GOAL_STATE = 9
    episodes = 100

    for episode in range(episodes):
        state = 0  # Start position
        total_reward = 0

        for step in range(20):  # Max 20 steps per episode
            action = agent.choose_action(state)

            # Simulate environment
            next_state = min(state + 1, GOAL_STATE) if action == 0 else state

            # Reward: +1 for reaching goal, 0 otherwise
            reward = 1.0 if next_state == GOAL_STATE else 0.0

            # Learn
            agent.learn(state, action, reward, next_state)
            total_reward += reward
            state = next_state

            if state == GOAL_STATE:
                break

        if (episode + 1) % 10 == 0:
            print(f"Episode {episode + 1}: Reward = {total_reward}")

    return agent

# Train and test
agent = train_robot()
print("\nFinal policy (optimal actions):")
print(np.argmax(agent.Q, axis=1))
```

## Hands-On Exercise: Train Robot to Navigate Maze

**Scenario:**
- Grid-world maze (8x8)
- Robot starts at (0,0)
- Goal at (7,7)
- Rewards: +10 for reaching goal, -1 per step

**Your task:**
1. Define state representation (grid position)
2. Define actions (up, down, left, right)
3. Implement Q-learning
4. Train for 500 episodes
5. Test: See if robot reaches goal efficiently

**Expected result:** After training, robot finds direct path to goal.

## Troubleshooting

### Robot doesn't learn (rewards stay 0)
- **Check**: Is reward function working?
- **Fix**: Print rewards during training to debug

### Learning too slow
- **Increase**: Learning rate to 0.5
- **Or**: Reduce exploration (decrease epsilon)

### Overfitting to training environment
- **Use**: Experience replay (store and replay memories)
- **Or**: Add randomness to state transitions

## Next Steps

You've implemented reinforcement learning! Lesson 4.3 combines RL with reactive control for **hybrid systems**.

---

Next: Lesson 4.3 - Combining Learning and Control!
