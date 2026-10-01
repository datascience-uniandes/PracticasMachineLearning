# Práctica 1: Regresión lineal

En esta práctica se analizan los incendios forestales del Parque Natural de Montesinho (Portugal)
para entender qué factores meteorológicos, temporales y espaciales influyen en el **área quemada**.

### Datos de trabajo: [forestfires.csv](https://archive.ics.uci.edu/dataset/162/forest+fires)

??? info "Diccionario de datos"

    | Variable | Descripción |
    |----------|-------------|
    | `X` | Coordenada espacial X dentro del mapa del parque (entero, de 1 a 9) |
    | `Y` | Coordenada espacial Y dentro del mapa del parque (entero, de 2 a 9) |
    | `month` | Mes del año: `'jan'`, `'feb'`, …, `'dec'` |
    | `day` | Día de la semana: `'mon'`, `'tue'`, …, `'sun'` |
    | `FFMC` | Índice de humedad de combustibles finos (_Fine Fuel Moisture Code_) |
    | `DMC` | Índice de humedad de la capa orgánica (_Duff Moisture Code_) |
    | `DC` | Índice de sequía (_Drought Code_) |
    | `ISI` | Índice de propagación inicial (_Initial Spread Index_) |
    | `temp` | Temperatura (°C) |
    | `RH` | Humedad relativa (%) |
    | `wind` | Velocidad del viento (km/h) |
    | `rain` | Lluvia (mm/m²) |
    | `area` | Área quemada (hectáreas, incluye ceros). **Variable objetivo** |

## Actividad 1: Entendimiento de datos

1. Cree un nuevo notebook y [**cargue el dataset**](../ayudas/cargar-datos.md) de trabajo.
2. [**Explore la estructura del dataset**](../ayudas/explorar-estructura.md).
   **¿Cuántos registros hay? ¿Qué características tiene cada registro y de qué tipo son?**
   ¿Cuáles son [continuas](../ayudas/glosario.md#variable-continua) y cuáles
   [categóricas](../ayudas/glosario.md#variable-categorica)?
3. [**Realice gráficos de cajas y de distribución**](../ayudas/graficos-continuos.md) para las
   variables continuas. **¿Qué puede concluir de la forma de cada
   [distribución](../ayudas/glosario.md#distribucion)? ¿Qué variables presentan
   [sesgo](../ayudas/glosario.md#sesgo) o [valores atípicos](../ayudas/glosario.md#outlier)?**
4. [**Realice gráficos de barras**](../ayudas/graficos-categoricos.md) para las variables
   categóricas. **¿En qué meses y días se concentran los incendios? ¿Qué puede decir del
   balance entre categorías?**
5. **Estudie la [variable objetivo](../ayudas/glosario.md#variable-objetivo)** `area`:
   [visualice su distribución](../ayudas/graficos-continuos.md) y revise sus valores.
   **¿Qué proporción de incendios tiene un área quemada igual a cero? ¿Entre qué valores se mueve
   el resto? ¿Es una distribución simétrica?**
6. Revise las [**dimensiones de calidad de los datos**](../ayudas/calidad-datos.md).
   **¿Cuántos registros [duplicados](../ayudas/glosario.md#duplicado) hay? ¿Cuántos
   [valores nulos](../ayudas/glosario.md#valor-nulo)? ¿Qué valores le parecen extraños?**
   Compárelos con los rangos del diccionario de datos.
7. **Tratamiento de datos:** [**repare los valores nulos**](../ayudas/tratar-nulos.md).
   **¿Qué estrategia usó (eliminar o imputar) y por qué?**
8. **Tratamiento de datos:** [**elimine los registros duplicados**](../ayudas/tratar-duplicados.md).
   **¿Cuántos registros quedan?**
9. **Tratamiento de datos:** revise los [outliers](../ayudas/glosario.md#outlier) y
   [**aplique clipping**](../ayudas/clipping.md) a la variable objetivo.
   **¿Qué percentiles utilizó? ¿Cómo cambian el gráfico de caja y las estadísticas descriptivas
   antes y después del tratamiento?**

!!! success "Fin de la Actividad 1"
    Ha terminado la primera actividad de la Práctica 1. Guarde los cambios en su notebook:
    el dataset tratado es el punto de partida de la siguiente actividad.
