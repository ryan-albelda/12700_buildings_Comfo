import React from 'react';
import ReactDOM from 'react-dom/client';


const styles = {
    container: { display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' },
    body: {
        backgroundColor: '#0d1117',
        fontFamily: 'Arial, sans-serif',
        padding: '2rem',
        maxWidth: '700px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
    },
    question: {
        marginBottom: '1.5rem',
    },
    response: {
        marginBottom: '1.5rem',
    },
    h1: {
        fontSize: '1.5rem',
        color: '#ffffff',
        textAlign: 'center',
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
        padding: '0.5rem',
    },
    logoCircle: {
        backgroundColor: '#00ff00',
        borderRadius: '50%',
        width: '3rem',
        height: '3rem'
        textAlign: 'left',
        marginBottom: '1.5rem',
    },
    header: {
        marginBottom: '1rem',
    },
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        gap: '1rem',
    },
    input: {
        padding: '0.5rem',
        width: '100%',
        fontSize: '1rem',
    },
    select: {
    logoText: {
        color: '#ffffff',
        fontWeight: 'bold',
        padding: '0.5rem',
        fontSize: '1rem',
    },
    button: {
        padding: '0.5rem',
        fontSize: '1rem',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    },   
    form: {
        width: '100%',
        marginBottom: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    },
        color: '#ffffff',
        marginBottom: '1.5rem'
    },
    li: {
        marginBottom: '0.5rem'
    },
    assumptions: {
        color: '#ffffff',
        width: '100%',
        fontSize: 'smaller',
    },
    ulAssumptions: {
        listStyle: 'none',
        padding: 0
    },
    sliderContainer:{
        marginTop: '0.5rem',
        width: '100%'
    },
    slider:{
        appearance: 'none',
        width: '100%',
        height: '10px',
        background: 'linear-gradient(to right, #007bff 0%, #007bff 50%, #ccc 50%, #ccc 100%)',
        borderRadius: '5px',
        outline: 'none',
        cursor: 'pointer',
    },
    sliderThumb:{
        appearance: 'none',
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        background: '#fff',
        cursor: 'pointer',
        border: 'none',
    },
    sliderLabel:{
        padding: '0.2rem',
    },
    sliderSpan:{
        padding: '0.2rem',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      color: '#ffffff',
    },
    th: {
        border: '1px solid #ffffff',
        padding: '8px',
        textAlign: 'left',
    },
    td: {
        border: '1px solid #ffffff',
        padding: '8px',
        textAlign: 'left',
    },
    center: { textAlign: 'center' },
};

const comfortLevels = [
    "Cold",
    "Cool",
    "Slightly Cool",
    "Neutral",
    "Slightly Warm",
    "Warm",
    "Hot"
];

// Power consumption in kW for different appliances (from Python code)
const appliancePower = {
    "AC": 2.0,
    "window_AC": 1.0,
    "fan": 0.06,
    "heater": 1.0,
    "space_heater": 1.5,
    "dehumidifier": 0.3,
    "window": 0.0,
    "none": 0.0
};

// Carbon emissions in kg CO2 per kWh for different cities - from EPA.gov
const emissions = {
    "anchorage": 0.408,        // AKGD
    "fairbanks": 0.236,        // AKMS
    "phoenix": 0.336,          // AZNM
    "los angeles": 0.198,      // CAMX
    "dallas": 0.335,           // ERCT
    "miami": 0.364,            // FRCC
    "kahului": 0.509,          // HIMS (Maui)
    "honolulu": 0.676,         // HIOA (Oahu)
    "minneapolis": 0.636,      // MROE
    "sioux falls": 0.417,      // MROW
    "boston": 0.084,           // NEWE
    "seattle": 0.259,          // NWPP
    "new york": 0.202,         // NYCW
    "syracuse": 0.066,         // NYUP
    "philadelphia": 0.309,     // RFCE
    "detroit": 0.530,          // RFCM
    "pittsburgh": 0.331,       // RFCW
    "denver": 0.623,           // RMPA
    "kansas city": 0.492,      // SPNO
    "lubbock": 0.498,          // SPSO
    "memphis": 0.436,          // SRMV
    "st louis": 0.479,         // SRMW
    "birmingham": 0.368,       // SRSO
    "knoxville": 0.421,        // SRTV
    "charlotte": 0.346,        // SRVC
    "default": 0.33            // National fallback
};

const suggestions = {
    "summer-hot-fast": {
        "Energy saving": [
            { action: "fan", baseline: "AC", description: "Use ceiling or box fans instead of AC. It will take TBD time to reach thermal comfort." },
            { action: "window", baseline: "AC", description: "Open windows for cross-ventilation. It will take TBD time to reach thermal comfort." }
        ],
        "Comfort": [
            { action: "AC", baseline: "fan", description: "Lower the thermostat by 1–2°C. It will take TBD time to reach thermal comfort." },
            { action: "fan", baseline: "none", description: "Place a bowl of ice in front of a fan. It will take TBD time to reach thermal comfort." }
        ]
    },
    "summer-hot-medium": {
        "Energy saving": [
            { action: "fan", baseline: "AC", description: "Run the fan for 20 minutes to see if it improves comfort, if not, turn on AC." },
            { action: "window", baseline: "AC", description: "Open windows for cross-ventilation for 20 minutes to see if it improves comfort, if not, turn on AC." }
        ],
        "Comfort": [
            { action: "AC", baseline: "fan", description: "Lower the thermostat by 1–2°C. It will take some time to reach thermal comfort." },
            { action: "fan", baseline: "none", description: "Place a bowl of ice in front of a fan. It will take some time to reach thermal comfort." }
        ]
    },
    "summer-hot-slow": {
        "Energy saving": [
            { action: "dehumidifier", baseline: "AC", description: "Use a dehumidifier instead of AC. It will take a few hours to reach thermal comfort." },
            { action: "window", baseline: "AC", description: "Open windows for cross-ventilation. It will take a few hours to reach thermal comfort." }
        ],
        "Comfort": [
            { action: "AC", baseline: "fan", description: "Lower the thermostat by 1–2°C. It will take a few hours to reach thermal comfort." },
            { action: "fan", baseline: "none", description: "Place a bowl of ice in front of a fan. It will take a few hours to reach thermal comfort." }
        ]
    },
    "summer-cold-fast": {
        "Energy saving": [
            { action: "none", baseline: "heater", description: "Turn off the heater. Thermal comfort will be reached quickly" },
            { action: "window", baseline: "heater", description: "Open a window to cool down the room. Thermal comfort will be reached quickly." }
        ],
        "Comfort": [
            { action: "heater", baseline: "none", description: "Turn on the heater. Thermal comfort will be reached quickly." },
            { action: "space_heater", baseline: "none", description: "Turn on a space heater. Thermal comfort will be reached quickly." }
        ]
    },
    "winter-hot-fast": {
        "Energy saving": [
            { action: "window", baseline: "heater", description: "Open a window to cool down the room. Thermal comfort will be reached quickly." },
            { action: "fan", baseline: "heater", description: "Use a fan to cool down the room. Thermal comfort will be reached quickly." }
        ],
        "Comfort": [
            { action: "heater", baseline: "none", description: "Turn on the heater. Thermal comfort will be reached quickly." },
            { action: "window", baseline: "none", description: "Open a window to cool down the room. Thermal comfort will be reached quickly." }
        ]
    },
    "winter-cold-fast": {
        "Energy saving": [
            { action: "none", baseline: "space_heater", description: "Turn off the space heater. Thermal comfort will be reached quickly" }
        ],
        "Comfort": [
            { action: "heater", baseline: "none", description: "Turn on the heater. Thermal comfort will be reached quickly." },
            { action: "space_heater", baseline: "none", description: "Turn on a space heater. Thermal comfort will be reached quickly." }
        ]
    }
};

function Header() {
    return (
        <header style={styles.header}>
            <div style={styles.logoContainer}>
                <div style={{
                    ...styles.logoCircle,
                    padding: '0.5rem'
                }}>
                    <span style={styles.logoText}>comfo</span>
                </div>
            </div>
            <h1 style={styles.h1}>Welcome to Comfo!</h1>
            <p>Comfo helps you improve your thermal comfort while minimizing carbon emissions.</p>
        </header>
);
}

function ComfortSlider({ comfortIndex, setComfortIndex }) {
  const updateComfortLabel = (value) => {
      return comfortLevels[value];
  };

    return (
        <div style={styles.sliderContainer}>

            <div >


            <p style={styles.sliderLabel}>How would you rank your current thermal comfort? Move the slider. Increase for feeling warmer and decrease for feeling cooler.</p>
      <label style={styles.sliderLabel}>
        Comfort Level:            
            <input
            style={{
                ...styles.slider,
                '--val': `${(comfortIndex / 6) * 100}%`,
                backgroundImage: `linear-gradient(to right, #007bff var(--val), #ccc var(--val))`
            }}
            type="range"
            id="comfortSlider"
            min="0"
            max="6"
            value={comfortIndex}
            step="1"
            onChange={(e) => {setComfortIndex(parseInt(e.target.value))}}/>
        <span style={styles.sliderSpan}>{updateComfortLabel(comfortIndex)}</span>
            </label>      
      </div>
    </div>
  );
}

function UserInputForm({ city, setCity, tau, setTau, comfortIndex, setComfortIndex, runComfo }) {
  return (
      <form style={styles.form}>
          <label>City:
              <input
                  style={styles.input}
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
              />
          </label>
          <br/><br/>
          <label>
              Tau value in minutes:
              <input
                  style={styles.input}
                  id="tau"
                  type="number"
                  value={tau}
                                                onChange={(e) => setTau(e.target.value)}/></label><br/><br/>

            <ComfortSlider comfortIndex={comfortIndex} setComfortIndex={setComfortIndex}/>
            <br/><br/>
            <button style={styles.button} onClick={runComfo}>Get Suggestions</button>
        </form>

  );
}

function SuggestionList({ results }) {  
    const suggestionItems = results.split('<br><br>').flatMap((item, index) => {
        if (item.startsWith('<strong>')) {
            const strongContent = item.replace(/<\/?strong>/g, '');
            const [key, value] = strongContent.split(': ');
            return <li key={`strong-${index}`}><strong>{key}:</strong> {value}</li>;
        } else if (item.startsWith('<h3>')) {
            const h3Content = item.replace(/<\/?h3>/g, '');
            return <li key={`h3-${index}`}><h3>{h3Content}</h3></li>;
        } else if (item.startsWith('<ul>') || item.startsWith('</ul>')) {
            return [];
        } else if (item.startsWith('<li>')) {
            const liContent = item.replace(/<\/?li>/g, '');
            const emMatch = liContent.match(/<em>(.*?)<\/em>/);
            const suggestion = emMatch ? liContent.replace(emMatch[0],'') : liContent;
            const saving = emMatch ? emMatch[1] : "";
            return <li key={`li-${index}`}>{suggestion} <em>{saving}</em></li>;
        } else if (item.startsWith('<p>')) {
            const pContent = item.replace(/<\/?p>/g, '');
            return <li key={`p-${index}`}><p>{pContent}</p></li>;
        } else {
            return <li key={index}>{item}</li>;
        }
    });

  return (
    <div className="responses" id="result" >
        <ul style={styles.suggestionsUl}>
          {results.split('<br><br>').map((item, index) => {
              return renderSuggestionItem(item,index)
            })}
        </ul>      
</div>
  );
}




function App() {
  const [city, setCity] = React.useState('');
  const [tau, setTau] = React.useState(0);
  const [comfortIndex, setComfortIndex] = React.useState(3);
  const [results, setResults] = React.useState('');

  const getDiscomfortFromSlider = (comfortIndex) => {
    if (comfortIndex < 3) {
      return "cold"; // Below neutral is cold
    } else if (comfortIndex > 3) {
      return "hot"; // Above neutral is hot
    } else {
      return "neutral"; // 3 is neutral
    }
  };

  const calculateSavings = (action, baseline, city) => {
    const hoursOfUse = 2; // Assume 2 hours of use
    const actionPower = appliancePower[action] || 0;
    const baselinePower = appliancePower[baseline] || 0;

    // Calculate energy difference in kWh
    const energyDifference = (baselinePower - actionPower) * hoursOfUse;

    // Get appropriate emission factor for city
    const emissionFactor = emissions[city] || emissions["default"];

    // Calculate carbon savings
    const carbonSavings = energyDifference * emissionFactor;

    return {
      energy: energyDifference,
      carbon: carbonSavings
    };
  };

  const autoDetectSeason = () => {
    const today = new Date();
    const year = today.getFullYear();
    const summerStart = new Date(`${year}-04-01`);
    const summerEnd = new Date(`${year}-10-31`);
    return (today >= summerStart && today <= summerEnd) ? "summer" : "winter";
  };

  const getTauCategory = (tau) => {
    tau = parseInt(tau) || 0;
    if (tau < 780) return "fast";
    if (tau < 2820) return "medium";
    return "slow";
  };

  const generateSuggestions = (season, discomfort, tauCat, city) => {
    const key = `${season}-${discomfort}-${tauCat}`;
    let output = `<strong>Season:</strong> ${season}, <strong>Discomfort:</strong> ${discomfort}, <strong>Tau Category:</strong> ${tauCat}<br><br>`;

    const costPerKWh = 0.17; // Electricity cost per kWh - from eia.gov

    if (suggestions[key]) {
        for (const [category, tips] of Object.entries(suggestions[key])) {
        output += `<h3>${category} Tips:</h3><ul>`;
        tips.forEach(tip => {
            // Calculate real-time savings based on the provided appliance data
            const saving = calculateSavings(tip.action, tip.baseline, city);

            if (saving.energy !== 0) {
                const energySaved = saving.energy.toFixed(2);
                const carbonSaved = saving.carbon.toFixed(2);
                const costSaved = (saving.energy * costPerKWh).toFixed(2);

                let savingText;
                if (saving.energy > 0) {
                    savingText = `Save $${costSaved}, ${carbonSaved} kg CO₂`;
                } else {
                    savingText = `Costs $${Math.abs(costSaved).toFixed(2)}, adds ${Math.abs(carbonSaved).toFixed(2)} kg CO₂`;
            }

            output += `<li>${tip.description} <em>(${savingText})</em></li>`;
            } else {
                output += `<li>${tip.description} (Low carbon action)</li>`;
          }
        });
        output += `</ul>`;
      }
    } else {
      output += `<p>No suggestions found for this combination (${key}).</p>`;
    }
    setResults(output);
  };

  const runComfo = () => {
    const discomfort = getDiscomfortFromSlider(comfortIndex);
    const comfortText = comfortLevels[comfortIndex];
    const season = autoDetectSeason();
    const tauCat = getTauCategory(tau);
    generateSuggestions(season, discomfort, tauCat, city);

    const generatedResults = `
            <p><strong>City:</strong> ${city || "Not provided"}</p>
            <p><strong>Tau value:</strong> ${tau || "Not provided"} minutes</p>
            <p><strong>Comfort Level:</strong> ${comfortText}</p>
            <p><strong>Discomfort Type:</strong> ${discomfort}</p>
        `;

    setResults(prevResults => generatedResults + prevResults);
  };

  return (
    <div style={{...styles.body, ...styles.container}}>
        <Header/>
        <UserInputForm
            city={city}
            setCity={setCity}
            tau={tau}
            setTau={setTau}
            comfortIndex={comfortIndex}
            setComfortIndex={setComfortIndex}
            runComfo={runComfo}
        />
        <SuggestionList results={results}/>
        <section style={styles.assumptions}>
            <h3 style={styles.h3}>Assumptions</h3>
            <ul style={styles.ulAssumptions}>
                <li style={styles.assumptions}>
                    Thermal comfort factors:
                    <ul>
                        <li>Assuming all users are seated in the room and metabolic rate corresponds to seated
                            adults.
                        </li>
                        <li>
                            Clothing assumptions:
                            <ul>
                                <li>Summer: t-shirt and shorts</li>
                                <li>Winter: long pants and long sleeve shirt</li>
                            </ul>
                        </li>
                        <li>Humidity: assuming 45% as ASHRAE recommends a range between 30% to 60%.</li>
                        <li>Air flow is assumed to be static.</li>
                    </ul>
                </li>
            </ul>
            <table style={styles.table}>
                <thead>
                    <tr><th style={styles.th}>Appliance</th><th style={styles.th}>kW</th></tr>
                </thead>
                <tbody>
                    <tr><td style={styles.td}>AC (Central)</td><td style={styles.td}>2.0</td></tr>
                    <tr><td style={styles.td}>Window AC</td><td style={styles.td}>1.0</td></tr>
                    <tr><td style={styles.td}>Fan</td><td style={styles.td}>0.06</td></tr>
                    <tr><td style={styles.td}>Heater</td><td style={styles.td}>1.0</td></tr>
                    <tr><td style={styles.td}>Space Heater</td><td style={styles.td}>1.5</td></tr>
                    <tr><td style={styles.td}>Dehumidifier</td><td style={styles.td}>0.3</td></tr>
                    <tr><td style={styles.td}>Window (Passive)</td><td style={styles.td}>0.0</td></tr>
                    <tr><td style={styles.td}>None (Behavioral Action)</td><td style={styles.td}>0.0</td></tr>
                </tbody>
            </table>
            <p style={styles.assumptions}>The kg of CO2 per kWh in Pittsburgh is assumed to be 0.331. Cost per kWh is $0.17</p>
        </section>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
