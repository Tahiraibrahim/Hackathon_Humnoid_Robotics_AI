---
title: "Wiring and Powering Your Robot"
description: "Safely wire your robot's motors, sensors, and power system without damaging components"
sidebar_position: 2
difficulty: "Beginner/Intermediate"
duration_minutes: 60
prerequisites: ["Choosing and Assembling (Lesson 2.1)"]
hardware_budget: "Included in previous lesson"
keywords: ["GPIO", "power distribution", "wiring", "electrical safety", "multimeter"]
---

import { PersonalizationContextButton } from '@site/src/components/PersonalizationContextButton';

<PersonalizationContextButton />

## Learning Objectives

- Understand GPIO pins and their functions
- Safely distribute power to motors and microcontroller
- Use a multimeter to verify connections
- Troubleshoot electrical faults
- Implement proper grounding practices

## Prerequisites

- Completed Lesson 2.1: "Choosing and Assembling Your Robot"
- Basic electrical safety knowledge

## Introduction

Incorrect wiring is a leading cause of component failure. This lesson teaches electrical safety and proper power distribution. We'll use a multimeter to verify everything works before connecting the microcontroller.

## Core Concepts

### GPIO (General Purpose Input/Output) Pins

GPIO pins connect the microcontroller (Arduino, Raspberry Pi) to external components:

**Input Pins** (read data FROM sensors):
- Detect voltage: 0V = LOW (logic 0), 5V = HIGH (logic 1)
- Used for distance sensors, buttons, encoders
- 0V means "nothing happening", 5V means "event detected"

**Output Pins** (send signals TO actuators):
- Send voltage: can turn ON (5V) or OFF (0V)
- Used to control motors via motor driver, LEDs, servos
- PWM (Pulse Width Modulation) pins control power levels

**PWM Pins** (special output pins):
- Send rapidly switching signals (frequency: 490Hz typical)
- Pulse width controls power delivered
- 50% duty = half power, 100% duty = full power
- Marked with `~` symbol on Arduino boards

### Motor Driver

The motor driver is a "power amplifier" that:
- Receives low-power signals from microcontroller
- Switches high-power current to motors
- Protects microcontroller from motor back-EMF (voltage spikes)

L298N motor driver pinout:
```
IN1, IN2: Control left motor (one pin HIGH, one LOW for direction)
IN3, IN4: Control right motor
ENA, ENB: Enable/PWM pins for speed control
```

### Power Distribution

**Voltage Levels:**
- Microcontroller: 5V (most Arduino boards)
- Motors: 6-12V depending on kit
- Sensors: 5V or 3.3V

**Current (Amperage):**
- Microcontroller: ~500mA max
- Motors: 1-2A each during operation
- Sensors: ~10-50mA each

**Safety Rule**: Never draw motor current through microcontroller GPIO pins - use motor driver!

## Wiring Practice: Complete Motor Control

Here's the correct wiring for a two-motor robot:

```
POWER DISTRIBUTION:
Battery (+6V) → Motor Driver VCC → Microcontroller 5V OUT (if needed)
Battery (GND) → Motor Driver GND → Microcontroller GND → Motor GND
                                                          Sensor GND

MOTOR WIRING (to Motor Driver L298N):
Left Motor (+/- wires) → OUT1/OUT2
Right Motor (+/- wires) → OUT3/OUT4

MOTOR CONTROL (Microcontroller to Motor Driver):
Arduino D8 → L298N IN1 (left motor direction)
Arduino D9 → L298N IN2 (left motor direction)
Arduino D5 → L298N ENA (PWM for left speed)
Arduino D10 → L298N IN3 (right motor direction)
Arduino D11 → L298N IN4 (right motor direction)
Arduino D6 → L298N ENB (PWM for right speed)

SENSOR WIRING (Ultrasonic Distance Sensor):
Arduino D12 → Sensor Trigger pin
Arduino D13 → Sensor Echo pin
```

## Code Example: Motor Control with Safety

```python
"""
Arduino-compatible code for motor control
(Can be written in Arduino IDE or uploaded as .ino file)
"""

// Motor pins
const int LEFT_IN1 = 8, LEFT_IN2 = 9, LEFT_ENABLE = 5;
const int RIGHT_IN1 = 10, RIGHT_IN2 = 11, RIGHT_ENABLE = 6;

// Safety limits
const int MAX_SPEED = 255;  // 0-255 PWM range
const int MIN_SPEED = 50;   // Don't run at <50 to prevent stall

void setup() {
  Serial.begin(9600);
  pinMode(LEFT_IN1, OUTPUT);
  pinMode(LEFT_IN2, OUTPUT);
  pinMode(LEFT_ENABLE, OUTPUT);
  pinMode(RIGHT_IN1, OUTPUT);
  pinMode(RIGHT_IN2, OUTPUT);
  pinMode(RIGHT_ENABLE, OUTPUT);

  // Start with motors stopped
  stopMotors();
  Serial.println("Motor control initialized");
}

void setMotorSpeed(int motor, int speed) {
  """
  Set motor speed: -255 (reverse full) to +255 (forward full)
  Motor: 0=left, 1=right
  """
  speed = constrain(speed, -MAX_SPEED, MAX_SPEED);

  int pwm_value = abs(speed);
  bool is_reverse = speed < 0;

  if (motor == 0) {  // Left motor
    digitalWrite(LEFT_IN1, !is_reverse);
    digitalWrite(LEFT_IN2, is_reverse);
    analogWrite(LEFT_ENABLE, pwm_value);
  } else {  // Right motor
    digitalWrite(RIGHT_IN1, !is_reverse);
    digitalWrite(RIGHT_IN2, is_reverse);
    analogWrite(RIGHT_ENABLE, pwm_value);
  }
}

void moveForward(int speed) {
  setMotorSpeed(0, speed);
  setMotorSpeed(1, speed);
}

void turnLeft(int speed) {
  setMotorSpeed(0, speed / 2);  // Slow left motor
  setMotorSpeed(1, speed);      // Full speed right motor
}

void stopMotors() {
  setMotorSpeed(0, 0);
  setMotorSpeed(1, 0);
}

void loop() {
  moveForward(150);  // Half speed
  delay(2000);
  turnLeft(150);
  delay(1000);
}
```

## Hands-On Exercise: Verification Checklist

**Before powering on, check with multimeter:**

1. **Power Supply Test:**
   - [ ] Battery to ground: should read battery voltage (6V typical)
   - [ ] Motor driver VCC to ground: should read same as battery
   - [ ] No shorts (resistance should not be 0Ω between power and ground)

2. **Motor Wiring Test:**
   - [ ] Motor connections loose/tight?
   - [ ] Do motors spin when battery connected? (No microcontroller needed yet)
   - [ ] Both motors spin same direction?

3. **Safety Test:**
   - [ ] Can you flip an OFF switch that completely disconnects power?
   - [ ] Are all exposed wires insulated?
   - [ ] Nothing will fall on spinning motors?

4. **Signal Line Test:**
   - [ ] Multimeter on GPIO pins shows 0V (LOW)
   - [ ] After uploading code, does voltage change to 5V (HIGH)?

**If motors don't respond to code:**
- Check motor wires are connected to motor driver (not directly to Arduino)
- Verify motor driver VCC is connected to battery
- Ensure common ground between all components

## Troubleshooting

### Motors don't spin at all
- **First check**: Is battery connected? Is power switch ON?
- **Use multimeter**: Measure voltage at motor driver VCC - should read battery voltage
- **Motor driver fault**: Check if all power wires are connected

### Motors spin wrong direction
- **Expected**: Doesn't matter at this stage
- **Fix**: Swap motor wire polarity (+ and -)
- **Or**: Invert IN1/IN2 logic in code

### One motor slower than other
- **Cause**: Different motor characteristics or battery voltage sag
- **Fix**: Calibration in next lesson handles this

### Microcontroller gets hot
- **Danger!** Stop immediately
- **Cause**: Likely short circuit
- **Fix**: Disconnect everything and check wiring with multimeter

### Smoke or burning smell
- **DANGER!** Disconnect power immediately
- **Cause**: Likely short circuit
- **Check**: Did motor wires accidentally connect to microcontroller GPIO?

## Next Steps

You've successfully:
- Understood GPIO and power distribution
- Wired motors to motor driver
- Implemented motor control code
- Verified everything with multimeter

**Next (Lesson 2.3):** Advanced motor control including speed calibration and safety features.

## Community Resources

- **Wiring Help**: [GPIO wiring questions](https://github.com/physical-ai-book/physical-ai-book/discussions)
- **Multimeter Guide**: [How to use multimeter safely](https://learn.sparkfun.com/tutorials/how-to-use-a-multimeter)
- **Motor Driver Docs**: L298N datasheet available online

---

**Wiring complete?** Ready for Lesson 2.3: Programming Motor Control!
