const fs = require('fs');
const path = require('path');
const raml = require('raml-1-parser');

var fileName = path.resolve(__dirname, "platform4testing.raml");

var api = raml.loadApiSync(fileName).toJSON();
// console.log(JSON.stringify(api, null, 4));
// console.log(api);

const interfaces = api.types
  .filter(type => !!type[Object.keys(type)[0]].properties)
  .map(_type => {
	const typeName = Object.keys(_type)[0];
	const type = _type[typeName];
	const interfaceName = `${typeName}`;
	const props = type.properties;

	const propertiesLength = Object.keys(props).length;
	const properties = Object.keys(props).map((propName, i) => {
	  const prop = props[propName];
	  let type = prop.type[0];
	  type = type === 'array'
	 ? `${prop.items}[]`
	 : type;

	  const propDefinition = `	${propName}${prop.required ? '' : '?'}: ${type};`
	  return propertiesLength === i + 1
	 ? propDefinition
	 : propDefinition + '\n';
	});

	return `export interface ${interfaceName} {
${properties.join('')}
}`
});

fs.writeFileSync('api.d.ts', interfaces.join('\n\n'));

console.log(interfaces.join('\n\n'));
