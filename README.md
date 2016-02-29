# make-that-ssl-cert
node binary to generate an SSL certificate.

Tired of openssl ? Found it awfully boring to generate a stupid self signed certificate ?

You are at the tight place !

With htlp of [node-forge](https://github.com/digitalbazaar/forge) generqte dummy ssl keys to feed in your projects.

# Install

```
npm i mh-cbon/make-that-ssl-cert
```

# Usage

```
make-that-ssl-cert 1.0.0
  node binary to generate an SSL certificate

Usage
  make-that-ssl-cert

Options
  --verbose | -v   Enable verbosity pass in the module list to debug.

```

# Todos

- add -y option
- add inquirer support to generate less dumbass cert

# Read more

- https://github.com/digitalbazaar/forge
- https://github.com/digitalbazaar/forge/blob/master/tests/nodejs-create-cert.js
