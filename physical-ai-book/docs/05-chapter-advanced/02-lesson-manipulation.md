---
title: "Perception and Manipulation"
description: "Add vision and grasping capabilities to enable robots to interact with objects"
sidebar_position: 2
difficulty: "Advanced"
duration_minutes: 120
prerequisites: ["Multi-Robot Coordination (Lesson 5.1)"]
hardware_budget: "$50-200 (camera + gripper)"
keywords: ["computer vision", "object detection", "gripper control", "manipulation", "sim-to-real"]
---

import { PersonalizationContextButton } from '@site/src/components/PersonalizationContextButton';

<PersonalizationContextButton />

## Learning Objectives

- Implement computer vision for object detection
- Control gripper and manipulator mechanisms
- Integrate vision with manipulation
- Handle real-world perception challenges
- Debug sim-to-real transfer issues

## Core Concepts

### Vision Pipeline

**Steps:**
1. **Capture**: Image from camera
2. **Preprocess**: Resize, normalize
3. **Detect**: Find objects using pre-trained model
4. **Locate**: Calculate 3D position
5. **Act**: Plan gripper approach

### Object Detection

**Pre-trained Models:**
- **YOLO**: Real-time, fast (30 FPS)
- **MobileNet**: Lightweight for embedded systems
- **RCNN**: Slower but more accurate

## Code Example: Vision-Based Manipulation

```python
"""
Robot picks objects using vision and gripper control
"""

import cv2
import numpy as np
from torchvision import models

class ManipulationRobot:
    def __init__(self):
        self.detector = models.detection.fasterrcnn_mobilenet_v3_large_320_fpn(
            pretrained=True
        )
        self.camera = cv2.VideoCapture(0)

    def detect_objects(self, frame):
        """Detect objects in image"""
        # Preprocess
        image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        image_tensor = torch.from_numpy(image).float() / 255.0
        image_tensor = image_tensor.permute(2, 0, 1).unsqueeze(0)

        # Detect
        with torch.no_grad():
            predictions = self.detector(image_tensor)

        detections = predictions[0]
        boxes = detections['boxes'].numpy()
        scores = detections['scores'].numpy()
        labels = detections['labels'].numpy()

        return boxes, scores, labels

    def find_object_position(self, boxes, scores, labels, target_class):
        """Find position of target object"""
        # Filter by target class and confidence
        valid = (labels == target_class) & (scores > 0.7)
        valid_boxes = boxes[valid]

        if len(valid_boxes) == 0:
            return None

        # Use highest confidence detection
        best_box = valid_boxes[0]
        x1, y1, x2, y2 = best_box
        center_x = (x1 + x2) / 2
        center_y = (y1 + y2) / 2

        return (center_x, center_y)

    def approach_and_grasp(self, obj_pos):
        """Move robot arm to object and close gripper"""
        x, y = obj_pos

        # Calculate arm inverse kinematics (simplified)
        joint_angles = self.inverse_kinematics(x, y)

        # Move arm to position
        self.move_arm_to(joint_angles)

        # Close gripper
        self.gripper_close()

        # Lift object
        self.move_arm_up(distance=10)

        # Return to home
        self.move_arm_to_home()

    def run(self):
        """Main perception-action loop"""
        TARGET_CLASS = 47  # "Apple" in COCO dataset

        while True:
            ret, frame = self.camera.read()
            if not ret:
                break

            # Detect objects
            boxes, scores, labels = self.detect_objects(frame)

            # Find target
            obj_pos = self.find_object_position(boxes, scores, labels, TARGET_CLASS)

            if obj_pos:
                print(f"Found object at {obj_pos}")
                self.approach_and_grasp(obj_pos)
            else:
                print("No object detected")

            # Display (optional)
            for box in boxes:
                cv2.rectangle(frame, (int(box[0]), int(box[1])),
                            (int(box[2]), int(box[3])), (0, 255, 0), 2)
            cv2.imshow('Detection', frame)

            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

        self.camera.release()
        cv2.destroyAllWindows()
```

## Arduino Code: Gripper Control

```cpp
/*
Control servo-based gripper
*/

#include <Servo.h>

Servo gripper_servo;
const int GRIPPER_PIN = 10;
const int OPEN_ANGLE = 0;
const int CLOSED_ANGLE = 90;

void setup() {
  gripper_servo.attach(GRIPPER_PIN);
  gripper_open();
}

void gripper_open() {
  gripper_servo.write(OPEN_ANGLE);
  delay(500);
}

void gripper_close() {
  gripper_servo.write(CLOSED_ANGLE);
  delay(500);
}

void gripper_set_angle(int angle) {
  gripper_servo.write(angle);
}

void loop() {
  // Control gripper based on commands from Python
  gripper_close();
  delay(1000);
  gripper_open();
  delay(1000);
}
```

## Hands-On Exercise: Grasp and Place

**Scenario:**
- Objects of different shapes on table
- Robot must pick and place in bin

**Steps:**
1. **Detect**: Find object using camera
2. **Localize**: Calculate 3D position
3. **Approach**: Move arm close to object
4. **Grasp**: Close gripper
5. **Lift**: Raise object
6. **Place**: Move to bin and open gripper

**Success criteria:**
- Successfully grasp 5 different objects
- &lt;5% failure rate
- Smooth motion without jerking

## Troubleshooting

### Vision system detects phantom objects
- **Cause**: Low confidence threshold
- **Fix**: Increase confidence_threshold to 0.8

### Gripper too weak to hold objects
- **Solution**: Increase servo force or use pneumatic gripper

### Arm motion inaccurate
- **Cause**: Inverse kinematics calibration needed
- **Fix**: Re-calibrate joint angles

## Next Steps

You've built complete manipulation systems! Lesson 5.3 is the **Capstone Project** - design and build your own Physical AI system.

---

Next: Lesson 5.3 - Your Own Physical AI Project!
