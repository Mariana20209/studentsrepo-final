import pandas as pd


def limpiar_datos(datos: pd.DataFrame) -> pd.DataFrame:
    """Limpia y prepara los datos de proyectos."""
    df = datos.copy()

    # Limpiar textos
    for col in ["titulo", "area", "estado", "estudiante"]:
        df[col] = df[col].astype(str).str.strip()

    # Convertir fecha
    df["fecha"] = pd.to_datetime(df["fecha"], errors="coerce")
    df["mes"] = df["fecha"].dt.strftime("%B %Y")
    df["mes_num"] = df["fecha"].dt.to_period("M").astype(str)

    # Eliminar filas sin título válido
    df = df[df["titulo"].str.len() > 3]

    print(f"✅ Datos limpios. {len(df)} registros válidos.")
    return df