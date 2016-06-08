const header = `
<!DOCTYPE html>
<html>

<head>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta content="text/html;charset=utf-8" http-equiv="content-type">
  <meta content="utf-8" http-equiv="encoding">
  <title>X3DOM</title>
  <link rel="stylesheet" href="x3dom/x3dom.css">
  <script src="x3dom/x3dom.js" charset="utf-8"></script>
  <cross-domain-policy>
    <header Access-Control-Allow-Origin="*"></header>
    <allow-access-from domain="x3d"></allow-access-from>
  </cross-domain-policy>
  <style>
    x3d {
      border: 2px solid darkorange;
      background: rgba(0, 0, 0, 1);
    }
    
    body {
      font-size: 110%;
      font-family: verdana, sans-serif;
      margin: 3em;
      color: lightgray
    }
    
    h1 {
      color: darkorange
    }
    
    .column {
      float: left;
      width: 100px;
      margin-left: 20px;
    }
    
    .column button {
      width: 100%;
    }
  </style>

</head>

<body>
  <h1>CIDETEC RV</h1>
  <p>Avatar Viewer</p>
  <x3d width="600px" height="500px">
    <Scene>
`;

const footer = `
  <!--<background skyColor="0.0 0.8 1"/>-->
  <background
    groundAngle="0.5 1.52 1.56 1.5707"
    groundColor="
      0.2 0.2 0
      0.3 0.3 0
      0.5 0.5 0.3
      0.1 0.3 0.4
      0 0.2 0.4
    "
    skyAngle="0.04 0.05 0.1 1.309 1.57" 
    skyColor="
      0.8 0.8 0.2
      0.8 0.8 0.2
      0.1 0.1 0.6
      0.1 0.1 0.6
      0.1 0.25 0.8
      0.6 0.6 0.9
    "/>
  <!--<background
    leftUrl="x3dom/sky-night.jpg"
    rightUrl="x3dom/sky-night.jpg"
    frontUrl="x3dom/sky-night.jpg"
    backUrl="x3dom/sky-night.jpg"
    bottomUrl="x3dom/sky-night.jpg"
    topUrl="x3dom/sky-night.jpg"
    />-->
</scene>
  </x3d>
</body>

</html>
`;

module.exports = {
  header, footer
};