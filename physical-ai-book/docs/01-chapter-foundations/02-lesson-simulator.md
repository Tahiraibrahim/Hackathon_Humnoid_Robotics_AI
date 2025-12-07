---
title: "Your First Robot Simulator"
description: "Set up and run your first robot simulation, understand environment setup, and control your first simulated robot"
sidebar_position: 2
difficulty: "Beginner"
duration_minutes: 60
prerequisites: ["What is Physical AI? (Lesson 1.1)", "Python basics"]
hardware_budget: "$0"
keywords: ["simulation", "physics engine", "robot control", "PyBullet", "Gazebo"]
---

import { PersonalizationContextButton } from '@site/src/components/PersonalizationContextButton';

<PersonalizationContextButton />

## Learning Objectives

By the end of this lesson, you will be able to:

- Set up a robot simulation environment using PyBullet
- Load a pre-built robot model and interact with it
- Write Python code to control a simulated robot's movement
- Understand the difference between simulation and real-world robotics
- Debug common simulation issues

## Prerequisites

- Completed Lesson 1.1: "What is Physical AI?"
- Python 3.8+ installed on your computer
- Ability to run commands in terminal/command prompt

## Introduction

Before building a physical robot, let's learn in a safe, risk-free environment: **simulation**. Simulators like PyBullet and Gazebo let you:

- Test robot code without expensive hardware
- Experiment with physics without risk of crashes
- Run thousands of simulations to test algorithms
- Iterate rapidly before deployment

In this lesson, you'll set up PyBullet (a lightweight physics simulator) and control your first simulated robot. Think of it like the difference between reading about driving and actually sitting in a car—simulation is the practice run.

**Why simulation first?**
1. **Cost**: Robots are expensive; simulators are free
2. **Safety**: Simulation crashes don't hurt anything
3. **Speed**: You can test 100 scenarios while one physical robot tests one
4. **Learning**: Simulation helps you understand physics and control

## Core Concepts

### What is Physics Simulation?

A physics simulator is software that computes how objects move and interact. It:
- Calculates gravity, friction, and collisions
- Updates object positions each time step
- Simulates sensor readings (camera, distance, touch)
- Responds to actuator commands (motor speeds, forces)

**Key simulators in robotics:**
- **PyBullet**: Lightweight, easy to learn, good for education
- **Gazebo**: Industrial-grade, used by ROS (Robot Operating System)
- **MuJoCo**: Physics research, fast multi-body dynamics
- **Isaac Sim**: NVIDIA's simulation platform for AI training

### The Simulation Loop

Every simulator runs this loop repeatedly (typically 50-1000 times per second):

```
1. Read sensor data from simulation world
2. Execute actuator commands (motors, forces)
3. Simulate physics for one small time step
4. Update all object positions based on physics
5. Render visualization (optional)
6. Go back to step 1
```

This is almost identical to real robot hardware, which makes simulation perfect for learning.

### Sim-to-Real Transfer

One challenge: **simulation is not reality**. Physics simulators use approximations and have limitations. A controller trained perfectly in simulation might fail on real hardware due to:
- Friction differences
- Sensor noise
- Motor response delays
- Unexpected obstacles

We'll discuss solutions (sim-to-real transfer techniques) in later chapters. For now, simulation is an excellent learning tool.

## Code Example: PyBullet Robot Control

First, install PyBullet:

```bash
pip install pybullet
```

Now, here's a complete example that loads a robot and controls it:

```python
"""
PyBullet Robot Simulator: Load and control a robot
This example demonstrates:
- Setting up a simulation environment
- Loading a robot model
- Controlling motors with simple commands
- Reading sensor data
"""

import pybullet as p
import pybullet_data
import time
import numpy as np
from typing import List, Tuple

class SimpleRobot:
    """Simple robot class for PyBullet simulation"""

    def __init__(self, urdf_file: str = "r2d2.urdf"):
        """
        Initialize the robot.

        Args:
            urdf_file: Path to robot URDF file (robot description format)
        """
        self.client_id = None
        self.robot_id = None
        self.urdf_file = urdf_file
        self.motor_ids = []

    def connect_to_physics_server(self) -> None:
        """Connect to PyBullet physics server"""
        # GUI mode for visualization, DIRECT mode for headless operation
        self.client_id = p.connect(p.GUI)
        p.setGravity(0, 0, -9.81)
        p.setAdditionalSearchPath(pybullet_data.getDataPath())
        print(f"Connected to physics server (client_id={self.client_id})")

    def load_robot(self) -> None:
        """Load robot URDF and set initial position"""
        if self.client_id is None:
            raise RuntimeError("Must connect to physics server first")

        # Load the robot at a starting position
        start_pos = [0, 0, 0.1]  # x, y, z
        start_orientation = p.getQuaternionFromEuler([0, 0, 0])  # roll, pitch, yaw
        self.robot_id = p.loadURDF(
            self.urdf_file,
            start_pos,
            start_orientation,
            useFixedBase=False
        )
        print(f"Robot loaded (ID={self.robot_id})")

        # Get motor joint indices
        num_joints = p.getNumJoints(self.robot_id)
        print(f"Robot has {num_joints} joints")

        for joint_id in range(num_joints):
            joint_info = p.getJointInfo(self.robot_id, joint_id)
            joint_name = joint_info[1].decode('utf-8')
            joint_type = joint_info[2]

            # Only control revolute joints (motors)
            if joint_type == p.JOINT_REVOLUTE:
                self.motor_ids.append(joint_id)
                print(f"  Found motor: {joint_name} (joint_id={joint_id})")

    def load_ground(self) -> None:
        """Load ground plane"""
        p.loadURDF("plane.urdf", [0, 0, -0.1])
        print("Ground plane loaded")

    def move_forward(self, speed: float = 1.0, duration: float = 2.0) -> None:
        """
        Command robot to move forward.

        Args:
            speed: Motor speed (0 to 1)
            duration: How long to move (seconds)
        """
        if not self.motor_ids:
            raise RuntimeError("No motors found in robot")

        # Set target velocity for first two motors (usually wheel motors)
        if len(self.motor_ids) >= 2:
            target_velocity = speed * 10.0  # Scale to rad/sec
            p.setJointMotorControl2(
                self.robot_id,
                self.motor_ids[0],
                p.VELOCITY_CONTROL,
                targetVelocity=target_velocity,
                force=1000  # Motor force in Newtons
            )
            p.setJointMotorControl2(
                self.robot_id,
                self.motor_ids[1],
                p.VELOCITY_CONTROL,
                targetVelocity=target_velocity,
                force=1000
            )

        # Run simulation for the specified duration
        steps = int(duration * 240)  # 240Hz simulation rate
        for _ in range(steps):
            p.stepSimulation()
            time.sleep(1.0 / 240.0)

    def rotate_left(self, speed: float = 1.0, duration: float = 1.0) -> None:
        """Command robot to rotate left"""
        if len(self.motor_ids) >= 2:
            # Left motor slower, right motor faster -> turn left
            p.setJointMotorControl2(
                self.robot_id, self.motor_ids[0], p.VELOCITY_CONTROL,
                targetVelocity=speed * 5.0, force=1000
            )
            p.setJointMotorControl2(
                self.robot_id, self.motor_ids[1], p.VELOCITY_CONTROL,
                targetVelocity=speed * 10.0, force=1000
            )

        steps = int(duration * 240)
        for _ in range(steps):
            p.stepSimulation()
            time.sleep(1.0 / 240.0)

    def stop(self) -> None:
        """Stop all motors"""
        for motor_id in self.motor_ids:
            p.setJointMotorControl2(
                self.robot_id, motor_id, p.VELOCITY_CONTROL,
                targetVelocity=0, force=0
            )

    def get_position(self) -> Tuple[float, float, float]:
        """Get current robot position"""
        pos, _ = p.getBasePositionAndOrientation(self.robot_id)
        return pos

    def disconnect(self) -> None:
        """Disconnect from physics server"""
        p.disconnect(self.client_id)
        print("Disconnected from physics server")

def main():
    """Main simulation loop"""
    print("Starting PyBullet robot simulator...\n")

    robot = SimpleRobot("r2d2.urdf")

    try:
        robot.connect_to_physics_server()
        robot.load_ground()
        robot.load_robot()

        print("\nRunning simulation sequence...\n")

        # Move forward
        print("Command: Move forward for 2 seconds")
        robot.move_forward(speed=0.8, duration=2.0)
        pos = robot.get_position()
        print(f"Position after moving: {pos}\n")

        time.sleep(0.5)

        # Rotate left
        print("Command: Rotate left for 1 second")
        robot.rotate_left(speed=0.8, duration=1.0)
        pos = robot.get_position()
        print(f"Position after rotating: {pos}\n")

        time.sleep(0.5)

        # Move forward again
        print("Command: Move forward for 2 seconds")
        robot.move_forward(speed=0.8, duration=2.0)
        pos = robot.get_position()
        print(f"Final position: {pos}\n")

        robot.stop()
        print("Simulation complete! Check the PyBullet GUI window.")
        time.sleep(5)  # Keep window open for 5 seconds

    finally:
        robot.disconnect()

if __name__ == "__main__":
    main()
```

**Key concepts in the code:**
- **URDF Loading**: Robot description files define structure and motors
- **Motor Control**: `setJointMotorControl2` command sends speed to motors
- **Simulation Stepping**: `p.stepSimulation()` advances physics
- **Position Tracking**: `getBasePositionAndOrientation` reads robot state

## Hands-On Exercise

### Make Your Robot Avoid Obstacles

In this exercise, you'll add a simulated distance sensor to your robot and create simple obstacle avoidance logic.

**Steps:**

1. **Add sensor distance check:**
   ```python
   def simulate_distance_sensor(self) -> float:
       """
       Simulate a distance sensor.
       Returns distance to nearest object in front (simplified).
       """
       # Cast a ray forward from robot center
       ray_start = self.get_position()
       ray_end = (ray_start[0] + 2.0, ray_start[1], ray_start[2])

       results = p.rayTestBatch(
           [ray_start], [ray_end], numThreads=0
       )
       if results[0][0] >= 0:  # Hit something
           return results[0][2]  # Distance to hit
       return 2.0  # No obstacle (max distance)
   ```

2. **Add obstacle to simulation:**
   ```python
   # In main(), after loading robot:
   wall_id = p.loadURDF("cube_small.urdf", [2, 0, 0.5])
   ```

3. **Implement avoidance loop:**
   ```python
   for _ in range(200):  # 200 simulation steps
       distance = robot.simulate_distance_sensor()
       if distance < 0.5:
           print(f"Obstacle detected at {distance:.2f}m - turning")
           robot.rotate_left(speed=0.5, duration=0.2)
       else:
           robot.move_forward(speed=0.8, duration=0.2)
   ```

**Expected outcome:** Your robot should detect the wall and turn away from it, exhibiting simple obstacle avoidance behavior.

## Troubleshooting Common Issues

### "ImportError: No module named 'pybullet'"
**Solution:** Install PyBullet with `pip install pybullet`

### "No GUI appears / Crashes on MacOS"
**Solution:** Use DIRECT mode instead of GUI:
```python
self.client_id = p.connect(p.DIRECT)  # Headless mode
```

### "Robot doesn't move"
**Check:**
- Do you have motor_ids? (Print them to verify)
- Are you calling `p.stepSimulation()`? (Physics won't advance without it)
- Is the `force` parameter high enough? (Try 5000 instead of 1000)

### "Simulation runs very slow"
**Solution:** Reduce simulation frequency or use DIRECT mode without rendering

## Next Steps

Congratulations! You've:
- Set up a physics simulator
- Loaded a robot model
- Controlled motors with Python code
- Simulated sensor-based decision making

**Coming next (Lesson 1.3):** Dive deeper into the core components—sensors, brains, and actuators.

**Explore further:**
- Check out [PyBullet documentation](https://pybullet.org)
- Download [robot URDF files](https://github.com/bullet3-org/bullet3/tree/master/data)
- Explore Gazebo for more advanced simulation

## Community Resources

- **GitHub Discussion**: [Ask for help with simulation setup](https://github.com/physical-ai-book/physical-ai-book/discussions)
- **Code Repository**: Full working examples available on [GitHub](https://github.com/physical-ai-book/physical-ai-book)
- **Related Lessons**: See Lesson 1.3 for detailed sensor and actuator information

---

**Got stuck?** Check the [GitHub Discussions](https://github.com/physical-ai-book/physical-ai-book/discussions) or open an [Issue](https://github.com/physical-ai-book/physical-ai-book/issues).
