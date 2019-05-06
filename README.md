# Checking Accounts App | Autor: Johander Vazquez
Aplicación para manejo de Cuentas Corrientes realizada con Reactjs, Redux, Webpack y Nodejs

## Instalación para Desarrollo
```
npm install
npm run dev
```
## Instalación para Producción
```
webpack
npm start
```

NOTA: En el *public/index.html* se debe cambiar
```
<script src="bundle.js"></script>
```
Por
```
<script src="js/bundle.js"></script>
```

## Access Url
[http://localhost:4800](http://localhost:4800)

## CURL REQUESTS

Para obtener la lista de Titulares
```
curl -X GET "http://localhost:4800/api/clients"
```

Para crear un Titular Natural
```
curl -X POST "http://localhost:4800/api/clients/save" -H "Content-Type: application/json" -d '{"type": 0, "dni": 123456, "cuit": 1452369, "name": "Brian", "lastname" : "Massa"}'
```

Para crear un Titular Jurídico
```
curl -X POST "http://localhost:4800/api/clients/save" -H "Content-Type: application/json" -d '{"type": 1, "cuit": 123456, "business_name": "Compañia Ejemplo", "start_year" : 2005}'
```

NOTA: Para actualizar un Titular (Natural / Jurídico), se usa el mismo request de crear pero agregando el atributo *id* a la data JSON

Para eliminar un Titular por id
```
curl -X GET "http://localhost:4800/api/clients/delete/28"
```

Para obtener la lista de Cuentas
```
curl -X GET "http://localhost:4800/api/accounts"
```

Para obtener la lista de Titulares sin Cuenta y así asignarle alguna
```
curl -X GET "http://localhost:4800/api/clientswithoutaccount"
```

Para crear una Cuenta
```
curl -X POST "http://localhost:4800/api/accounts/save" -H "Content-Type: application/json" -d '{"client_id": 30, "number": 1233445566, "currency": 2, "balance": 2400.00}'
```

Para obtener las datos de una Cuenta por id
```
curl -X GET "http://localhost:4800/api/accounts/12"
```

Para eliminar una Cuenta por id
```
curl -X GET "http://localhost:4800/api/accounts/delete/12"
```

Para guardar Movimientos de una cuenta
```
curl -X POST "http://localhost:4800/api/movements/save" -H "Content-Type: application/json" -d '{"account": 98765432, "type": 1, "description": "Reembolso por devolución", "amount": 4000}'
```
