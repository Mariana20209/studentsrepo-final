import pandas as pd


def leer_datos(ruta_archivo: str) -> pd.DataFrame:
    """Lee el CSV de proyectos de StudentsRepo."""
    try:
        datos = pd.read_csv(ruta_archivo)
        print(f"✅ Datos leídos correctamente. {len(datos)} registros encontrados.")
        return datos
    except FileNotFoundError:
        print(f"❌ No se encontró el archivo: {ruta_archivo}")
        raise