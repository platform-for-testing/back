var exec = require('child_process').exec;

exec('raml2html -o docs/index.html platform4testing.raml');
exec('raml2html -o docs-slate/index.html --theme raml2html-slate-theme platform4testing.raml');
