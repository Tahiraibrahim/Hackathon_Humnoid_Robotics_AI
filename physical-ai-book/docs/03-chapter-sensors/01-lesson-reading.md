---
title: "Reading and Interpreting Sensor Data"
description: "Master sensor integration: read multiple sensors, filter noise, and calibrate for accuracy"
sidebar_position: 1
difficulty: "Intermediate"
duration_minutes: 75
prerequisites: ["Programming Motor Control (Lesson 2.3)"]
hardware_budget: "Included in robot kit"
keywords: ["sensor reading", "calibration", "noise filtering", "accuracy"]
---

import { PersonalizationContextButton } from '@site/src/components/PersonalizationContextButton';

<PersonalizationContextButton />

## Learning Objectives

- Read distance sensors (ultrasonic, infrared)
- Implement noise filtering algorithms
- Calibrate sensors for accurate measurements
- Debug sensor malfunctions
- Fuse multiple sensors for better data

## Core Concepts

### Common Sensor Types

**Ultrasonic Distance Sensors:**
- Send sound pulse, measure echo time
- Range: 2cm - 4m
- Accuracy: ±3cm
- Update rate: 10-50 Hz
- **Limitation**: Wide beam angle, doesn't work well on soft surfaces

**Infrared (IR) Distance Sensors:**
- Emit IR light, measure reflected intensity
- Range: 10cm - 80cm
- Accuracy: ±5-10cm (varies with surface)
- Update rate: 50+ Hz
- **Limitation**: Affected by ambient light

**Line-Following Sensors:**
- Detect light/dark surfaces for maze navigation
- Array of IR emitters and receivers
- Binary or analog output
- Excellent for structured environments

### Noise and Filtering

Real sensor data is noisy. Common sources:
- Electrical interference
- Sensor jitter
- Environmental factors (lighting, temperature)

**Filtering Techniques:**

1. **Moving Average**: Smooth out spikes
2. **Exponential Moving Average**: Weight recent data more
3. **Median Filter**: Robust to outliers
4. **Kalman Filter**: Optimal for noisy systems (advanced)

## Code Example: Multi-Sensor Reading System

```cpp
/*
Advanced sensor reading with filtering and calibration
*/

// Sensor pins
const int ULTRASONIC_TRIGGER = 12;
const int ULTRASONIC_ECHO = 13;
const int IR_LEFT = A0;
const int IR_CENTER = A1;
const int IR_RIGHT = A2;

// Calibration constants (measure these empirically)
const float IR_DISTANCE_FACTOR = 27.86;  // cm per analog unit
const float ULTRASONIC_SPEED_OF_SOUND = 343.0;  // m/s at 20°C

class Sensor {
  private:
    float value = 0.0;
    float smoothed_value = 0.0;
    const float ALPHA = 0.7;  // Smoothing factor (0-1)

  public:
    void update(float raw_value) {
      // Exponential moving average filter
      smoothed_value = ALPHA * raw_value + (1 - ALPHA) * smoothed_value;
    }

    float get_value() {
      return smoothed_value;
    }
};

Sensor ultrasonic_sensor, ir_left, ir_center, ir_right;

void setup() {
  Serial.begin(9600);
  pinMode(ULTRASONIC_TRIGGER, OUTPUT);
  pinMode(ULTRASONIC_ECHO, INPUT);
  pinMode(IR_LEFT, INPUT);
  pinMode(IR_CENTER, INPUT);
  pinMode(IR_RIGHT, INPUT);

  Serial.println("Sensor system initialized");
}

float read_ultrasonic_cm() {
  """Read ultrasonic sensor distance in centimeters"""
  digitalWrite(ULTRASONIC_TRIGGER, LOW);
  delayMicroseconds(2);
  digitalWrite(ULTRASONIC_TRIGGER, HIGH);
  delayMicroseconds(10);
  digitalWrite(ULTRASONIC_TRIGGER, LOW);

  // Measure pulse duration
  long duration = pulseIn(ULTRASONIC_ECHO, HIGH, 30000);

  // Convert to distance: distance = (time * speed_of_sound) / 2
  float distance_cm = (duration / 2.0) * (ULTRASONIC_SPEED_OF_SOUND / 10000.0);

  return distance_cm;
}

float read_ir_cm(int pin) {
  """Read IR sensor distance in centimeters"""
  int raw = analogRead(pin);

  // IR sensors have non-linear response
  // Empirically calibrated formula
  float distance_cm = IR_DISTANCE_FACTOR / (raw + 5);

  return distance_cm;
}

void calibrate_sensors() {
  """
  Calibration routine - run this with known distances
  """
  Serial.println("Calibrating sensors...");
  Serial.println("Place obstacle at 20cm and press any key");

  while (!Serial.available());
  Serial.read();

  int ultrasonic_raw = 0, ir_left_raw = 0, ir_center_raw = 0, ir_right_raw = 0;

  // Take 10 readings and average
  for (int i = 0; i < 10; i++) {
    ultrasonic_raw += read_ultrasonic_cm();
    ir_left_raw += analogRead(IR_LEFT);
    ir_center_raw += analogRead(IR_CENTER);
    ir_right_raw += analogRead(IR_RIGHT);
    delay(50);
  }

  Serial.print("Ultrasonic (avg): ");
  Serial.println(ultrasonic_raw / 10.0);
  Serial.print("IR Left (avg): ");
  Serial.println(ir_left_raw / 10.0);
  Serial.print("IR Center (avg): ");
  Serial.println(ir_center_raw / 10.0);
  Serial.print("IR Right (avg): ");
  Serial.println(ir_right_raw / 10.0);

  Serial.println("Use these values to calculate calibration factors");
}

void print_sensor_data() {
  """Read and display all sensors"""
  // Read ultrasonic
  float ultra = read_ultrasonic_cm();
  ultrasonic_sensor.update(ultra);

  // Read IR sensors
  float ir_l = read_ir_cm(IR_LEFT);
  float ir_c = read_ir_cm(IR_CENTER);
  float ir_r = read_ir_cm(IR_RIGHT);

  ir_left.update(ir_l);
  ir_center.update(ir_c);
  ir_right.update(ir_r);

  // Print formatted output
  Serial.print("Ultra: ");
  Serial.print(ultrasonic_sensor.get_value(), 1);
  Serial.print("cm | IR: ");
  Serial.print(ir_left.get_value(), 1);
  Serial.print(",");
  Serial.print(ir_center.get_value(), 1);
  Serial.print(",");
  Serial.println(ir_right.get_value(), 1);
}

void loop() {
  print_sensor_data();
  delay(100);

  // Type 'C' in serial monitor to calibrate
  if (Serial.available()) {
    char cmd = Serial.read();
    if (cmd == 'C') {
      calibrate_sensors();
    }
  }
}
```

## Hands-On Exercise: Sensor Calibration

1. **Upload the code** to your Arduino
2. **Open Serial Monitor** (9600 baud)
3. **Place obstacle 30cm away**
4. **Note sensor readings** for 30cm distance
5. **Move obstacle to 60cm** and note readings
6. **Calculate calibration factors** from the difference

**Verification:**
- Ultrasonic should read ±3cm accuracy
- IR sensors should be consistent
- No wild spikes in readings

## Troubleshooting

### Sensor returns constant value
- **Check**: Is sensor wired correctly?
- **Check**: Is sensor powered (look for LED)?
- **Fix**: Verify GPIO pin numbers match code

### Readings jump around (noisy)
- **Solution**: Increase ALPHA (smoothing factor) to 0.9
- **Or**: Add median filter for outlier rejection

### Distance measurements off by constant amount
- **Cause**: Calibration needed
- **Fix**: Update calibration constants based on measurements

## Next Steps

You've mastered sensor reading! Next lesson: **Reactive Control Logic** - turn sensor data into intelligent behavior.

---

**Ready?** Move to Lesson 3.2: Reactive Control Logic!
