---
title: "Building Autonomous Navigation Systems"
description: "Combine sensors and behaviors to create autonomous navigation in unknown environments"
sidebar_position: 3
difficulty: "Intermediate/Advanced"
duration_minutes: 100
prerequisites: ["Reactive Control Logic (Lesson 3.2)"]
hardware_budget: "Included"
keywords: ["navigation", "mapping", "path planning", "localization"]
---

import { PersonalizationContextButton } from '@site/src/components/PersonalizationContextButton';

<PersonalizationContextButton />

## Learning Objectives

- Implement odometry (self-localization through motor measurements)
- Create simple environment mapping from sensor data
- Implement goal-seeking behavior
- Combine navigation with obstacle avoidance
- Debug navigation failures

## Core Concepts

### Odometry: Dead Reckoning

Robots estimate position by tracking movement:
- **Motor encoders** count wheel rotations
- **IMU** measures orientation changes
- Accumulate position over time

**Limitations:**
- Errors accumulate over distance
- Slipping wheels cause drift
- Need periodic correction

### Navigation Approaches

**Reactive:** Only uses current sensor data (no memory)
- Fast, simple, works in structured environments
- Problem: Can get stuck in local optima

**Deliberative:** Plans path before moving
- Requires map/goal
- More robust but slower

**Hybrid:** Combines both (recommended)
- Plans rough path
- Uses reactive control to adjust in real-time

## Code Example: Navigation System

```cpp
/*
Simple navigation with odometry and goal-seeking
*/

struct Position {
  float x, y, theta;  // x, y in cm, theta in degrees
};

class NavigationRobot {
  private:
    Position current_pos = {0, 0, 0};
    Position goal = {100, 100, 0};
    const float WHEEL_DIAMETER = 6.5;  // cm
    const float WHEELBASE = 15.0;  // Distance between wheels

    void update_odometry(int left_encoder_delta, int right_encoder_delta) {
      // Convert encoder counts to distance
      float left_distance = left_encoder_delta * (WHEEL_DIAMETER * PI) / 60.0;
      float right_distance = right_encoder_delta * (WHEEL_DIAMETER * PI) / 60.0;

      float delta_distance = (left_distance + right_distance) / 2.0;
      float delta_theta = (right_distance - left_distance) / WHEELBASE;

      // Update position
      current_pos.x += delta_distance * cos(current_pos.theta * PI / 180.0);
      current_pos.y += delta_distance * sin(current_pos.theta * PI / 180.0);
      current_pos.theta += delta_theta * 180.0 / PI;
    }

  public:
    void navigate_to_goal() {
      // Calculate direction to goal
      float dx = goal.x - current_pos.x;
      float dy = goal.y - current_pos.y;
      float distance_to_goal = sqrt(dx*dx + dy*dy);
      float angle_to_goal = atan2(dy, dx) * 180.0 / PI;

      // Calculate heading error
      float heading_error = angle_to_goal - current_pos.theta;

      if (distance_to_goal < 10) {
        // Goal reached
        motor_left.set_speed(0);
        motor_right.set_speed(0);
        return;
      }

      // Simple proportional control toward goal
      int base_speed = 150;
      int left_speed = base_speed - (heading_error * 2);
      int right_speed = base_speed + (heading_error * 2);

      motor_left.set_speed(constrain(left_speed, -255, 255));
      motor_right.set_speed(constrain(right_speed, -255, 255));
    }

    Position get_position() { return current_pos; }
};
```

## Hands-On Exercise: Navigate to Goal

Create a robot that:
1. Starts at origin (0, 0)
2. Receives a goal position (e.g., 200cm forward)
3. Navigates to goal using odometry
4. Avoids obstacles while maintaining goal direction

**Test scenarios:**
- Short distance (1m): odometry alone should work
- Long distance (5m): accumulate odometry error
- With obstacle: use reactive avoidance

## Troubleshooting

### Robot overshoots goal
- Reduce speed as approaching goal
- Implement proportional feedback

### Navigation drifts sideways
- Check wheel diameter calibration
- Verify odometry calculation
- Recalibrate motors

### Robot ignores obstacles
- Ensure obstacle avoidance has higher priority
- Blend reactive and deliberative controls

## Next Steps

You've built autonomous navigation! **Chapter 4** explores **Machine Learning** - allowing robots to learn from experience.

---

Ready for Chapter 4: Machine Learning Basics!
