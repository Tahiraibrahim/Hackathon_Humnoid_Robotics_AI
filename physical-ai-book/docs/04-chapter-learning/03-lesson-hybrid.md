---
title: "Combining Learning and Control"
description: "Build hybrid systems that integrate learned models with reactive control for robust autonomous behavior"
sidebar_position: 3
difficulty: "Advanced"
duration_minutes: 100
prerequisites: ["Reinforcement Learning (Lesson 4.2)"]
hardware_budget: "Included"
keywords: ["hybrid systems", "safety", "sim-to-real", "hierarchical control"]
---

import { PersonalizationContextButton } from '@site/src/components/PersonalizationContextButton';

<PersonalizationContextButton />

## Learning Objectives

- Design hybrid control architectures
- Integrate learned models with reactive safety behaviors
- Implement hierarchical decision-making
- Handle sim-to-real transfer challenges
- Deploy complex control systems on robots

## Core Concepts

### Hybrid Architecture

**Hierarchical Control:**
```
Level 1 (High): Learned planner (RL) - "What goal should I achieve?"
Level 2 (Mid): Reactive behaviors - "How to move safely?"
Level 3 (Low): Motor control - "How fast to spin wheels?"
```

**Safety Constraints:**
- Reactive layer always overrides high-level commands if danger detected
- Example: Stop all motors if obstacle detected, regardless of RL plan

### Sim-to-Real Transfer

**Challenge:** Models trained in simulation often fail on real robots due to:
- Friction and motor variations
- Sensor noise
- Unmodeled dynamics

**Solutions:**
- Add noise to simulator during training
- Collect real data for fine-tuning
- Conservative safety margins

## Code Example: Hybrid Control System

```cpp
/*
Hybrid system: RL planner + reactive safety + motor control
*/

enum ControlMode {
  RL_PLANNER,
  REACTIVE_SAFETY,
  EMERGENCY_STOP
};

class HybridRobot {
  private:
    ControlMode current_mode = RL_PLANNER;
    float planned_speed = 0;
    float obstacle_distance = 0;
    const float SAFETY_DISTANCE = 20;  // cm

  public:
    void update() {
      // Read sensors
      obstacle_distance = read_ultrasonic();

      // Determine control mode based on safety
      if (obstacle_distance < SAFETY_DISTANCE) {
        current_mode = REACTIVE_SAFETY;
      } else if (emergency_button_pressed()) {
        current_mode = EMERGENCY_STOP;
      } else {
        current_mode = RL_PLANNER;
      }

      // Execute appropriate control
      switch (current_mode) {
        case RL_PLANNER:
          planned_speed = compute_rl_action();
          execute_motors(planned_speed, planned_speed);
          break;

        case REACTIVE_SAFETY:
          // Override RL with safe obstacle avoidance
          turn_left(100);
          break;

        case EMERGENCY_STOP:
          execute_motors(0, 0);
          break;
      }
    }

  private:
    float compute_rl_action() {
      // Query trained RL model
      // (Model would be loaded from file or embedded)
      return model.predict(current_state);
    }

    void turn_left(int speed) {
      execute_motors(speed / 2, speed);
    }

    void execute_motors(int left, int right) {
      set_left_motor(left);
      set_right_motor(right);
    }
};
```

## Hands-On Exercise: Train and Deploy Hybrid System

**Scenario:** Robot learns to navigate while maintaining obstacle safety

**Step 1: Train RL in Simulation**
```python
# Train RL model to reach goal efficiently
agent = train_rl_agent(episodes=1000)
agent.save('trained_model.pkl')
```

**Step 2: Load on Robot**
```cpp
// Load model on embedded system
load_model_from_file('trained_model.pkl');
```

**Step 3: Add Safety Layer**
```cpp
// Always check obstacles before executing RL command
if (distance_sensor < SAFETY_THRESHOLD) {
  execute_emergency_stop();
} else {
  rl_action = model.predict(state);
  execute_action(rl_action);
}
```

**Step 4: Test and Iterate**
- If RL decisions seem risky, increase safety margins
- If robot too conservative, reduce margins
- Collect real data to fine-tune model

## Troubleshooting

### Trained model fails on real robot
- **Cause**: Sim-to-real gap
- **Fix**: Collect real data, fine-tune model with transfer learning

### Safety system too aggressive
- **Cause**: Safety threshold too high
- **Fix**: Gradually decrease threshold after testing

### Robot misses learned opportunities
- **Cause**: Safety overrides too frequently
- **Solution**: Make RL model aware of safety constraints during training

## Next Steps

You've built complete hybrid control systems! **Chapter 5** covers **Advanced Applications** - multi-robot coordination, manipulation, and capstone projects.

---

Next: Chapter 5 - Advanced Applications and Next Steps!
