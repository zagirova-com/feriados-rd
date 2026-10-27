// feriados-rd · días feriados de República Dominicana (y EE. UU. y Canadá) con la regla de traslado de la Ley 139-97.
// Sin dependencias. Node 18+ o navegador (ESM). Los datos también están en datos/2027.json.
import datos2027 from "./datos/2027.js";
const DATOS = { 2027: datos2027 };

/** Lista de feriados de un año y país ("DO", "US", "CA"). */
export function feriados(anio, pais = "DO") {
  const a = DATOS[anio]; if (!a || !a[pais]) throw new Error(`Sin datos para ${pais} ${anio}`);
  return a[pais].feriados.map((f) => ({ ...f }));
}
/** ¿Es feriado (día no laborable) esa fecha YYYY-MM-DD? Devuelve el feriado o null. */
export function esFeriado(fecha, pais = "DO") {
  return feriados(Number(fecha.slice(0, 4)), pais).find((f) => f.fecha === fecha) ?? null;
}
/** Fuente de los datos de un año y país. */
export function fuente(anio, pais = "DO") { return DATOS[anio]?.[pais]?.fuente ?? null; }

const NO_SE_TRASLADAN = ["01-01", "01-21", "02-27", "09-24", "12-25"];
/** Regla de traslado de la Ley 139-97 para una efeméride (YYYY-MM-DD) de RD:
 *  martes y miércoles pasan al lunes anterior; jueves y viernes, al lunes siguiente (art. 1);
 *  no se trasladan el 1 de enero, el 21 de enero, el 27 de febrero, el 24 de septiembre
 *  ni el 25 de diciembre (art. 2); Corpus Christi y Viernes Santo tampoco (art. 3: pasar fijo:true);
 *  el 1 de mayo solo se mueve si cae domingo (art. 4, párrafo); el 16 de agosto no se traslada
 *  cuando inicia un período constitucional (años múltiplos de 4). Devuelve el día no laborable. */
export function trasladar(fecha, { fijo = false } = {}) {
  const [y, m, d] = fecha.split("-").map(Number); const dia = new Date(Date.UTC(y, m - 1, d)).getUTCDay(); // 0 dom … 6 sáb
  const mmdd = fecha.slice(5);
  if (fijo || NO_SE_TRASLADAN.includes(mmdd)) return fecha;
  if (mmdd === "08-16" && y % 4 === 0) return fecha;
  if (mmdd === "05-01") return dia === 0 ? sumar(fecha, 1) : fecha;
  if (dia === 2) return sumar(fecha, -1);
  if (dia === 3) return sumar(fecha, -2);
  if (dia === 4) return sumar(fecha, 4);
  if (dia === 5) return sumar(fecha, 3);
  return fecha;
}
function sumar(fecha, dias) { const [y, m, d] = fecha.split("-").map(Number); return new Date(Date.UTC(y, m - 1, d + dias)).toISOString().slice(0, 10); }
