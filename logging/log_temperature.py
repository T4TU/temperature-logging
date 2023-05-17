import sys
import time
import Adafruit_DHT

SENSOR = Adafruit_DHT.DHT22
PIN = 4
LOG_PATH = sys.argv[1] if len(sys.argv) >= 2 else "."
LOG_INTERVAL_SECONDS = 60.0

while True:
	humidity, temperature = Adafruit_DHT.read_retry(SENSOR, PIN)
	if humidity is not None and temperature is not None:
		current_time = time.localtime()
		date = time.strftime("%d-%m-%Y", current_time)
		timestamp = time.strftime("%H:%M:%S", current_time)
		file = open(LOG_PATH + "/" + date + ".csv", "a")
		log_entry = "{0} {1:.1f} {2:.1f}\n".format(timestamp, temperature, humidity)
		file.write(log_entry)
		file.close()
		print("Logged:", log_entry, end="")
	time.sleep(LOG_INTERVAL_SECONDS - (time.time() % LOG_INTERVAL_SECONDS))
