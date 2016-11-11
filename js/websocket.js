    var engineObjects = []
    var debugTextArea = document.getElementById("debugTextArea");
    function debug(message) {
        debugTextArea.value += message + "\n";
        debugTextArea.scrollTop = debugTextArea.scrollHeight;
    }

    function sendMessage() {
        var msg = document.getElementById("inputText").value;
        if ( websocket != null )
        {
            document.getElementById("inputText").value = "";
            websocket.send( msg );
            console.log( "string sent :", '"'+msg+'"' );
        }
    }

    var wsUri = "ws://localhost:9002";
    var websocket = null;
    initWebSocket();
    function initWebSocket() {
        try {
            if (typeof MozWebSocket == 'function')
                WebSocket = MozWebSocket;
            if ( websocket && websocket.readyState == 1 )
                websocket.close();
            websocket = new WebSocket( wsUri );
            websocket.onopen = function (evt) {
                debug("CONNECTED");
            };
            websocket.onclose = function (evt) {
                debug("DISCONNECTED");
            };
            websocket.onmessage = function (evt) {
                engineObjects = JSON.parse(evt.data);
                console.log(engineObjects);
                debug( evt.data );
            };
            websocket.onerror = function (evt) {
                debug('ERROR: ' + evt.data);
            };
        } catch (exception) {
            debug('ERROR: ' + exception);
        }
    }

    function stopWebSocket() {
        if (websocket)
            websocket.close();
    }

    function checkSocket() {
        if (websocket != null) {
            var stateStr;
            switch (websocket.readyState) {
                case 0: {
                    stateStr = "CONNECTING";
                    break;
                }
                case 1: {
                    stateStr = "OPEN";
                    break;
                }
                case 2: {
                    stateStr = "CLOSING";
                    break;
                }
                case 3: {
                    stateStr = "CLOSED";
                    break;
                }
                default: {
                    stateStr = "UNKNOW";
                    break;
                }
            }
            debug("WebSocket state = " + websocket.readyState + " ( " + stateStr + " )");
        } else {
            debug("WebSocket is null");
        }
    }
