#!/usr/bin/env node

function usage () {/*

Usage
  make-that-ssl-cert genrates dummy files
  for a dummy SSL key to use in your projects.

Options
  --verbose | -v   Enable verbosity pass in the module list to debug.

Examples
  make-that-ssl-cert

*/}
var pkg   = require('./package.json')
var argv  = require('minimist')(process.argv.slice(2));
var help  = require('@maboiteaspam/show-help')(usage, argv.h||argv.help, pkg)
var debug = require('@maboiteaspam/set-verbosity')(pkg.name, argv.v || argv.verbose);



var forge = require('node-forge');

var keys = forge.pki.rsa.generateKeyPair(1024);

var cert = forge.pki.createCertificate();
cert.publicKey = keys.publicKey;
cert.serialNumber = '01';
cert.validity.notBefore = new Date();
cert.validity.notAfter = new Date();
cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1);
var attrs = [{
  name: 'commonName',
  value: 'example.org'
}, {
  name: 'countryName',
  value: 'US'
}, {
  shortName: 'ST',
  value: 'Virginia'
}, {
  name: 'localityName',
  value: 'Blacksburg'
}, {
  name: 'organizationName',
  value: 'Test'
}, {
  shortName: 'OU',
  value: 'Test'
}];
cert.setSubject(attrs);
cert.setIssuer(attrs);
cert.setExtensions([{
  name: 'basicConstraints',
  cA: true/*,
  pathLenConstraint: 4*/
}, {
  name: 'keyUsage',
  keyCertSign: true,
  digitalSignature: true,
  nonRepudiation: true,
  keyEncipherment: true,
  dataEncipherment: true
}, {
  name: 'extKeyUsage',
  serverAuth: true,
  clientAuth: true,
  codeSigning: true,
  emailProtection: true,
  timeStamping: true
}, {
  name: 'nsCertType',
  client: true,
  server: true,
  email: true,
  objsign: true,
  sslCA: true,
  emailCA: true,
  objCA: true
}, {
  name: 'subjectAltName',
  altNames: [{
    type: 6, // URI
    value: 'http://example.org/webid#me'
  }, {
    type: 7, // IP
    ip: '127.0.0.1'
  }]
}, {
  name: 'subjectKeyIdentifier'
}]);
// FIXME: add authorityKeyIdentifier extension

// self-sign certificate
cert.sign(keys.privateKey/*, forge.md.sha256.create()*/);
console.log('Certificate created.');

var fs = require('fs');

fs.writeFileSync('dummy-private.key', forge.pki.privateKeyToPem(keys.privateKey))
fs.writeFileSync('dummy-public.key', forge.pki.publicKeyToPem(keys.publicKey))
fs.writeFileSync('dummy.cert', forge.pki.certificateToPem(cert))
