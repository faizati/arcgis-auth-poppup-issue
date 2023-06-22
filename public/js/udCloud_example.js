const projectUUID = "SMIProfessionalServices/1c6vzmXwJkk51Nq6Ix4KQ";
const sceneID = "SOI5W8uxESuRA5WSk1OQ";

let udsArr = [];
let loadArr = [];
let loadCount;

function login() {
    const myPromise = udSDKJS_CreateFrom_udCloud("SMI");
    myPromise.then(loadProject, showError);
}

function loadProject() {
    console.log("Loading project...")

    const myPromise = udSDKJS_ServerProjectLoad(sceneID, projectUUID);
    myPromise.then(showModels, showError);
}

function showError(error) {
    console.log(udSDKJS_GetErrorString(error));
}

function showModels() {
    new Promise((resolve) => {
        let rootNode = udSDKJS_GetProjectRoot();
        resolve(rootNode);
    }).then(rootNode => {
        if (rootNode) {
            findAndLoad(rootNode, ["Digital Earth Detail", "Seismic", "Seismic Interpretations"]);

            loadCount = loadArr.length;
            console.log(loadArr);
            const myPromise = new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 200);
            }).then(() => {
                loadNext();
            });
            document.getElementById("loadingBox").style.display = "block";
        }
    });

    return true;
}

function findAndLoad(rootNode, hierarchy) {
    let route = rootNode;
    hierarchy.forEach((name) => {
        route = findNodeByName(route, name);
    });

    route.forEachChild((child) => {
        if (child.uri) {
            loadArr.push(child.uri);
        }
    });
}

function loadNext() {
    if (loadArr.length > 0) {
        let uri = loadArr.pop();
        udSDKJS_LoadModel(uri).then(
            function (modelHandle){ udsArr.push(modelHandle); loadNext(); },
            showError         
        );
        document.getElementById("loading").innerHTML = "Loading " + udsArr.length.toString() + "/" + loadCount.toString();
        console.log("Loading " + udsArr.length.toString() + "/" + loadCount.toString());
    }
    else {
        document.getElementById("loading").innerHTML = "Adding to scene...";
        new Promise((resolve) => {
            udsArr.forEach(uds => udSDKJS_RenderQueueAddModel(uds, 0, -1));
            setTimeout(() => {
                resolve();
            }, 200);
        }).then(() => {
            document.getElementById("loadingBox").style.display = "none";
            udSDKJSReady = true;
            console.log("Loading complete.");
        });

    }
}

function findNodeByName(root, name) {
    let child = root.firstChild;
    while (child != null) {
        if (child && child.name === name)
            return child;
        child = child.nextSibling;
    }
    return null;
}