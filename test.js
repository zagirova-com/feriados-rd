import assert from "node:assert/strict";
import { feriados, esFeriado, trasladar } from "./index.js";
assert.equal(feriados(2027, "DO").length, 12);
assert.equal(feriados(2027, "US").length, 12);
assert.equal(feriados(2027, "CA").length, 10);
assert.equal(esFeriado("2027-01-04").nombre, "Día de Reyes");
assert.equal(esFeriado("2027-01-06"), null);
assert.equal(trasladar("2027-01-06"), "2027-01-04");   // miércoles → lunes anterior
assert.equal(trasladar("2027-01-26"), "2027-01-25");   // martes → lunes anterior
assert.equal(trasladar("2027-02-27"), "2027-02-27");   // no se traslada
assert.equal(trasladar("2027-05-01"), "2027-05-01");   // sábado: se queda
assert.equal(trasladar("2026-01-06"), "2026-01-05");   // martes → lunes (como hizo el MT en 2026)
assert.equal(trasladar("2027-03-26", { fijo: true }), "2027-03-26"); // Viernes Santo
for (const f of feriados(2027, "DO")) assert.equal(trasladar(f.original ?? f.fecha, { fijo: /No se traslada/.test(f.nota ?? "") }), f.fecha, f.nombre);
console.log("feriados-rd: pruebas ok");
