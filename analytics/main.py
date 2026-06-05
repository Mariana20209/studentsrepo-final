from Backend.lectura import leer_datos
from Backend.limpieza import limpiar_datos
from Backend.analisis import analizar_datos
from Backend.exportar import exportar_resultados


def main():
    ruta = "Data/base_datos.csv"
    datos = leer_datos(ruta)
    datos_limpios = limpiar_datos(datos)
    resumen = analizar_datos(datos_limpios)
    exportar_resultados(datos_limpios, resumen)
    print("\n🎉 Proceso terminado. Abre Frontend/index.html con Live Server.")


if __name__ == "__main__":
    main()