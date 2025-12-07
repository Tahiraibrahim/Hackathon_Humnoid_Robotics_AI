---
title: "Reactive Control Logic"
description: "Implement state machines and reactive behaviors for autonomous obstacle avoidance and line following"
sidebar_position: 2
difficulty: "Intermediate"
duration_minutes: 90
prerequisites: ["Reading Sensors (Lesson 3.1)"]
hardware_budget: "Included"
keywords: ["state machine", "obstacle avoidance", "line following", "behavior"]
---

import { PersonalizationContextButton } from '@site/src/components/PersonalizationContextButton';

<PersonalizationContextButton />

## Learning Objectives

- Design and implement state machines for robot behavior
- Create obstacle avoidance algorithms
- Implement line-following behavior
- Combine multiple behaviors hierarchically
- Debug state machine logic

## Core Concepts

### State Machine Fundamentals

A state machine has:
- **States**: Distinct modes (Searching, Avoiding, Following)
- **Transitions**: Conditions that change states
- **Actions**: What the robot does in each state

**Example Obstacle Avoidance:**
```
MOVING_FORWARD → [obstacle detected] → TURNING_LEFT
TURNING_LEFT → [space clear] → MOVING_FORWARD
```

### Behavior Hierarchy

Complex behaviors build from simple primitives:
1. **Low-level**: Motor control, sensor reading
2. **Mid-level**: Behaviors (move forward, turn, stop)
3. **High-level**: Tasks (avoid obstacles, reach goal)

## Code Example: Complete Obstacle Avoidance

```cpp
/*
Obstacle avoidance using state machine
*/

#include "Sensor.h"
#include "Motor.h"

enum RobotState {
  MOVING_FORWARD,
  AVOIDING_LEFT,
  AVOIDING_RIGHT,
  REVERSING,
  SEARCHING
};

class ObstacleAvoidanceRobot {
  private:
    RobotState state = MOVING_FORWARD;
    unsigned long state_start_time = 0;
    const int OBSTACLE_DISTANCE = 30;  // cm
    const int SEARCH_DURATION = 2000;   // ms

    Motor left_motor, right_motor;
    Sensor distance_sensor;

  public:
    void update() {
      float distance = distance_sensor.read();

      switch (state) {
        case MOVING_FORWARD:
          if (distance < OBSTACLE_DISTANCE) {
            decide_avoidance_direction();
          } else {
            left_motor.set_speed(150);
            right_motor.set_speed(150);
          }
          break;

        case AVOIDING_LEFT:
          left_motor.set_speed(50);
          right_motor.set_speed(150);

          if (distance > OBSTACLE_DISTANCE + 10) {
            state = MOVING_FORWARD;
          }
          break;

        case AVOIDING_RIGHT:
          left_motor.set_speed(150);
          right_motor.set_speed(50);

          if (distance > OBSTACLE_DISTANCE + 10) {
            state = MOVING_FORWARD;
          }
          break;

        case REVERSING:
          left_motor.set_speed(-100);
          right_motor.set_speed(-100);

          if (millis() - state_start_time > 500) {
            state = SEARCHING;
            state_start_time = millis();
          }
          break;

        case SEARCHING:
          left_motor.set_speed(-50);
          right_motor.set_speed(100);

          if (distance > OBSTACLE_DISTANCE ||
              millis() - state_start_time > SEARCH_DURATION) {
            state = MOVING_FORWARD;
          }
          break;
      }
    }

  private:
    void decide_avoidance_direction() {
      // Check left and right (simplified)
      state_start_time = millis();

      // For now, alternate directions
      static bool try_left = true;
      state = try_left ? AVOIDING_LEFT : AVOIDING_RIGHT;
      try_left = !try_left;
    }
};

void setup() {
  Serial.begin(9600);
  Serial.println("Obstacle avoidance robot started");
}

ObstacleAvoidanceRobot robot;

void loop() {
  robot.update();
  delay(50);  // Update at 20Hz
}
```

## Code Example: Line Following

```cpp
/*
Line following using reactive control
*/

const int LINE_THRESHOLD = 500;
const int BASE_SPEED = 120;

void follow_line() {
  int left_sensor = analogRead(A0);
  int center_sensor = analogRead(A1);
  int right_sensor = analogRead(A2);

  bool left_on_line = left_sensor < LINE_THRESHOLD;
  bool right_on_line = right_sensor < LINE_THRESHOLD;

  if (left_on_line && right_on_line) {
    // Center - move straight
    set_motor(BASE_SPEED, BASE_SPEED);
  } else if (left_on_line) {
    // Line to left - turn left
    set_motor(BASE_SPEED / 2, BASE_SPEED);
  } else if (right_on_line) {
    // Line to right - turn right
    set_motor(BASE_SPEED, BASE_SPEED / 2);
  } else {
    // Lost line - stop and search
    set_motor(0, 0);
  }
}
```

## Hands-On Exercise: Implement Wall Following

Create a robot that follows a wall at constant distance:

```cpp
const float TARGET_DISTANCE = 40;  // cm
const float TOLERANCE = 5;

void wall_follow() {
  float distance = read_distance_sensor();

  if (distance > TARGET_DISTANCE + TOLERANCE) {
    // Too far from wall - turn toward it
    turn_right(100);
  } else if (distance < TARGET_DISTANCE - TOLERANCE) {
    // Too close to wall - turn away
    turn_left(100);
  } else {
    // Perfect distance - move forward
    move_forward(150);
  }
}
```

**Expected behavior:** Robot maintains parallel course alongside wall.

## Troubleshooting

### Robot oscillates (turns left/right repeatedly)
- **Cause**: Control gains too high
- **Fix**: Increase TOLERANCE or reduce motor speed changes

### Robot never reaches stable state
- **Cause**: Dead zones or sensor noise
- **Fix**: Add hysteresis (different thresholds for ON/OFF transitions)

### Robot misses state transitions
- **Cause**: Update frequency too low
- **Fix**: Increase loop frequency or use interrupts

## Next Steps

You've implemented reactive behaviors! Next: **Navigation Systems** - combining multiple behaviors for autonomous navigation.

---

Ready for Lesson 3.3: Building Navigation Systems!
