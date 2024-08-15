# Productos
- [ ] Modelo (administrable)

# Detalle
### Precios
- [ ] Costo
- [ ] Precio contado (efectivo)
- [ ] Precio debito
- [ ] Precio credito

Son fijos y calculados en base al costo, varía el recargo según tarjeta.

### Talles
- [ ] Implementar talles segun categoria o que cada detalle pueda elegir uno de estos:
    - único
    - S - XL
    - 34-44

    (Prendas inferiores suelen tener números)


### Tabla detalles
- [ ] Hacer que la columna agrupe detalles por color. En la misma fila muestra el color y todos los talles que tiene asignados.

# API
- [ ] Extender Pocketbase e implementar una API especial que permita dar de alta varios detalles al mismo tiempo y/o eliminar los qque haya destildado.

    - Ej.: dar de alta 3 talles para el mismo color. Sino se tiene que agregar de a un detalle 
