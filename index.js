const WebSocket = require("ws");
const http = require("http");

// Create HTTP server
const server = http.createServer();

// Create WebSocket server
const wss = new WebSocket.Server({ server });

// Sample sensor data
function generateSensorData() {
  return {
    ip_address: "192.168.10.1",
    ssid: "new_ssid",
    password: "new_password",
    water_temp: 39.0375,
    water_temp_min: 28.625,
    water_temp_max: 40.0,
    water_temp_chart: [
      { value: 28.625 },
      { value: 28.625 },
      { value: 28.6875 },
      { value: 28.6875 },
      { value: 28.6875 },
      { value: 28.6875 },
      { value: 28.625 },
      { value: 28.6875 },
      { value: 28.625 },
      { value: 28.625 },
    ],
    water_ec: 1300.393999,
    water_ec_min: 600.465942,
    water_ec_max: 2000.0,
    water_ec_chart: [
      { value: 1302.151978 },
      { value: 1303.437012 },
      { value: 1303.545044 },
      { value: 1302.16394 },
      { value: 1302.047974 },
      { value: 1302.037964 },
      { value: 1297.465942 },
      { value: 1303.043945 },
      { value: 1100.550049 },
      { value: 800.473999 },
    ],
  };
}

// WebSocket connection handler
wss.on("connection", (ws) => {
  console.log("Client connected");

  // Send data immediately when client connects
  ws.send(JSON.stringify(generateSensorData()));

  // Optional: Send data periodically
  const interval = setInterval(() => {
    ws.send(JSON.stringify(generateSensorData()));
  }, 5000); // Send every 5 seconds

  // Handle client disconnection
  ws.on("close", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

// Start server
const PORT = 8080;
server.listen(PORT, () => {
  console.log(`WebSocket server running on ws://localhost:${PORT}`);
});
