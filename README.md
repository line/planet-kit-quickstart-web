# PlanetKit quick start for Web

This repository provides a quick start project implemented with PlanetKit for Web.

> This quick start project is based on WebPlanetKit 5.2.x.

## About PlanetKit SDK

PlanetKit is a client SDK for LINE Planet, which is a cloud-based real-time communications platform as a service (CPaaS) that helps you build a voice and video call environment. With LINE Planet, you can integrate call features into your service at minimum cost.

### PlanetKit system requirements

The system requirements of PlanetKit for Web are as follows.

#### Requirements

- Node
- npm or yarn
- Supported browser
  - Chromium 72+ based browser
  - Safari 14.5+ (beta)

#### Required runtime permissions

- Browser's device permission

### How to install the SDK

- [Installation](https://github.com/line/planet-kit-web?tab=readme-ov-file#installation)

### References

- [PlanetKit system requirements](https://docs.lineplanet.me/overview/specification/planetkit-system-requirements#web)
- [API Reference](https://docs.lineplanet.me/api-reference/client/web/5.2/index.html)

### Release information

- [API changelog](https://docs.lineplanet.me/web/reference/api-changelog)
- [Release notes](https://docs.lineplanet.me/web/reference/release-notes)

## Using the quick start project

This quick start project provides basic functionality of a **group audio call**.

### Prerequisites

#### Visual Studio Code or any other IDE you prefer

- This guide uses [Visual Studio Code](https://code.visualstudio.com/Download) (VS Code).

#### Node and npm

- You only need to install [Node.js](https://nodejs.org/en/download), as it includes npm.

#### Python 3.8 or higher

- To generate an access token, you need [a supported version of Python 3.x](https://www.python.org/downloads/), currently 3.8 or higher.

#### Mapping localhost to a quick start domain

> In the actual implementation of your app, you have to ask us to register the domain you will serve.

- To avoid [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) issues, you should use our domain registered for quick start.
- This involves modifying the `hosts` file on your system. Follow the instructions below based on your operating system:

- For Windows users

  1. Open Notepad as an Administrator. You can do this by searching for Notepad in the Start menu, right-clicking on it, and selecting "Run as administrator".
  2. In Notepad, open the `hosts` file located at `C:\Windows\System32\drivers\etc\hosts`.
  3. Scroll to the bottom of the file and add the following line:

     ```
     127.0.0.1       planet-kit-quick-start.linecorp.com
     ```

  4. Save the file and close Notepad.

- For macOS users

  1. Open Terminal.
  2. Type the following command to open the `hosts` file in the nano editor (you can use any other text editor if you prefer):

     ```console
     $ sudo nano /etc/hosts
     ```

  3. You might be prompted to enter your password. Type it in, and then press Enter.
  4. Scroll to the bottom of the file and add the following line:

     ```
     127.0.0.1       planet-kit-quick-start.linecorp.com
     ```

  5. Press `Ctrl + O` to save the file, then `Enter` to confirm, and `Ctrl + X` to exit nano.

After completing these steps, you will have successfully mapped the quick start domain (`planet-kit-quick-start.linecorp.com`) to your localhost (`127.0.0.1`).

<img src="/images/hosts_file.png" width="400"/>

### 1. Download source code

Clone this repository, or download this repository and unzip the files.

### 2. Open the project

In VS Code, open the directory of the repository you downloaded.

<img src="/images/vsc_open_folder.png" width="700"/>

<img src="/images/quicstart_folder.png" width="400"/>

### 3. Generate an access token

> In this quick start project, we provide a script that generates an access token for your convenience. However, during the actual implementation of your app, the access token must be created in the AppServer. For more information, refer to [Access token](https://docs.lineplanet.me/getting-started/essentials/access-token).

Generate an [access token](https://docs.lineplanet.me/getting-started/essentials/access-token) using `generate_access_token.py`.

- The script requires a valid user ID as an argument. For the naming restrictions of a user ID, see [User ID](https://docs.lineplanet.me/overview/glossary#user-id).
- Python package requirement for `generate_access_token.py` can be found in `requirements.txt`.
  - You can use the command `pip3 install -r requirements.txt` to install required packages.

> We recommend using a virtual environment for this step. For more information, see [how to use venv](https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/).

```console
$ python3 generate_access_token.py <YOUR_USER_ID>
access token:  <GENERATED_ACCESS_TOKEN>
```

### 4. Apply the user ID and the access token

Copy and paste the user ID and access token into your code.

```javascript
// GroupAudioCall/src/Constant.js
export const USER_ID = "<YOUR_USER_ID>";
export const ACCESS_TOKEN = "<GENERATED_ACCESS_TOKEN>";
```

### 5. Run the project

To run the quick start project, ensure you are in the `planet-kit-quickstart-web` directory. Follow these steps:

1. **Open a terminal**: Open a terminal app and navigate to the project directory.

   ```console
   $ cd /PATH/TO/planet-kit-quickstart-web
   ```

   Alternatively, you can use the VS Code terminal.

   <img src="/images/vsc_open_terminal.png" width="400"/>

   <img src="/images/vsc_terminal.png" width="700"/>

2. **Install dependencies**: Before running the application, you must install the necessary dependencies. On the terminal, execute the following command:

   ```console
   $ npm install
   ```

   This command will install all required dependencies listed in the `package.json` file into the `node_modules` folder.

3. **Start the application**: After installing the dependencies, you can start the application by running:

   ```console
   $ npm run start:group-audio-call
   ```

   **Note**: If you're using the VS Code terminal and encounter a pop-up requesting access to control your browser, select "Allow" to proceed. This permission enables the application to launch.

4. **Open the web page**: After starting the application, you can use the quick start app at `https://planet-kit-quick-start.linecorp.com:3000`.

### 6. Join a group audio call

Enter a room ID and click the **JOIN** button.

> To join the call successfully, you must enter a valid room ID. For the naming restrictions of a room ID, see [Room ID](https://docs.lineplanet.me/overview/glossary#room-id).

<img src="/images/gac_init_view.png" width="700"/>

When you first run the app in your browser, you'll be prompted to grant permission to use your microphone. Click the **"Allow"** button to enable the call.

Once you're connected to the call, you can communicate with other participants.

<img src="/images/gac_connected_view.png" width="700"/>

## Troubleshooting

### Call connection issues

If the group call cannot be connected, please check [PlanetKitDisconnectReason](https://docs.lineplanet.me/web/reference/disconnect-reason).

You can use your browser's Developer Tools to check error messages and logs. Here's how to access them based on your operating system and browser:

- For Chrome users (Windows)

  1. Open Chrome.
  2. Press `F12` or `Ctrl + Shift + I` on your keyboard.
  3. Then, click on the "Console" tab.

- For Chrome users (macOS)

  1. Open Chrome.
  2. Press `Cmd + Option + I` on your keyboard.
  3. Then, click on the "Console" tab.

- For Safari users

  1. Open Safari.
  2. Go to "Settings > Advanced" and check "Show features for web developers". Or, depending on your version of Safari, it could be "Show Develop menu in menu bar.

  <img src="/images/safari_advanced_settings.png" width="400">

  3. Press `Cmd + Option + I` on your keyboard or select "Develop > Show Web Inspector" in the menu bar.

### Invalid certificate authority warning

When running the app in a local environment, you might encounter a `NET::ERR_CERT_AUTHORITY_INVALID` warning in your browser, indicating the site's security certificate is not trusted. This warning is common in local environments because the test domain specified in your hosts file (`planet-kit-quick-start.linecorp.com`) does not have a corresponding valid SSL certificate recognized by your browser.

Since the warning occurs in a controlled local environment targeting `planet-kit-quick-start.linecorp.com` mapped to `127.0.0.1`, it's safe to proceed because the connection is for `local`.

#### How to Proceed

- For Chrome users
  - Click "Advanced" and select "Proceed to `planet-kit-quick-start.linecorp.com`(unsafe)".
- For Safari users
  - Click "Show Details", then "visit this website".

### Allowing microphone permission

If you've accidentally denied microphone access for the app, you can follow these steps to reset the permission and allow access:

- For Chrome users

  1. Click the lock icon in the address bar near the website URL.
  2. Find the "Microphone" permission in the dropdown menu.
  3. Change the setting to "Allow".
  4. Refresh the webpage to apply the changes.

- For Safari users
  1. Go to "Safari > Settings" in the menu bar.
  2. Click on the "Websites" tab and select "Microphone" from the side menu.
  3. Find the quick start domain and change its permission to "Allow".
  4. Refresh the webpage to apply the changes.

## Issues and inquiries

Please file any issues or inquiries you have to our representative or [dl_planet_help@linecorp.com](mailto:dl_planet_help@linecorp.com). Your opinions are always welcome.

## FAQ

You can find answers to our frequently asked questions in the [FAQ](https://docs.lineplanet.me/help/faq) section.
