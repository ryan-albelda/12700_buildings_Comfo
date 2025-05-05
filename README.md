# 12700_buildings
Repository for 12700 CEE class 

Semester Project for Autonomous Sustainable Buildings: From Theory to Practice
Carnegie Mellon University
Course 12700, Spring 2025 
Isabella Williams, Meltem Sahin Ozkoc, and Ryan Albelda 


# Thermal Comfort Simulation Project

This project simulates and analyzes thermal comfort in indoor environments, focusing on how quickly occupants reach comfort after taking actions. It integrates hardware sensing, decision-making algorithms, and visualization to create a comprehensive thermal comfort analysis system.

## Project Overview

The system measures room temperature, predicts thermal comfort using the PMV (Predicted Mean Vote) model, simulates comfort adaptation over time, and provides decision support for optimal thermal comfort actions.

## Components

### 1. Decision Tree Logic and Choices

Python-based decision tree algorithm that evaluates environmental conditions and suggests optimal actions for improving thermal comfort.

Key features:
- Evaluation of current thermal conditions
- Decision-making based on PMV values
- Action recommendations for optimal comfort

### 2. Comfo Interface

HTML-based user interface for the Comfo thermal comfort system.

Key features:
- Dashboard for current conditions
- Visualization of thermal comfort metrics
- User inputs for preferences and actions

### 3. Sense HAT Temperature Sensing

Code to interface with the Raspberry Pi Sense HAT to collect real-time temperature data.

Key features:
- Continuous temperature monitoring
- Data logging and preprocessing
- Integration with the main system

### 4. Data Visualization and Tau Analysis

Analysis tools for plotting temperature and comfort data, with specific focus on calculating tau values (time constants) for thermal comfort adaptation.

Key features:
- Time-series visualization of temperature and PMV
- Tau value calculation for comfort adaptation speeds
- Performance metrics and analysis tools

### 5. Thermal Comfort Simulation Algorithm

Python-based simulation algorithm that models how long it takes for a person to feel thermally comfortable after taking an action.

Key features:
- PMV-based comfort prediction
- Time-dependent comfort simulation
- Action impact analysis
- Integration of physical and psychological factors


## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- ASHRAE for thermal comfort standards
- Raspberry Pi Foundation for the Sense HAT
- Contributors and researchers in the field of thermal comfort
