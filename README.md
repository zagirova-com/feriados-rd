# feriados-rd

Días feriados de República Dominicana con la regla de traslado de la **Ley 139-97**, en JSON y en una función de JavaScript sin dependencias. Incluye los feriados federales de Estados Unidos y Canadá del mismo año.

Lo mantiene [Zagirova](https://zagirova.com), que construye y opera los sistemas con los que las empresas venden, cobran y deciden. Es el mismo dato que usa nuestro [calendario de feriados 2027](https://zagirova.com/calendario-2027-feriados-republica-dominicana).

## Uso

```js
import { feriados, esFeriado, trasladar } from "feriados-rd";

feriados(2027);                 // los 12 de RD, con fecha, nombre, nota y si fue trasladado
feriados(2027, "US");           // federales de EE. UU. (observados)
esFeriado("2027-01-04");        // { fecha: "2027-01-04", original: "2027-01-06", nombre: "Día de Reyes", … }
trasladar("2027-01-06");        // "2027-01-04": miércoles → lunes anterior
```

O el JSON directo: [`datos/2027.json`](datos/2027.json) (el mismo contenido que `datos/2027.js`, que es lo que importa el módulo).

## La regla (Ley 139-97)

- Martes y miércoles pasan al lunes anterior; jueves y viernes, al lunes siguiente (art. 1).
- No se trasladan: 1 de enero, 21 de enero, 27 de febrero, 24 de septiembre, 25 de diciembre (art. 2), ni Corpus Christi ni Viernes Santo (art. 3). El 16 de agosto tampoco cuando inicia un período constitucional.
- El 1 de mayo solo se mueve si cae domingo (art. 4, párrafo).

Los datos de 2027 están verificados contra el texto de la ley; la resolución oficial del Ministerio de Trabajo para 2027 sale hacia noviembre de 2026 y, si cambia algo, se corrige aquí. Dos fechas (Reyes y Duarte) están marcadas `pendiente`: un proyecto de ley en curso las dejaría fijas.

## Fuentes

- RD: Ley 139-97. Ministerio de Trabajo (mt.gob.do) para la resolución anual.
- EE. UU.: Office of Personnel Management, feriados federales observados.
- Canadá: Canada Labour Code, «general holidays»; los provinciales varían.

## Pruebas

```
node test.js
```

MIT · [Zagirova](https://zagirova.com) · hola@zagirova.com
