---
title: "TEMPLATE: Lesson Title (3-8 words)"
description: "TEMPLATE: One sentence summary of what reader will learn (max 150 characters). This appears in search results."
sidebar_position: 1
difficulty: "Beginner"  # One of: Beginner, Intermediate, Advanced
duration_minutes: 45  # Total time including exercise
prerequisites:
  - "Prior lesson or knowledge"
  - "Specific skill assumed"
hardware_budget: "$0"  # Format: $X or $X-Y USD
keywords:
  - "topic1"
  - "topic2"
  - "topic3"
author: "Author Name"
last_updated: "2025-12-05"
---

# [TITLE] - LESSON TEMPLATE

**Branch**: `001-book-structure` | **Chapter**: X | **Lesson**: X.X | **Status**: Template

---

## Learning Objectives

By the end of this lesson, you will be able to:

- **Objective 1**: Action verb + skill (e.g., "Explain how PWM controls motor speed")
- **Objective 2**: Action verb + skill (e.g., "Write Python functions to control motors")
- **Objective 3**: Action verb + skill (e.g., "Debug motor control issues")
- **Objective 4**: Action verb + skill (optional 4th objective)
- **Objective 5**: Action verb + skill (optional 5th objective)

**Teaching Notes**:
- Objectives must be testable (can you verify the reader learned it?)
- Use action verbs: Explain, Demonstrate, Implement, Debug, Analyze
- Avoid vague verbs: Understand, Know, Learn, Appreciate
- Each objective should map to a section in the lesson

---

## Prerequisites

Before starting this lesson, ensure you:

- **Completed**: Lesson X.Y (provide full link if referencing prior lesson)
- **Have**: Any hardware required (list specific models)
- **Know**: Prior concepts (e.g., "basic Python functions", "understanding of circuits")
- **Time**: Approximately 45-60 minutes (be realistic about time investment)

**Why These Prerequisites?**
- Explain why each is important for this lesson's success

---

## Introduction

*(Target: 300-500 words)*

### Why This Matters

Open with a hook:
- Real-world scenario where this skill is used
- Problem this lesson solves
- Excitement/motivation for the reader

### What You'll Build

Concrete description of what reader will accomplish:
- "You'll write Python code to..."
- "You'll test your robot's ability to..."
- "You'll understand how..."

### How This Fits

Connect to larger learning journey:
- "In the previous lesson, you learned..."
- "In the next lesson, you'll use this..."
- "This is foundational for..."

### Learning Approach

Explain the hands-on philosophy:
- "We'll start by looking at real code, then understand why it works"
- "You'll test your implementation immediately"
- "Multiple approaches work; we'll explore tradeoffs"

---

## Core Concepts

*(Target: 1,000-1,500 words)*

Use headings to break into 3-4 sub-sections. Each section ~300-400 words.

### Concept 1: [Topic Name]

**What it is**: Plain English explanation (1-2 sentences)

**Why it matters**: Why a reader should care about this concept

**How it works**: Detailed explanation with analogy from everyday life

```
Example diagram or visualization (as text or reference to image)
```

**Real-world analogy**:
> "Think of [concept] like [everyday analogy]. When you [action], [connection to concept] happens."

**Key points**:
- Bullet 1
- Bullet 2
- Bullet 3

### Concept 2: [Topic Name]

*(Same structure as above)*

### Concept 3: [Topic Name]

*(Same structure as above)*

**Teaching Notes**:
- Use analogies frequently (readers learn through comparison)
- Define jargon on first use ("Motor driver (a special circuit that...)")
- Avoid: "obviously", "simply", "just" (gatekeeping language)
- Show diagrams with alt-text for visual learners
- Use examples from readers' experience

---

## Code Example

Complete, tested, runnable code demonstrating core concepts.

**This code is tested on**: Raspberry Pi 4 with Python 3.9

### Setup

If reader needs to install anything or set up:

```bash
pip install required-package==1.2.3
```

### Main Example

```python
"""
Module docstring explaining what this code does.

This module provides functions to control robot motors with PWM.
"""

from typing import Optional
import time

# Configure Raspberry Pi GPIO
MOTOR_PIN_A = 17  # GPIO pin for motor control
MOTOR_PIN_B = 27  # GPIO pin for motor direction
PWM_FREQUENCY = 50  # Hertz


def init_motor() -> None:
    """
    Initialize motor pins for control.

    Raises:
        RuntimeError: If GPIO pins cannot be initialized.
    """
    try:
        # GPIO setup code here
        print("Motor initialized successfully")
    except Exception as e:
        raise RuntimeError(f"Failed to initialize motor: {e}") from e


def set_motor_speed(speed: float) -> None:
    """
    Set motor speed using PWM (Pulse Width Modulation).

    Args:
        speed: Speed as float from -1.0 (full reverse) to 1.0 (full forward).
               0.0 = motor stopped.

    Raises:
        ValueError: If speed is not between -1.0 and 1.0.

    Example:
        >>> set_motor_speed(0.5)  # 50% forward
        >>> set_motor_speed(-1.0)  # Full reverse
    """
    if not -1.0 <= speed <= 1.0:
        raise ValueError(f"Speed must be -1.0 to 1.0, got {speed}")

    # Calculate PWM duty cycle (0-100%)
    duty_cycle = abs(speed) * 100

    # Determine direction
    direction = "forward" if speed >= 0 else "reverse"

    print(f"Motor: {direction} at {duty_cycle}% speed")


def stop_motor() -> None:
    """Stop motor immediately (safety feature)."""
    print("Motor stopped (emergency stop)")


# Example usage
if __name__ == "__main__":
    init_motor()

    # Move forward gradually
    for speed in [0.25, 0.5, 0.75, 1.0]:
        set_motor_speed(speed)
        time.sleep(2)

    # Stop
    stop_motor()
```

### Code Walkthrough

**Line 1-5**: Module documentation and imports
- We import `typing` for type hints (helps catch errors early)
- We import `time` for delays between motor commands

**Line 8-10**: Configuration constants
- GPIO pins are Raspberry Pi hardware addresses
- PWM frequency controls motor smoothness

**Line 13-20**: `init_motor()` function
- Sets up motor pins for control
- Uses try-except for error handling (defensive programming)
- Prints success message for user feedback

**Line 23-45**: `set_motor_speed()` function
- Takes speed from -1.0 (reverse) to 1.0 (forward)
- Validates input (raises error if invalid)
- Converts speed to PWM duty cycle (0-100%)
- Determines direction (forward or reverse)

**Line 48-49**: `stop_motor()` function
- Emergency stop command
- Always succeeds (no error checking needed)

**Line 52-60**: Main execution
- Initializes motor
- Tests speeds from 25% to 100%
- Includes 2-second delays for safety
- Stops motor

### Variations & Platform-Specific Code

<details>
<summary>**For users WITHOUT Raspberry Pi (simulation)**</summary>

If you don't have a Raspberry Pi, use this simulator:

```python
# Simulated motor (no actual hardware needed)
class SimulatedMotor:
    def __init__(self):
        self.speed = 0.0

    def set_speed(self, speed: float) -> None:
        if -1.0 <= speed <= 1.0:
            self.speed = speed
            print(f"[SIMULATION] Motor speed set to {speed}")
        else:
            raise ValueError(f"Invalid speed: {speed}")

motor = SimulatedMotor()
motor.set_speed(0.5)  # Test without hardware
```

</details>

<details>
<summary>**For different motor driver hardware (L298N vs DRV8833)**</summary>

The example above uses GPIO control. Different motor drivers use different wiring:

```python
# L298N motor driver (common and cheap)
ENABLE_PIN = 17  # PWM pin for speed control
IN1_PIN = 27     # Direction pin 1
IN2_PIN = 22     # Direction pin 2

# DRV8833 motor driver (more efficient)
IN_A_PIN = 17    # Phase A (PWM)
IN_B_PIN = 27    # Phase B (PWM)
```

Choose the driver your kit includes and adjust pins accordingly.

</details>

---

## Hands-On Exercise

Complete this exercise to apply what you learned. Do NOT code this yourself yet; read through first.

### Exercise: Make Your Robot Move in a Pattern

**Difficulty**: Intermediate | **Time**: 15-20 minutes

**Objective**: Write code to make your robot move in a figure-8 pattern.

**Steps**:

1. **Start with the example code above**
   - Copy the code into a file called `robot_exercise.py`
   - Verify it runs without errors

2. **Create a function for figure-8 movement**
   ```python
   def figure_eight_pattern() -> None:
       """Make robot trace a figure-8 pattern."""
       # TODO: Your code here
   ```

3. **Use these helper functions** (already provided in example):
   - `set_motor_speed(speed)` - control speed
   - `stop_motor()` - emergency stop

4. **Figure-8 pattern breakdown**:
   - Move forward at 50% speed for 5 seconds
   - Turn left (adjust motor speeds) for 3 seconds
   - Move forward for 5 seconds
   - Turn right for 3 seconds
   - Repeat 2 times

5. **Test your code**
   - First: verify without robot attached (prints to console)
   - Then: connect robot and test on floor with obstacles clear

**Expected outcome**: Robot traces rough figure-8 on the floor

**How to verify**:
- Put robot on white paper with markers on wheels
- Run code
- Check if marker traces figure-8 pattern

### Troubleshooting (Before You Code)

If you get stuck, don't look at the solution yet! Try:

1. **Reread the Core Concepts section** - The answer is there
2. **Check the code walkthrough** - Does it explain what you need?
3. **Try simpler version first** - Can you make robot move forward then backward?
4. **Use print statements** - Add `print(f"Speed: {speed}")` to debug

### Solution (Only if Stuck)

<details>
<summary>**Reveal solution**</summary>

```python
def figure_eight_pattern() -> None:
    """Make robot trace a figure-8 pattern."""
    for _ in range(2):  # Repeat twice
        # First loop of 8
        set_motor_speed(0.5)
        time.sleep(5)  # Move forward

        # Turn left
        set_motor_speed(0.25)  # Reduce speed
        time.sleep(3)

        # Second loop of 8
        set_motor_speed(0.5)
        time.sleep(5)

        # Turn right
        set_motor_speed(0.75)  # Increase speed
        time.sleep(3)

    stop_motor()
```

</details>

---

## Troubleshooting

*Most readers will encounter at least one of these issues. Normalize troubleshooting as part of learning.*

### Motor Doesn't Move

**Symptoms**: You run the code but nothing happens

**Possible causes & solutions**:

1. **GPIO pins not initialized**
   - **Check**: Do you see "Motor initialized successfully" message?
   - **Solution**: Ensure your code calls `init_motor()` first

2. **Power not connected**
   - **Check**: Is battery plugged in? Any LED lights on motor driver?
   - **Solution**: Verify battery connections with multimeter (should show 5-7V)

3. **Wrong motor driver selected**
   - **Check**: Does your hardware match the code? (L298N, DRV8833, etc.)
   - **Solution**: Adjust GPIO pin numbers to match your wiring diagram

4. **Motor is mechanically stuck**
   - **Check**: Can you move the wheel by hand? Is it connected to chassis?
   - **Solution**: Manually rotate wheel to verify it's not jammed

### Motor Spins Wrong Direction

**Symptoms**: Motor goes backward when you want forward

**Solution**: Swap IN1_PIN and IN2_PIN assignments in code:

```python
# Wrong:
IN1_PIN = 27
IN2_PIN = 22

# Correct (swapped):
IN1_PIN = 22
IN2_PIN = 27
```

Then test again.

### Robot Spins in Circle

**Symptoms**: Both motors don't move at same speed; robot spins instead of going straight

**Possible causes**:

1. **Wheels not aligned** - Check that both wheels point forward
2. **Motor speeds not matched** - One motor may be faster; adjust in code:
   ```python
   left_speed = 0.5
   right_speed = 0.45  # Slightly slower to match right motor
   ```

### On Windows: "Permission Denied" Error

**Symptoms**: `PermissionError: [Errno 13] Permission denied`

**Cause**: Windows GPIO libraries need administrator access

**Solutions**:
1. Run Python as Administrator
2. Or use simulation code (above) instead of real GPIO

---

## Next Steps

### Extend This Lesson

Try these extensions to deepen your learning:

1. **Add acceleration**: Instead of instant speed changes, gradually ramp up to target speed
2. **Add sensor feedback**: Use distance sensor to stop robot if it detects obstacle
3. **Create library**: Wrap motor control in Python class for reuse
4. **Test calibration**: Create script to measure how long robot takes to move 1 meter

### Related Topics (Deeper Dives)

- **PWM (Pulse Width Modulation)**: How PWM actually works electrically
- **PID Control**: Better control algorithm for precise movement
- **Motor Driver Comparison**: Deep dive into L298N vs DRV8833 vs others

### Upcoming Lessons

- **Next lesson**: Lesson 3.1 - Reading Sensors (combining sensors + motor control)
- **Later**: Reactive Control Logic - Making robot respond to environment

### Community Resources

- **Ask a question**: GitHub Discussions for help from community
- **Share your project**: Show your figure-8 pattern variation
- **Report bug**: If code doesn't work as documented, open an issue

---

## Summary

**What you learned**:
- PWM controls motor speed
- GPIO pins interface between Raspberry Pi and motor driver
- Defensive programming catches errors early

**What your robot can now do**:
- Move forward/backward at controllable speeds
- Turn left/right
- Trace patterns on the floor

**Skills for next lesson**:
- You can now combine motor control with sensors (next lesson)

---

## Appendix: Glossary

**GPIO** (General Purpose Input/Output): Pins on Raspberry Pi that can read/write digital signals (0V or 5V)

**PWM** (Pulse Width Modulation): Turning a signal on/off rapidly to simulate analog voltages digitally

**Duty Cycle**: Percentage of time signal is "on" (e.g., 50% duty = signal is on half the time, off half the time)

**Motor Driver**: Electronic circuit that switches high current for motors (Raspberry Pi pins can only handle low current)

**Pin Number**: The physical location on Raspberry Pi where GPIO signal connects (GPIO 17 = physical pin 11)

---

## Metadata

- **Created**: 2025-12-05
- **Chapter**: [X] - [Name]
- **Lesson**: [X.X]
- **Version**: 1.0
- **Status**: Template (ready to adapt for real lessons)
- **Tested on**: Raspberry Pi 4, Python 3.9, Docusaurus 3.x

---

**Ready to create your lesson?**

1. Copy this template
2. Replace [CAPITALIZED PLACEHOLDERS] with your content
3. Follow word count targets for each section
4. Test code on actual hardware
5. Submit for review via GitHub PR

Good luck! 🚀
