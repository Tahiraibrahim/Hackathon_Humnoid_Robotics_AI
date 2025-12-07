---
title: "Choosing and Assembling Your Robot Platform"
description: "Select the right robot platform and learn assembly basics for hands-on robotics"
sidebar_position: 1
difficulty: "Beginner/Intermediate"
duration_minutes: 90
prerequisites: ["Core Concepts (Lesson 1.3)"]
hardware_budget: "$50-150"
keywords: ["robot assembly", "platform selection", "mechanical design", "components"]
---

import { PersonalizationContextButton } from '@site/src/components/PersonalizationContextButton';

<PersonalizationContextButton />

## Learning Objectives

- Choose an appropriate robot platform for learning
- Understand mechanical assembly principles
- Safely assemble a robot from components
- Diagnose common assembly issues
- Understand chassis, drivetrain, and power systems

## Prerequisites

- Completed Lesson 1.3: "Core Concepts"
- Basic comfort with tools and mechanical assembly
- Space for a small robot (~30cm × 30cm)

## Introduction

Before writing code, we build the machine. This lesson covers selecting a robot platform, understanding its components, and assembling everything correctly.

**Why assembly matters:**
- Physical understanding beats simulation
- You'll debug mechanical issues before electrical ones
- Hands-on experience with constraints and real-world physics

## Core Concepts

### Robot Platform Options

**Educational Robotics Kits (Recommended for Learning):**

1. **Wheeled Robots** (Most beginner-friendly)
   - **Example**: Elegoo Smart Robot Car Kit ($40-60)
   - **Pros**: Simple mechanics, easy to program, stable
   - **Cons**: Limited terrain capability
   - **Best for**: Navigation, obstacle avoidance, line-following

2. **Tracked Robots**
   - **Example**: Zumo robot by Pololu
   - **Pros**: Better terrain capability, more stable on slopes
   - **Cons**: More complex mechanics
   - **Best for**: Rough terrain exploration

3. **Quadrupedal/Legged Robots**
   - **Example**: Phantom X Pincher (more advanced)
   - **Pros**: Highly mobile, interesting dynamics
   - **Cons**: Complex coordination, expensive
   - **Best for**: Advanced students

4. **Drone/Mobile Manipulator**
   - **Example**: DroneBlocks, Tello Drone ($100-200)
   - **Pros**: 3D movement, impressive demos
   - **Cons**: Requires more tuning
   - **Best for**: Aerial navigation

**Recommendation for this course:** Start with a **wheeled robot kit** like Elegoo Smart Robot Car. It balances simplicity, cost, and learning value.

### Mechanical Concepts

**Chassis & Structure:**
- The chassis is the robot's body
- Must be rigid enough to not flex
- Should distribute weight evenly
- Typically made from plastic, aluminum, or wood

**Drivetrain (How the robot moves):**
- **Differential drive**: Two independent motors control left/right wheels
- **Four-wheel drive**: More power and traction
- **Skid steering**: Tracks move independently (like military vehicles)

**Weight Distribution:**
- Place heavier components (batteries) low and centered
- Prevents tipping and improves stability
- Monitor center of gravity

### Common Subsystems

1. **Power System**: Battery → Power distribution → Motors and microcontroller
2. **Locomotion**: Motors → Gearbox → Wheels/Tracks → Movement
3. **Sensing**: Sensors → GPIO pins → Microcontroller
4. **Computing**: Microcontroller (Raspberry Pi, Arduino) → Decision making

## Assembly Guide: Elegoo Smart Robot Car

Here's step-by-step assembly for a popular beginner kit:

### Step 1: Inspect Components

Before assembling, verify you have:
- Robot chassis (plastic frame)
- 2 DC motors with gearboxes
- 4 wheels
- Caster wheel (front or back)
- Battery holder (4×AA)
- Motor driver module (L298N)
- Ultrasonic sensor module
- Servo motor (for sensor rotation)
- Arduino board (microcontroller)
- Connecting wires, screws, double-sided tape

### Step 2: Attach Motors to Chassis

1. **Identify motor mounting points** on chassis (usually molded slots)
2. **Apply double-sided tape or plastic clips** to secure motors
3. **Ensure motors are aligned** - both should extend equally from chassis
4. **Test wheels spin freely** before tightening
5. **Verify motors don't interfere** with other components

**Common mistake:** Motors too loose = wheels slip; too tight = binding

### Step 3: Install Wheels and Caster

1. **Slip wheels onto motor shafts**
2. **Secure with included clips or screws**
3. **Wheels should spin freely without wobbling**
4. **Attach caster wheel** to front or back (check documentation)
5. **Ensure chassis doesn't touch ground** - should be ~5mm clearance

### Step 4: Install Power System

1. **Attach battery holder** with double-sided tape (low, centered position)
2. **Connect battery leads** - **RED = Positive, BLACK = Negative** ⚠️
3. **Attach power switch** (safety critical!)
4. **Test with multimeter** - should read 6V (4×AA batteries)

### Step 5: Mount Microcontroller and Sensor

1. **Mount Arduino/microcontroller** to top of chassis
2. **Mount motor driver** (L298N) nearby
3. **Mount ultrasonic sensor** on servo (front-facing)
4. **Secure with double-sided tape or small screws**

### Step 6: Wiring (Most Critical Step)

**Wheel Motor Wiring:**
```
Left Motor  → Motor Driver OUT1/OUT2
Right Motor → Motor Driver OUT3/OUT4
Motor Driver → Arduino GPIO pins (8,9,10,11)
```

**Sensor Wiring:**
```
Ultrasonic Trigger → Arduino GPIO 12
Ultrasonic Echo   → Arduino GPIO 13
Servo             → Arduino PWM pin (5)
```

**Power Wiring:**
```
Battery + → Motor Driver +12V
Battery - → Motor Driver GND
Motor Driver GND → Arduino GND (COMMON GROUND!)
Arduino 5V → Sensors (if required)
```

⚠️ **Critical**: Connect all GND (negative) lines together!

## Hands-On Exercise: Assembly Checkpoint

Follow the assembly guide above. Verify:

1. **Mechanical Check:**
   - [ ] All wheels spin freely
   - [ ] Chassis doesn't rock (even contact on all wheels)
   - [ ] Caster wheel maintains small clearance
   - [ ] Nothing protrudes that could catch

2. **Electrical Check:**
   - [ ] All wires connected (use multimeter to verify)
   - [ ] No loose connections
   - [ ] Battery holder secure
   - [ ] Power switch works (kills power completely)

3. **Safety Check:**
   - [ ] No exposed wires (insulate with tape if needed)
   - [ ] No components will fall off
   - [ ] Battery secured (won't slide during acceleration)

**If motors don't spin:** Check polarity (swap + and - if needed)

## Troubleshooting

### Wheels don't spin
- **Check**: Is power on? (LED on motor driver?)
- **Check**: Are motor wires connected to driver?
- **Check**: Try swapping wires (might be reversed polarity)

### Robot pulls to one side
- **Likely cause**: Motors have different speeds
- **Solution**: We'll calibrate this in next lesson

### Caster wobbles excessively
- **Check**: Is it attached firmly?
- **Fix**: Add small rubber washer if loose

### Battery dies quickly
- **Check**: Correct battery voltage? (Should be 6V for most kits)
- **Check**: Are both motors drawing power simultaneously?
- **Solution**: Consider larger capacity battery

## Next Steps

You now have a functional robot platform! Next lesson, we'll:
- Connect power properly
- Test motors safely
- Prepare for programming

**Going deeper:**
- Learn about gear ratios and motor torque
- Understand wheel diameter vs. speed vs. torque trade-off
- Explore active suspension for uneven terrain

## Community Resources

- **Assembly Help**: [Post assembly questions](https://github.com/physical-ai-book/physical-ai-book/discussions)
- **Kit Documentation**: Check manufacturer's assembly guide for your specific kit
- **Videos**: Search "[Your Robot Kit] assembly tutorial" on YouTube

---

**Done assembling?** Move to Lesson 2.2: Wiring and Powering Your Robot!
