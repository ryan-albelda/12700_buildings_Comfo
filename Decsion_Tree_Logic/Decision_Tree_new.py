from datetime import datetime
######################## ENERGY CONSUMPTION ########################

#kW literature assumptions
appliance_power = {
    "AC": 1.2,
    "fan": 0.06,
    "heater": 1.5,
    "space_heater": 0.75,
    "dehumidifier": 0.3,
    "window": 0.0
}

######################## CARBON EMISSION ########################
# could be fetched with an API - https://www.climatiq.io/data/emission-factor/977e17d2-ec44-4d25-a4f2-c521d688e7e4
emissions = {
    "pittsburgh": 0.33  # kg CO2 per kWh (eGRID2023)
}

######################## UTILS ########################
def get_emission_factor(city):
    # this function would ideally fetch the emission factor based on the city / ZIP code
    # for now, we will use a hardcoded value for Pittsburgh
    return emissions.get(city.lower(), 0.33)  # default to Pittsburgh if not found


def estimate_savings(replacement_action, baseline_action, duration_hours, city):
    if replacement_action not in appliance_power or baseline_action not in appliance_power:
        return None, None
    baseline_energy = appliance_power[baseline_action] * duration_hours
    replacement_energy = appliance_power[replacement_action] * duration_hours
    energy_saved = baseline_energy - replacement_energy
    carbon_saved = energy_saved * get_emission_factor(city)
    return round(energy_saved, 2), round(carbon_saved, 2)

def get_tau_category(tau_minutes):
    if tau_minutes < 780:
        return "fast"
    elif 780 <= tau_minutes < 2820:
        return "medium"
    else:
        return "slow"

def get_season():
    today = datetime.today()
    summer_start = datetime(today.year, 4, 1)
    summer_end = datetime(today.year, 10, 31)
    return "summer" if summer_start <= today <= summer_end else "winter"

######################## DECISION TREE ########################
suggestions = {
        ("summer", "hot", "fast"): {
            "Energy saving": [
                "Open windows for cross-ventilation if the outdoor temp is lower.",
                "Use ceiling or box fans instead of AC.",
                "Close blinds to reduce solar heat gain."
            ],
            "Comfort": [
                "Lower the thermostat by 1-2°C for a quick fix.",
                "Turn on a fan to circulate air more effectively.",
                "Place a bowl of ice in front of a fan for evaporative cooling."
            ]
        },
        ("summer", "hot", "medium"): {
            "Energy saving": [
                "Open windows only if the external temperature is lower than inside.",
                "Use a dehumidifier instead of AC.",
                "Close blinds or curtains in sun-exposed areas."
            ],
            "Comfort": [
                "Adjust thermostat by 1-2°C but expect it to take 30-45 minutes.",
                "Use oscillating fans to circulate air.",
                "Stay hydrated and apply cold compresses."
            ]
        },
        ("summer", "hot", "slow"): {
            "Energy saving": [
                "Pre-cool the room early in the morning or late evening.",
                "Use blackout curtains or shades.",
                "Use fans to help distribute cooler air."
            ],
            "Comfort": [
                "Lower the thermostat knowing it will take 1-2 hours to take effect.",
                "Use portable fans and cooling devices.",
                "Stay hydrated and avoid heat-generating activities."
            ]
        },
        ("summer", "cold", "fast"): {
            "Energy saving": [
                "Ensure AC isn’t overcooling the space.",
                "Use fans to circulate air without lowering the thermostat further."
            ],
            "Comfort": [
                "Adjust thermostat up by 1-2°C.",
                "Close windows if cool air is leaking in."
            ]
        },
        ("summer", "cold", "medium"): {
            "Energy saving": [
                "Reduce cooling system use and rely on fans.",
                "Set thermostat to a slightly higher temperature."
            ],
            "Comfort": [
                "Turn the thermostat up gradually and check after 30-45 minutes.",
                "Avoid cooling too aggressively."
            ]
        },
        ("summer", "cold", "slow"): {
            "Energy saving": [
                "Keep cooling moderate to prevent excessive use.",
                "Use fans for local cooling."
            ],
            "Comfort": [
                "Be patient; avoid expecting rapid cooling.",
                "Close off unneeded spaces to retain cool air."
            ]
        },
        ("winter", "hot", "fast"): {
            "Energy saving": [
                "Turn down the thermostat and allow natural cooling.",
                "Open windows for quick ventilation."
            ],
            "Comfort": [
                "Reduce thermostat setting by 1-2°C.",
                "Check if heating appliances are adding unnecessary heat.",
                "Increase ventilation to balance the temperature."
            ]
        },
        ("winter", "hot", "medium"): {
            "Energy saving": [
                "Lower the thermostat gradually by 1°C.",
                "Ventilate briefly by opening windows."
            ],
            "Comfort": [
                "Adjust the thermostat by 1-2°C.",
                "Keep interior doors closed.",
                "Check for unnecessary heat gains."
            ]
        },
        ("winter", "hot", "slow"): {
            "Energy saving": [
                "Avoid large temperature swings.",
                "Maintain a consistent lower setpoint.",
                "Slighly open a window."
            ],
            "Comfort": [
                "Remove extra layers or blankets.",
                "Allow for drafts and remove thick curtains or blinds."
            ]
        },
        ("winter", "cold", "fast"): {
            "Energy saving": [
                "Use natural sunlight by opening blinds.",
                "Close off unused rooms to retain warmth."
            ],
            "Comfort": [
                "Adjust thermostat by 1-2°C for immediate heating.",
                "Layer up with warm clothes and blankets."
            ]
        },
        ("winter", "cold", "medium"): {
            "Energy saving": [
                "Set thermostat reasonably and allow time to heat.",
                "Close blinds and curtains at night."
            ],
            "Comfort": [
                "Use heated blankets or space heaters while warming.",
                "Wear warm clothing."
            ]
        },
        ("winter", "cold", "slow"): {
            "Energy saving": [
                "Use thermal curtains and insulate windows.",
                "Keep interior doors closed."
            ],
            "Comfort": [
                "Use warm clothing or heated blankets.",
                "Use space heaters strategically."
            ]
        },
    }

######################## MAIN ########################
# def comfo():
#     print("Welcome to Comfo!")
#     city = input("Enter your city (e.g. Pittsburgh): ").strip().lower()
#     discomfort = input("Too hot or too cold? (hot/cold): ").strip().lower()
#     tau = int(input("Enter your tau value in minutes (e.g., 450): "))
#     duration_hours = 2
#     season = get_season()
#     tau_category = get_tau_category(tau)
#     key = (season, discomfort, tau_category)

#     print(f"\nSeason: {season}, Discomfort: {discomfort}, Tau: {tau_category}\n")

#     if key in suggestions:
#         for category, tips in suggestions[key].items():
#             print(f"{category} Tips:")
#             for replacement, baseline, description in tips:
#                 energy, carbon = estimate_savings(replacement, baseline, duration_hours, city)
#                 if energy is not None and carbon is not None:
#                     print(f" - {description} (Save {energy} kWh, {carbon} kg CO₂)")
#                 else:
#                     print(f" - {description} (Low carbon action)")
#             print()
#     else:
#         print("Sorry, no suggestions available for that combination.")

# if __name__ == "__main__":
#     comfo()

# # # Test case: using a fan instead of AC for 2 hours
# # result = estimate_savings("fan", "AC", 2, 'pittsburgh')
# # print(f"Energy Saved: {result[0]} kWh")
# # print(f"Carbon Saved: {result[1]} kg CO2")
