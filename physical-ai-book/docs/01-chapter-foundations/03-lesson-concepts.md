---
title: "Core Concepts: Sensors, Brains, Actuators"
description: "Deep dive into the three core components of Physical AI: sensors that perceive, brains that process, and actuators that act"
sidebar_position: 3
difficulty: "Beginner"
duration_minutes: 50
prerequisites: ["What is Physical AI? (Lesson 1.1)", "Your First Robot Simulator (Lesson 1.2)"]
hardware_budget: "$0"
keywords: ["sensors", "actuators", "control logic", "feedback loops", "decision-making"]
---

import { PersonalizationContextButton } from '@site/src/components/PersonalizationContextButton';

<PersonalizationContextButton />

## Learning Objectives

By the end of this lesson, you will be able to:

- Identify and understand different sensor types (distance, visual, tactile, motion)
- Explain how sensor data flows through a robot's control system
- Understand actuator types and their control mechanisms
- Implement simple control logic based on sensor readings
- Recognize feedback loops in real systems

## Prerequisites

- Completed Lesson 1.1: "What is Physical AI?"
- Completed Lesson 1.2: "Your First Robot Simulator"

## Introduction

Every robot is built from three essential components, arranged in a feedback loop:

1. **Sensors** collect information about the world
2. **Brain** processes that information and makes decisions
3. **Actuators** execute those decisions

In this lesson, we'll examine each component in detail, understand how they work together, and build a complete example that ties it all together.

## Core Concepts

### Sensors: The Robot's Eyes, Ears, and Touch

Sensors convert physical phenomena into electrical signals that the robot can process.

**Distance Sensors** (Ultrasonic, LiDAR, IR):
- Measure how far objects are from the robot
- Essential for obstacle avoidance and navigation
- Range: typically 2cm to 4m
- Update rate: 10-50 Hz (measurements per second)

**Vision Sensors** (Cameras):
- Provide rich information about the environment
- Enable object recognition, navigation, manipulation
- Large data volume; requires computational power
- RGB cameras, thermal cameras, depth cameras (stereo or ToF)

**Motion Sensors** (Accelerometers, Gyroscopes, IMUs):
- Measure acceleration, rotation, and orientation
- Critical for maintaining balance and stability
- Enable motion-based navigation (odometry)

**Tactile Sensors** (Touch, Pressure):
- Detect physical contact and force
- Essential for manipulation tasks
- Enable robots to "feel" what they're interacting with

**Other Sensors**:
- Temperature sensors for thermal awareness
- Humidity sensors for environmental monitoring
- Encoder sensors to measure motor rotation
- Gas sensors for environmental detection

### The Brain: From Sensor Data to Decisions

The robot's "brain" is the control system—the algorithm that converts sensor readings into motor commands.

**Control approaches range from simple to complex:**

1. **Reactive Control** (simplest):
   ```
   IF distance < 0.5m THEN turn_left()
   ELSE move_forward()
   ```
   Fast, but no memory or planning.

2. **State Machine Control**:
   The robot has different "states" (exploring, avoiding, retreating) and transitions between them based on sensor data.

3. **Feedback Control** (PID):
   Uses error between desired and actual state to continuously adjust motor commands. Makes precise movements.

4. **Learning-Based Control** (advanced):
   The robot learns from experience, improving its decisions over time using machine learning.

### Actuators: Making Things Happen

Actuators are the robot's muscles—they convert electrical signals into physical motion.

**Motors** (most common):
- **DC Motors**: Simple, powerful, good for driving wheels
- **Servo Motors**: Precise angular control, good for joints
- **Stepper Motors**: Accurate position control, good for precision tasks
- **Brushless Motors**: Efficient, powerful, requires controllers

**Other Actuators**:
- **Grippers** (solenoids, pneumatic): Grasp and release objects
- **Pumps/Compressors**: Control fluid systems
- **Electromagnets**: Attract ferrous objects

### The Feedback Loop

The sensor-brain-actuator cycle creates a closed loop:

```
1. Read sensors → 2. Make decision → 3. Execute actuators
                                           ↓
                                    Physical change
                                           ↓
                                      Back to step 1
```

This feedback loop creates responsive, adaptive behavior. The robot continuously monitors the results of its actions and adjusts accordingly.

## Code Example: Complete Sensor-Brain-Actuator System

Here's a realistic example that ties all three components together:

```python
"""
Complete example: A robot that follows a light source.
Demonstrates sensor reading, decision making, and actuator control.
"""

import time
from enum import Enum
from dataclasses import dataclass
from typing import Tuple

class RobotState(Enum):
    """Possible robot states"""
    SEARCHING = 1  # Looking for light source
    TRACKING = 2   # Following light source
    LOST = 3       # Lost the light source

@dataclass
class SensorData:
    """Sensor readings"""
    left_light: float      # 0 to 1 (0 = dark, 1 = bright)
    center_light: float
    right_light: float
    distance_forward: float  # meters

@dataclass
class MotorCommand:
    """Commands for left and right motors"""
    left_speed: float  # -1 to 1 (-1 = full reverse, 1 = full forward)
    right_speed: float

class LightTrackingRobot:
    """A robot that seeks and tracks light sources"""

    def __init__(self):
        self.state = RobotState.SEARCHING
        self.light_lost_count = 0
        self.max_lost_cycles = 5

    def read_sensors(self) -> SensorData:
        """
        Read all sensors.
        In real application, this interfaces with actual hardware.
        """
        # Simulated sensor readings
        return SensorData(
            left_light=0.3,
            center_light=0.7,
            right_light=0.2,
            distance_forward=1.5
        )

    def decide_next_action(self, sensors: SensorData) -> MotorCommand:
        """
        Brain: Process sensor data and decide motor commands.
        """
        LIGHT_THRESHOLD = 0.3
        SEARCH_SPEED = 0.3

        # Check if we can see light
        total_light = sensors.left_light + sensors.center_light + sensors.right_light
        has_light = total_light > LIGHT_THRESHOLD

        if has_light:
            self.state = RobotState.TRACKING
            self.light_lost_count = 0

            # Determine where light is brightest
            if sensors.center_light > sensors.left_light and \
               sensors.center_light > sensors.right_light:
                # Light is ahead - move toward it
                return MotorCommand(left_speed=0.7, right_speed=0.7)
            elif sensors.left_light > sensors.right_light:
                # Light is to the left - turn left
                return MotorCommand(left_speed=0.3, right_speed=0.7)
            else:
                # Light is to the right - turn right
                return MotorCommand(left_speed=0.7, right_speed=0.3)
        else:
            self.light_lost_count += 1
            if self.light_lost_count > self.max_lost_cycles:
                self.state = RobotState.LOST
                # Rotate in place to search
                return MotorCommand(left_speed=-0.2, right_speed=0.2)
            else:
                self.state = RobotState.TRACKING
                # Continue in last direction but slow down
                return MotorCommand(left_speed=0.2, right_speed=0.2)

    def execute_motors(self, command: MotorCommand) -> None:
        """
        Actuator: Send command to motors.
        In real application, this controls GPIO pins.
        """
        print(f"Left motor: {command.left_speed:+.1f}, " +
              f"Right motor: {command.right_speed:+.1f} " +
              f"(State: {self.state.name})")

    def run_cycle(self) -> None:
        """Execute one complete sense-think-act cycle"""
        # Sense
        sensors = self.read_sensors()

        # Think
        motor_command = self.decide_next_action(sensors)

        # Act
        self.execute_motors(motor_command)

    def run_continuous(self, cycles: int = 10) -> None:
        """Run multiple cycles"""
        print("Starting light tracking robot...\n")
        for i in range(cycles):
            print(f"Cycle {i + 1}:")
            self.run_cycle()
            time.sleep(0.5)  # Small delay between cycles
            print()

if __name__ == "__main__":
    robot = LightTrackingRobot()
    robot.run_continuous(cycles=10)
```

**Key components:**
- **Sensor Reading**: Simulates reading from light sensors
- **Decision Logic**: Determines robot behavior based on sensor input
- **Motor Command**: Abstracts motor control
- **State Management**: Robot remembers what it's doing

## Hands-On Exercise

### Implement a Simple Wall-Following Robot

Create a robot that follows along a wall, keeping a constant distance.

**Logic:**
```
IF distance_to_wall < 0.3m: turn AWAY from wall
IF distance_to_wall > 0.7m: turn TOWARD wall
ELSE: move forward smoothly
```

**Steps:**
1. Create a SensorData class with left, center, right distance sensors
2. Write decision logic based on the three sensor readings
3. Implement a PID-like controller to maintain distance to wall

**Expected behavior:** Robot should maintain ~0.5m distance from wall while moving forward.

## Troubleshooting & Common Issues

### Sensor readings are noisy
**Solution:** Implement a simple filter (averaging):
```python
def smooth_sensor(current: float, previous: float, alpha: float = 0.7):
    """Exponential moving average filter"""
    return alpha * current + (1 - alpha) * previous
```

### Robot overshoots and crashes
**Problem:** Reaction too fast/strong
**Solution:** Reduce motor speed or add gradual acceleration

### Can't decide which sensor to read
**Solution:** Use a **sensor fusion** approach - combine multiple sensors for better decisions

## Next Steps

You've now learned:
- How sensors perceive the environment
- How the brain processes information
- How actuators execute decisions
- How feedback loops create adaptive behavior

**Coming up (Chapter 2):** Build your first physical robot with real hardware!

**Deep dive:**
- Learn PID control for precise motor feedback
- Explore Kalman filters for sensor fusion
- Study state machines for complex behaviors

## Community Resources

- **GitHub**: Code examples available on [GitHub](https://github.com/physical-ai-book/physical-ai-book)
- **Discussions**: [Ask about control strategies](https://github.com/physical-ai-book/physical-ai-book/discussions)
- **Related**: Chapter 2 covers hardware implementation of these concepts

---

Ready for the next chapter? Let's build a real robot!
