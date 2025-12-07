---
title: "Programming Motor Control"
description: "Master motor control: PWM, speed calibration, and implementing safe, responsive movement"
sidebar_position: 3
difficulty: "Intermediate"
duration_minutes: 75
prerequisites: ["Wiring and Powering (Lesson 2.2)"]
hardware_budget: "Included in previous lessons"
keywords: ["PWM", "motor speed", "calibration", "PID control", "safety"]
---

import { PersonalizationContextButton } from '@site/src/components/PersonalizationContextButton';

<PersonalizationContextButton />

## Learning Objectives

- Understand PWM (Pulse Width Modulation) and motor speed control
- Implement motor calibration to balance left/right speeds
- Create safe motor control with emergency stop
- Use feedback for precise motor control
- Debug motor synchronization issues

## Prerequisites

- Completed Lesson 2.2: "Wiring and Powering Your Robot"
- Comfortable with Arduino programming

## Introduction

In this lesson, we implement the "brain" that controls your robot's movement. You'll learn advanced motor control techniques used in real robots: PWM for speed, calibration for balance, and safety mechanisms.

## Core Concepts

### PWM (Pulse Width Modulation)

Motors don't respond to digital ON/OFF signals well. Instead, we use **PWM**: rapidly switching power on and off. The ratio of ON-time to total time controls speed.

**Example:**
- 100% duty cycle: Power always ON → full speed
- 50% duty cycle: Power ON half the time → half speed
- 10% duty cycle: Power ON briefly → crawling speed
- 0% duty cycle: Power always OFF → stopped

**Advantages:**
- Smooth speed control (0-255 range in Arduino)
- Works at low speeds (minimum torque)
- Efficient (no power wasted as heat in resistors)

### Motor Calibration

Two identical motors rarely spin at the same speed due to manufacturing variations. You'll implement **calibration** to measure actual speeds and compensate.

**Process:**
1. Send same PWM to both motors
2. Measure actual rotation speeds (RPM) using encoder
3. Adjust PWM values to match speeds
4. Store calibration constants

## Advanced Motor Control Code

```cpp
/*
Complete motor control system with calibration and safety
*/

#include <PID_v1.h>  // Include PID library

// Motor pins
const int LEFT_IN1 = 8, LEFT_IN2 = 9, LEFT_PWM = 5;
const int RIGHT_IN1 = 10, RIGHT_IN2 = 11, RIGHT_PWM = 6;

// Encoder pins (count motor rotations)
const int LEFT_ENCODER = 2, RIGHT_ENCODER = 3;

// Motor speed limits (PWM 0-255)
const int MAX_PWM = 200;  // Don't use full 255 to avoid brownout
const int DEADZONE = 30;  // Minimum PWM to overcome friction

// Encoder variables
volatile int left_encoder_count = 0;
volatile int right_encoder_count = 0;

// Calibration factors (determined empirically)
float left_cal = 1.0;
float right_cal = 1.0;

// PID controller for motor speed (optional, advanced)
double left_target = 0, left_current = 0;
double right_target = 0, right_current = 0;
PID leftPID(&left_current, &left_pwm, &left_target, 2.0, 5.0, 1.0, DIRECT);
PID rightPID(&right_current, &right_pwm, &right_target, 2.0, 5.0, 1.0, DIRECT);

void setup() {
  Serial.begin(9600);

  // Setup motor pins
  pinMode(LEFT_IN1, OUTPUT);
  pinMode(LEFT_IN2, OUTPUT);
  pinMode(LEFT_PWM, OUTPUT);
  pinMode(RIGHT_IN1, OUTPUT);
  pinMode(RIGHT_IN2, OUTPUT);
  pinMode(RIGHT_PWM, OUTPUT);

  // Setup encoder pins with interrupts
  pinMode(LEFT_ENCODER, INPUT);
  pinMode(RIGHT_ENCODER, INPUT);
  attachInterrupt(digitalPinToInterrupt(LEFT_ENCODER),
                  leftEncoderISR, RISING);
  attachInterrupt(digitalPinToInterrupt(RIGHT_ENCODER),
                  rightEncoderISR, RISING);

  // Start with motors stopped
  stopMotors();

  // Load calibration if available
  loadCalibration();

  Serial.println("Motor control ready. Type commands:");
  Serial.println("  F:speed (forward)  B:speed (backward)");
  Serial.println("  L:speed (left)     R:speed (right)");
  Serial.println("  S (stop)           C (calibrate)");
}

// Interrupt handlers for encoder counting
void leftEncoderISR() {
  left_encoder_count++;
}

void rightEncoderISR() {
  right_encoder_count++;
}

void setMotorSpeed(int motor, int speed) {
  """
  Set motor speed: -255 (reverse) to +255 (forward)
  Motor: 0=left, 1=right
  Applies calibration and dead-zone compensation
  """
  speed = constrain(speed, -MAX_PWM, MAX_PWM);

  // Apply dead-zone: motors won't move below minimum
  if (abs(speed) > 0 && abs(speed) < DEADZONE) {
    speed = (speed > 0) ? DEADZONE : -DEADZONE;
  }

  // Apply calibration factors
  if (motor == 0) {
    speed = speed * left_cal;
  } else {
    speed = speed * right_cal;
  }

  speed = constrain(speed, -MAX_PWM, MAX_PWM);

  // Set direction and speed
  if (motor == 0) {  // Left motor
    digitalWrite(LEFT_IN1, speed > 0);
    digitalWrite(LEFT_IN2, speed < 0);
    analogWrite(LEFT_PWM, abs(speed));
  } else {  // Right motor
    digitalWrite(RIGHT_IN1, speed > 0);
    digitalWrite(RIGHT_IN2, speed < 0);
    analogWrite(RIGHT_PWM, abs(speed));
  }
}

void moveForward(int speed) {
  setMotorSpeed(0, speed);
  setMotorSpeed(1, speed);
}

void turnLeft(int speed) {
  setMotorSpeed(0, speed / 3);
  setMotorSpeed(1, speed);
}

void turnRight(int speed) {
  setMotorSpeed(0, speed);
  setMotorSpeed(1, speed / 3);
}

void stopMotors() {
  setMotorSpeed(0, 0);
  setMotorSpeed(1, 0);
}

void calibrateMotors() {
  """
  Measure actual motor speeds and calculate calibration factors
  """
  Serial.println("Starting calibration...");
  Serial.println("Sending 50% power to both motors");

  int test_speed = MAX_PWM / 2;

  // Reset encoder counters
  left_encoder_count = 0;
  right_encoder_count = 0;

  // Send test signal
  setMotorSpeed(0, test_speed);
  setMotorSpeed(1, test_speed);

  // Measure for 2 seconds
  delay(2000);

  // Read results
  int left_rotations = left_encoder_count;
  int right_rotations = right_encoder_count;

  stopMotors();

  Serial.print("Left rotations: ");
  Serial.println(left_rotations);
  Serial.print("Right rotations: ");
  Serial.println(right_rotations);

  // Calculate calibration factors
  if (right_rotations > 0) {
    float avg = (left_rotations + right_rotations) / 2.0;
    left_cal = avg / left_rotations;
    right_cal = avg / right_rotations;
  }

  Serial.print("Left calibration: ");
  Serial.println(left_cal);
  Serial.print("Right calibration: ");
  Serial.println(right_cal);

  Serial.println("Calibration complete!");
}

void loadCalibration() {
  // In a complete implementation, load from EEPROM
  // For now, using default values set at top
}

void loop() {
  if (Serial.available()) {
    char command = Serial.read();
    int speed = Serial.parseInt();

    switch (command) {
      case 'F':
        moveForward(speed);
        Serial.print("Forward: ");
        Serial.println(speed);
        break;
      case 'B':
        moveForward(-speed);
        Serial.print("Backward: ");
        Serial.println(speed);
        break;
      case 'L':
        turnLeft(speed);
        break;
      case 'R':
        turnRight(speed);
        break;
      case 'S':
        stopMotors();
        Serial.println("Stopped");
        break;
      case 'C':
        calibrateMotors();
        break;
    }
  }
}
```

## Hands-On Exercise: Motor Calibration

1. **Upload the code above** to your Arduino
2. **Open Serial Monitor** (Tools → Serial Monitor, 9600 baud)
3. **Type `C` and hit enter** to run calibration
4. **Check output** - note the calibration factors
5. **Test straight movement** - type `F150` to move forward at speed 150

**Expected result:** Robot should move in straighter line than before.

## Troubleshooting

### Robot still pulls to one side
- **Cause**: Calibration factors not strong enough
- **Fix**: Increase motor powers in setMotorSpeed() to compensate more
- **Or**: Check for mechanical friction (wheel drag, misalignment)

### Motors stall (hum but don't turn)
- **Cause**: PWM too low (below dead-zone)
- **Fix**: Increase DEADZONE constant or increase input speed

### Robot jerks or vibrates
- **Cause**: Rapid on-off at low PWM
- **Fix**: Increase PWM frequency (Arduino PWM is usually 490Hz)

## Next Steps

You've mastered motor control! You can now:
- Control motor speed smoothly
- Calibrate for balanced movement
- Implement complex motion patterns

**Coming up (Chapter 3):** Add sensors and create intelligent navigation behaviors.

## Community Resources

- **Motor control questions**: [GitHub Discussions](https://github.com/physical-ai-book/physical-ai-book/discussions)
- **PID Libraries**: Search for "Arduino PID library" for advanced control
- **Encoder Options**: Hall effect sensors, optical encoders

---

**Next chapter: Sensor Integration and Decision-Making!**
