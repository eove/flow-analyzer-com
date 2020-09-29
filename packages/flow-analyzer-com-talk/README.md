# flow-analyzer-com-talk

CLI to talk to flow analyzers (pf300, citrex, ...)

## Install

### Pre requisites

- [node](https://nodejs.org/)

### MacOS

```
brew install zmq
git clone git@github.com:eove/flow-analyzer-com.git
cd flow-analyzer-com/packages/flow-analyzer-com-talk
npm install -g node-gyp
npm install -g
```

### Linux, Raspberry

```
sudo apt-get install -y libglib2.0-dev libzmq3-dev
git clone git@github.com:eove/flow-analyzer-com.git
cd flow-analyzer-com/packages/flow-analyzer-com-talk
npm install -g node-gyp
npm install -g
```

## Usage

**✋ Read this first!**

To know which USB ports are available on your machine: `flowAnalyzerTalk list-ports`. May return something like:

```bash
/dev/tty.Bluetooth-Incoming-Port
/dev/tty.usbserial-FTZ8FGPX
```

Then, just run for example: `flowAnalyzerTalk com -p /dev/tty.usbserial-FTZ8FGPX -d`

- To display debug messages, use the `-d` option
- You will need to pass a port name with the `-p` option.

## Shell

You can interact with the running `flowAnalyzerTalk com` process to make it send commands.

Start the interactive shell in another terminal with: `flowAnalyzerTalk shell` while `flowAnalyzerTalk com ...` is running.

    talk > help

Commands:

    help [command...]               Provides help for a given command.
    exit                            Exits application.
    run [command] [args]            Run the given [command], with optional JSON formatted [args] (see. examples)
    examples                        Show command examples

Tip: To be able to connect remotely, run: `flowAnalyzerTalk com -p /dev/ttyUSB1 -l 0.0.0.0:9876`

![Run shell](./flow-analyzer-com.gif?raw=true 'Run shell')
