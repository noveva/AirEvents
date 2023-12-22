# Airy app

This repository contains app code for the airy project. Project consists of:

- [Arduino IoT with environmental sensors](https://github.com/oddnoodles/airy-iot). It collects air quality, temperature, humidity and other enviromental data and sends it to an MQTT broker. 
- [Backend](https://github.com/oddnoddles/airy-backend). It records air quality measurements and provides a REST API to manage events.
- App (this repository). It manages events that impact air quality, users can:
  - start and stop events based on the location
  - view all recorded events day by day

Main aim of the app is record all events that we _think_ have impact on air quality and then cross reference that with the data gathered by Arduino IOT sensors.

# How to run

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Run the app

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

# What's next

Good start, but the airy project is far from over.

TODO for now looks as follows:

0. Process user feedback, add tests and environment configs to prepare first release
1. Push notifications for when air quality thresholds are crossed
2. New screen with environmental data the project collects from Arduino IOT sensors
2. Bottom navigation bar with an item for each screen
3. Map out all events on top of air quality readings.
   This _should_ give an idea of how these two data sets relate :crystal_ball:

