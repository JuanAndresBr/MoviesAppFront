### 1. Instalar todas las dependencias con node, en la consola
```shell
npm i
```
ó
```shell
npm install
```

### 2. Teniendo en cuenta que el back esta en ejecución, se tiene que remplazar en el archivo src/environment.development.ts el endpoint por el link de su back
```typescript
export const environment = {
  endPoint:"https://localhost:7188/api/"
};
```

### 2. Al igual, se tiene que remplazar en el archivo src/environment.ts el endpoint por el link de su back
```typescript
export const environment = {
  endPoint:"https://localhost:7188/api/"
};
```

### 3. Ejecutar, en la consola ingresa el siguiente parametro
```shell
ng serve --open
```
