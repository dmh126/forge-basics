window.onload = init;

const m1 = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6dGVzdGluZy9HZWJfNDE2LmlmYw==';
const m2 = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6dGVzdGluZy9yYWNfYWR2YW5jZWRfc2FtcGxlX3Byb2plY3QucnZ0';
const m3 = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6dGVzdGluZy9yZXZpdHNhbXBsZS5ydnQ=';


function getToken(onTokenReady) {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", "/token", false);
  xmlHttp.send();
  const {access_token} = JSON.parse(xmlHttp.responseText);
  onTokenReady(access_token, 3600);
}

function init() {

  let viewer;

  function onDocumentLoadSuccess(viewerDocument) {
    const defaultModel = viewerDocument.getRoot().getDefaultGeometry();
    viewer.loadDocumentNode(viewerDocument, defaultModel);
  }

  function onDocumentLoadFailure() {
      console.error('Failed fetching Forge manifest');
  }

  const options = {
      env: 'AutodeskProduction',
      api: 'derivativeV2',
      getAccessToken: getToken
  };

  const config = {
    extensions: ['NewExtension'], // , 'Autodesk.DocumentBrowser']
  }

  Autodesk.Viewing.Initializer(options, function() {

    const htmlDiv = document.getElementById('forgeViewer');
    viewer = new Autodesk.Viewing.GuiViewer3D(htmlDiv, config);
    const startedCode = viewer.start();
    if (startedCode > 0) {
        console.error('Failed to create a Viewer: WebGL not supported.');
        return;
    }
    Autodesk.Viewing.Document.load(m3, onDocumentLoadSuccess, onDocumentLoadFailure);

    console.log('Initialization complete, loading a model next...');

  });

}