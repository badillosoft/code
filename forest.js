const { header, footer } = require("./russian.util");

const fs = require("fs");

const tree = `
<directionalLight direction="-1 -1 0"></directionalLight>
<transform translation="0 -2.5 0">
	<shape>
		<appearance>
			<material diffuseColor="0 0.5 0"></material>
		</appearance>
		<box size="200 1 200"></box>
	</shape>
</transform>

<billboard DEF="tree" axisOfRotation="0, 1, 0">
	<shape>
		<appearance>
			<imageTexture url="x3dom/tree.gif"></imageTexture>
			<material diffuseColor="1 1 1"></material>
		</appearance>
		<indexedFaceSet coordIndex="0 1 2 3" solid="false">
			<coordinate point="2 2 0, -2 2 0, -2 -2 0, 2 -2 0"></coordinate>
		</indexedFaceSet>
	</shape>
</billboard>
`;

fs.readFile('forest.txt', (err, data) => {
	if (err) {
		return;
	}
	
	console.log(header);
	console.log(tree);
	console.log(data.toString());
	console.log(footer);
});