---
title: "Multi-Robot Coordination"
description: "Design systems where multiple robots collaborate and communicate to achieve shared goals"
sidebar_position: 1
difficulty: "Advanced"
duration_minutes: 120
prerequisites: ["Combining Learning and Control (Lesson 4.3)"]
hardware_budget: "$100-300 (for 2-3 robots)"
keywords: ["multi-agent", "communication", "coordination", "emergence", "swarm"]
---

import { PersonalizationContextButton } from '@site/src/components/PersonalizationContextButton';

<PersonalizationContextButton />

## Learning Objectives

- Design communication protocols for multi-robot systems
- Implement consensus algorithms for robot coordination
- Handle asynchronous and delayed communication
- Debug coordination failures
- Understand emergent behavior in robot swarms

## Core Concepts

### Multi-Robot Challenges

**Communication:**
- Wireless message delays
- Packet loss
- Bandwidth limitations
- Synchronization issues

**Coordination:**
- Robots must agree on shared goals
- Avoid conflicts and collisions
- Handle robot failures

### Consensus Algorithms

**Simple Example:**
```
All robots measure distance to goal.
Average the measurements.
All use averaged value for navigation.
Result: Group decision-making
```

## Code Example: Multi-Robot Coordination

```cpp
/*
Two robots coordinating via wireless communication
*/

#include <Wire.h>

#define MY_ID 1
#define OTHER_ROBOT_ID 2
#define BROADCAST_INTERVAL 500  // ms

struct RobotState {
  int id;
  float position_x, position_y;
  int battery_percent;
};

RobotState my_state = {MY_ID, 0, 0, 100};
RobotState other_state = {OTHER_ROBOT_ID, 0, 0, 100};

unsigned long last_broadcast = 0;
unsigned long last_received = 0;

void broadcast_state() {
  """Send state to other robot via wireless"""
  Wire.beginTransmission(OTHER_ROBOT_ID);
  Wire.write((byte*)&my_state, sizeof(my_state));
  Wire.endTransmission();
}

void receive_state(int bytes_received) {
  """Receive state from other robot"""
  Wire.readBytes((byte*)&other_state, sizeof(other_state));
  last_received = millis();
}

void coordination_algorithm() {
  """
  Simple consensus: robots move toward average position
  """
  float avg_x = (my_state.position_x + other_state.position_x) / 2.0;
  float avg_y = (my_state.position_y + other_state.position_y) / 2.0;

  // Move toward average position
  float dx = avg_x - my_state.position_x;
  float dy = avg_y - my_state.position_y;

  set_motor_velocity(dx, dy);
}

void check_robot_health() {
  """Monitor other robot; assume dead if no message received"""
  if (millis() - last_received > 5000) {
    // Other robot not responding - operate independently
    Serial.println("WARNING: Lost contact with other robot");
  }
}

void setup() {
  Wire.begin(MY_ID);
  Wire.onReceive(receive_state);
  Serial.begin(9600);
}

void loop() {
  // Broadcast state periodically
  if (millis() - last_broadcast > BROADCAST_INTERVAL) {
    update_my_state();
    broadcast_state();
    last_broadcast = millis();
  }

  // Run coordination algorithm
  coordination_algorithm();

  // Monitor other robot
  check_robot_health();

  delay(10);
}

void update_my_state() {
  my_state.position_x = get_odometry_x();
  my_state.position_y = get_odometry_y();
  my_state.battery_percent = read_battery();
}
```

## Hands-On Exercise: Dual-Robot Exploration

**Task:**
- Two robots start at opposite ends of room
- Goal: Robots meet in middle and explore together
- Communication via wireless (WiFi/Bluetooth)

**Implementation:**
1. Implement position sharing
2. Compute meet-point (average position)
3. Navigate each robot to meet-point
4. Verify collision avoidance

**Success criteria:**
- Robots reach within 30cm of each other
- No collisions during coordination
- Both robots respond to failure (other robot crashes)

## Troubleshooting

### Robots diverge instead of converging
- **Check**: Is consensus algorithm running?
- **Debug**: Print state and averaged values

### Communication delays cause collisions
- **Solution**: Add safety buffer (stop if other robot not responding)
- **Or**: Implement prediction (estimate where other robot will be)

### One robot stops, other goes crazy
- **Solution**: Implement timeout - assume other robot failed after 5s silence

## Next Steps

You've implemented multi-robot coordination! Lesson 5.2 covers **Perception and Manipulation** - adding vision and grasping capabilities.

---

Next: Lesson 5.2 - Perception and Manipulation!
